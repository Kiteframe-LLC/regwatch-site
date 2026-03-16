async function loadData() {
  const res = await fetch("./data/rules.json", { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Failed to load data/rules.json (${res.status})`);
  }
  return res.json();
}

async function loadOverrides() {
  const res = await fetch("./data/overrides.json", { cache: "no-store" });
  if (!res.ok) return {};
  try {
    return await res.json();
  } catch {
    return {};
  }
}

function fmt(value, digits = 3) {
  if (value === null || value === undefined) return "";
  return Number(value).toFixed(digits);
}

function pct5(value) {
  if (value === null || value === undefined) return "";
  const v = Number(value);
  if (Number.isNaN(v)) return "";
  return `${Math.round(v * 20) * 5}%`;
}

function velocityLabel(value) {
  if (value === null || value === undefined) return "";
  const v = Number(value);
  if (Number.isNaN(v)) return "";
  return `${v.toFixed(1)}/day`;
}

function relativeCommentEnd(raw) {
  if (!raw) return "";
  let end;
  try {
    end = new Date(raw);
  } catch {
    return raw;
  }
  const now = new Date();
  const deltaMs = end.getTime() - now.getTime();
  if (Number.isNaN(deltaMs)) return raw;
  if (deltaMs < 0) return "closed";
  const hours = deltaMs / (1000 * 60 * 60);
  if (hours < 24) return "today";
  if (hours < 48) return "tomorrow";
  const days = Math.max(3, Math.ceil(hours / 24));
  return `${days} days`;
}

function isCommentOpen(raw) {
  if (!raw) return true;
  const end = new Date(raw);
  if (Number.isNaN(end.getTime())) return true;
  return end.getTime() > Date.now();
}

function structuralBandLabel(raw) {
  const map = {
    likely_routine_rule: "Routine Lexicon",
    moderate_analytical_concern: "Moderate Concern",
    high_comment_leverage_probability: "High Leverage",
    not_run_fetch_error: "Not Scored",
    skipped_closed_comment_period: "Skipped",
    disabled: "Disabled",
    not_applicable_rfi: "RFI inquiry (NPRM structural pass skipped)",
    not_applicable_anprm: "ANPRM inquiry (NPRM structural pass skipped)",
  };
  return map[raw] || raw || "";
}

function rowHtml(r, override = null) {
  const docId = r.document_id || "";
  const subjectId = r.subject_document_id || docId;
  const defaultDocUrl = subjectId
    ? `https://www.regulations.gov/document/${encodeURIComponent(subjectId)}`
    : "";
  let docUrl = r.document_action_url || defaultDocUrl;
  let docLabel = r.document_action_label || "Regulations.gov";
  const commentUrl = r.comment_action_url || "";
  const commentLabel = "Comment";
  const commentReadUrl = r.comment_read_url || "";
  const channelType = r.comment_channel_type || "regulations_gov";
  if (!r.document_action_url && channelType === "email" && commentReadUrl) {
    docUrl = commentReadUrl;
    docLabel = "Federal Register";
  } else if (!r.document_action_label && docUrl.includes("federalregister.gov")) {
    docLabel = "Federal Register";
  }
  const detailUrl = docId ? `/document/${encodeURIComponent(docId)}/` : "";
  const summaryUrl = r.summary_available ? `/document/${encodeURIComponent(docId)}/summary/` : "";
  const analysisUrl = r.raw_summary_available ? `/document/${encodeURIComponent(docId)}/analysis/` : "";
  const displayBand = override?.display_band || "";
  const reviewStatus = override?.review_status || "";
  const note = override?.note || "";
  const structuralBand = structuralBandLabel(r.pass_2_risk_band);
  const bandCell = displayBand
    ? `<div class="band-primary">${displayBand}</div>
       <div class="band-secondary">Structural: ${structuralBand}</div>
       ${reviewStatus ? `<div class="review-pill">${reviewStatus}</div>` : ""}
       ${note ? `<div class="band-note">${note}</div>` : ""}`
    : `<div>${structuralBand}</div>`;
  const actions = [
    detailUrl
      ? `<a class="action-btn" href="${detailUrl}">Detail</a>`
      : `<span class="action-btn disabled">Detail</span>`,
    docUrl
      ? `<a class="action-btn" href="${docUrl}" target="_blank" rel="noopener noreferrer">${docLabel}</a>`
      : `<span class="action-btn disabled">${docLabel}</span>`,
    commentUrl
      ? `<a class="action-btn" href="${commentUrl}" target="_blank" rel="noopener noreferrer">${commentLabel}</a>`
      : `<span class="action-btn disabled">${commentLabel}</span>`,
    summaryUrl
      ? `<a class="action-btn" href="${summaryUrl}" target="_blank" rel="noopener noreferrer">Summary</a>`
      : `<span class="action-btn disabled">Summary</span>`,
    analysisUrl
      ? `<a class="action-btn" href="${analysisUrl}" target="_blank" rel="noopener noreferrer">Analysis</a>`
      : `<span class="action-btn disabled">Analysis</span>`,
  ].join(" ");
  return `<tr>
    <td>${pct5(r.combined_score)}</td>
    <td>${r.rule_kind || "NPRM"}</td>
    <td>${docId}</td>
    <td class="title">${r.title || ""}</td>
    <td>${velocityLabel(r.pass_3_score)}</td>
    <td>${bandCell}</td>
    <td title="${r.comment_end_date || ""}">${relativeCommentEnd(r.comment_end_date)}</td>
    <td class="actions">${actions}</td>
  </tr>`;
}

function render(records) {
  const tbody = document.querySelector("#rulesTable tbody");
  tbody.innerHTML = records
    .map((r) => rowHtml(r, window.__overrides?.[r.document_id] || null))
    .join("");
}

function applyFilters(records) {
  const agency = document.getElementById("agencyFilter").value.trim().toLowerCase();
  const minScore = Number(document.getElementById("minScore").value || 0);
  return records.filter((r) => {
    if (!isCommentOpen(r.comment_end_date)) return false;
    const agencyOk =
      !agency ||
      (r.agency_id || "").toLowerCase().includes(agency) ||
      (r.agency_name || "").toLowerCase().includes(agency) ||
      (r.rule_kind || "").toLowerCase().includes(agency);
    const scoreOk = (r.combined_score || 0) >= minScore;
    return agencyOk && scoreOk;
  });
}

async function main() {
  const [data, overrides] = await Promise.all([loadData(), loadOverrides()]);
  window.__overrides = overrides || {};
  const records = data.records || [];
  document.getElementById("meta").textContent =
    `Published ${records.length} records. Generated at ${data.generated_at || "unknown"}.`;

  const rerender = () => render(applyFilters(records));
  document.getElementById("agencyFilter").addEventListener("input", rerender);
  document.getElementById("minScore").addEventListener("input", rerender);
  document.getElementById("resetBtn").addEventListener("click", () => {
    document.getElementById("agencyFilter").value = "";
    document.getElementById("minScore").value = "0.5";
    rerender();
  });
  rerender();
}

main().catch((err) => {
  const meta = document.getElementById("meta");
  meta.textContent = `Error: ${err.message}`;
});
