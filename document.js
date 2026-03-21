function esc(value) {
  if (value === null || value === undefined) return "";
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

const TAB_NAMES = new Set(["overview", "summary", "analysis", "comments", "attachments"]);

function tabFromHash() {
  const raw = (window.location.hash || "").replace(/^#/, "").trim().toLowerCase();
  return TAB_NAMES.has(raw) ? raw : "";
}

async function loadOverrides() {
  const res = await fetch("/data/overrides.json", { cache: "no-store" });
  if (!res.ok) return {};
  try {
    return await res.json();
  } catch {
    return {};
  }
}

function structuralBandLabel(raw) {
  const map = {
    likely_routine_rule: "Likely Routine (Structural)",
    moderate_analytical_concern: "Moderate Concern (Structural)",
    high_comment_leverage_probability: "High Leverage (Structural)",
    not_run_fetch_error: "Not Scored (Fetch Error)",
    skipped_closed_comment_period: "Skipped (Closed Comments)",
    disabled: "Disabled",
    not_applicable_rfi: "RFI inquiry (NPRM structural pass skipped)",
    not_applicable_anprm: "ANPRM inquiry (NPRM structural pass skipped)",
  };
  return map[raw] || raw || "";
}

function pct5(value) {
  if (value === null || value === undefined) return "";
  const v = Number(value);
  if (Number.isNaN(v)) return "";
  return `${Math.round(v * 20) * 5}%`;
}

function flagLabel(flag) {
  const map = {
    low_quantification: "Low quantification signal",
    high_threshold_language_ratio: "High threshold language ratio",
    missing_alternatives_analysis: "Alternatives analysis missing",
    high_scope_exclusion_language: "Frequent scope exclusion language",
    low_citation_density: "Low citation density",
    low_numeric_to_citation_ratio: "Low numeric-to-citation ratio",
    unsupported_threshold_claims: "Potential unsupported threshold claims",
    facility_impacts_without_representative_facility:
      "Facility impacts discussed without representative facility framing",
    missing_cost_per_unit_signal: "Missing cost-per-unit signal",
    missing_baseline_signal: "Missing baseline signal",
    missing_distributional_signal: "Missing distributional signal",
    low_statutory_density: "Low statutory citation density",
    missing_rights_impact_signal: "Missing rights-impact signal",
    missing_alternative_procedural_signal: "Missing procedural alternatives signal",
    missing_supporting_analysis_references: "Missing supporting-analysis references",
    epa_missing_cost_per_unit_signal: "EPA-specific cost-per-unit signal missing",
    doe_missing_modeling_signal: "DOE-specific modeling signal missing",
    cms_missing_behavioral_assumptions: "CMS-specific behavioral assumptions missing",
    deregulatory_carveout_with_thin_support: "Deregulatory carve-out with thin supporting analysis",
    deregulatory_carveout_signal: "Deregulatory carve-out signal",
    savings_claim_without_method_support: "Savings claim without method support",
    unsupported_equivalence_claims: "Equivalence claims appear unsupported",
    thin_record_cut_corners_cluster: "Clustered thin-record/cut-corners indicators",
  };
  return map[flag] || flag;
}

function attachmentRow(doc) {
  const id = esc(doc.document_id);
  const rawId = String(doc.document_id || "");
  const href = rawId
    ? `https://www.regulations.gov/document/${encodeURIComponent(rawId)}`
    : "";
  const title = esc(doc.title);
  const subtype = esc(doc.document_subtype || "");
  const rcv = esc(doc.received_date || doc.posted_date || "");
  const authors = Array.isArray(doc.authors) ? esc(doc.authors.join("; ")) : esc(doc.authors || "");
  const pages = doc.page_count ?? "";
  return `<tr>
    <td>${href ? `<a href="${href}" target="_blank" rel="noopener noreferrer">${id}</a>` : id}</td>
    <td>${title}</td>
    <td>${subtype}</td>
    <td>${rcv}</td>
    <td>${authors}</td>
    <td>${pages}</td>
  </tr>`;
}

function govSubmissionRoleLabel(raw) {
  const key = String(raw || "").toLowerCase();
  if (key === "federal_agency") return "Federal agency";
  if (key === "state_government") return "State government";
  if (key === "tribal_government") return "Tribal government";
  return key ? key.replace(/_/g, " ") : "Government";
}

function govSubmissionRow(sub) {
  const cid = esc(sub.comment_id || "");
  const posted = esc(formatDateOnly(sub.posted_date || ""));
  const org = esc(sub.organization || "");
  const role = esc(govSubmissionRoleLabel(sub.submission_role || ""));
  const title = esc(sub.title || "");
  const attachmentCount = Number(sub.attachment_count || 0);
  const withdrawn = Boolean(sub.withdrawn);
  const excerpt = esc(sub.representative_excerpt || "");
  return `<tr>
    <td>${cid ? `<a href="https://www.regulations.gov/comment/${encodeURIComponent(sub.comment_id || "")}" target="_blank" rel="noopener noreferrer">${cid}</a>` : ""}</td>
    <td>${org}</td>
    <td>${role}</td>
    <td>${posted}</td>
    <td>${attachmentCount}</td>
    <td>${withdrawn ? "Yes" : "No"}</td>
    <td>${title || excerpt}</td>
  </tr>`;
}

function commentClusterRow(cluster) {
  if (window.RegwatchComments && typeof window.RegwatchComments.commentClusterRow === "function") {
    return window.RegwatchComments.commentClusterRow(cluster, esc, formatDateOnly);
  }
  const count = Number(cluster.count || 0);
  const cid = esc(cluster.representative_comment_id || "");
  const posted = esc(formatDateOnly(cluster.representative_posted_date || ""));
  const chars = Number(cluster.representative_length || 0);
  const excerpt = esc(cluster.representative_excerpt || "");
  return `<tr><td>${count}</td><td><span class="review-pill sentiment-neutral">neutral</span></td><td><span class="review-pill">Unknown</span></td><td>${cid ? `<a href="https://www.regulations.gov/comment/${encodeURIComponent(cluster.representative_comment_id || "")}" target="_blank" rel="noopener noreferrer">${cid}</a>` : ""}</td><td>${posted}</td><td>${chars}</td><td>${excerpt}</td></tr>`;
}

function samplingBackfillHtml(detail) {
  if (window.RegwatchComments && typeof window.RegwatchComments.samplingBackfillHtml === "function") {
    return window.RegwatchComments.samplingBackfillHtml(detail, esc, formatMetricNumber);
  }
  return "";
}

function formatDateOnly(raw) {
  if (!raw) return "";
  try {
    const d = new Date(raw);
    if (Number.isNaN(d.getTime())) return String(raw).slice(0, 10);
    return d.toISOString().slice(0, 10);
  } catch {
    return String(raw).slice(0, 10);
  }
}

function formatPct(value) {
  const v = Number(value || 0);
  if (!Number.isFinite(v) || v <= 0) return "0%";
  try {
    return new Intl.NumberFormat("en-US", {
      style: "percent",
      maximumFractionDigits: 0,
    }).format(v);
  } catch {
    return `${Math.round(v * 100)}%`;
  }
}

function formatMetricNumber(value) {
  const v = Number(value || 0);
  if (!Number.isFinite(v)) return "0";
  try {
    return new Intl.NumberFormat("en-US", {
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(v);
  } catch {
    return String(Math.round(v));
  }
}

function formatEasternDateTime(raw) {
  if (!raw) return "n/a";
  try {
    const d = new Date(raw);
    if (Number.isNaN(d.getTime())) return esc(raw);
    return `${d.toLocaleString("en-US", {
      timeZone: "America/New_York",
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })} ET`;
  } catch {
    return esc(raw);
  }
}

function commenterTypesText(types) {
  const entries = Object.entries(types || {}).filter(([, v]) => Number(v || 0) > 0);
  if (!entries.length) return "n/a";
  entries.sort((a, b) => Number(b[1] || 0) - Number(a[1] || 0));
  return entries.map(([k, v]) => `${k}: ${formatMetricNumber(v)}`).join(" | ");
}

function submissionRolesText(roles) {
  const entries = Object.entries(roles || {}).filter(([, v]) => Number(v || 0) > 0);
  if (!entries.length) return "n/a";
  entries.sort((a, b) => Number(b[1] || 0) - Number(a[1] || 0));
  return entries.map(([k, v]) => `${k}: ${formatMetricNumber(v)}`).join(" | ");
}

function referencedDocumentRow(ref) {
  const refId = String(ref && ref.id ? ref.id : "");
  const refKind = String(ref && ref.kind ? ref.kind : "reference").toLowerCase();
  const count = Number((ref && ref.count) || 0);
  const commentMentions = Number((ref && ref.comment_mentions) || 0);
  const ruleMentions = Number((ref && ref.rule_text_mentions) || 0);
  const kindLabel = refKind.replaceAll("_", " ");
  const href = String((ref && ref.resolved_url) || "");
  const linkMode = String((ref && ref.link_mode) || "");
  const linkError = String((ref && ref.link_error) || "");
  const linkStatusCode = (ref && ref.link_status_code) != null
    ? Number(ref.link_status_code)
    : null;
  let statusPill = "";
  if (linkMode === "search_fallback_broken_direct") {
    const statusText = Number.isFinite(linkStatusCode) ? `HTTP ${linkStatusCode}` : "broken";
    statusPill = `<span class="review-pill sentiment-negative" title="${esc(linkError || "direct link failed")}">fallback search (${esc(statusText)})</span>`;
  } else if (linkMode === "search_fallback_unverified_direct") {
    const statusText = Number.isFinite(linkStatusCode) ? `HTTP ${linkStatusCode}` : "unverified";
    statusPill = `<span class="review-pill sentiment-neutral" title="${esc(linkError || "direct link could not be verified")}">fallback search (${esc(statusText)})</span>`;
  } else if (linkMode === "search_fallback_unknown_kind") {
    statusPill = `<span class="review-pill sentiment-neutral">fallback search (unknown type)</span>`;
  } else if (linkMode.startsWith("direct_retyped_")) {
    const resolvedType = linkMode.replace("direct_retyped_", "");
    statusPill = `<span class="review-pill sentiment-neutral">retyped as ${esc(resolvedType)}</span>`;
  }
  return `<tr>
    <td>${esc(kindLabel)}</td>
    <td>${href ? `<a href="${href}" target="_blank" rel="noopener noreferrer">${esc(refId)}</a>` : esc(refId)} ${statusPill}</td>
    <td>${esc(String(count))}</td>
    <td>${esc(String(commentMentions))}</td>
    <td>${esc(String(ruleMentions))}</td>
  </tr>`;
}

function stanceMixText(map) {
  const entries = Object.entries(map || {}).filter(([, v]) => Number(v || 0) > 0);
  if (!entries.length) return "n/a";
  entries.sort((a, b) => Number(b[1] || 0) - Number(a[1] || 0));
  return entries.map(([k, v]) => `${k}: ${v}`).join(" | ");
}

function sentimentNetMeta(net, sample) {
  if (!Number.isFinite(net) || sample <= 0 || Math.abs(net) < 0.03) {
    return { label: "Net: neutral", cls: "sentiment-neutral" };
  }
  if (net > 0) {
    return { label: `Net: +${formatPct(net)}`, cls: "sentiment-positive" };
  }
  return { label: `Net: -${formatPct(Math.abs(net))}`, cls: "sentiment-negative" };
}

function parseIsoDay(day) {
  if (!day) return null;
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(day));
  if (!m) return null;
  const y = Number(m[1]);
  const mo = Number(m[2]);
  const d = Number(m[3]);
  return new Date(Date.UTC(y, mo - 1, d));
}

function dayToIso(d) {
  return d.toISOString().slice(0, 10);
}

function mondayOnOrBefore(d) {
  const copy = new Date(d.getTime());
  const dow = copy.getUTCDay(); // 0=Sun..6=Sat
  const back = dow === 0 ? 6 : dow - 1; // Mon->0 ... Sun->6
  copy.setUTCDate(copy.getUTCDate() - back);
  return copy;
}

function renderWeeklyHeatmap(label, byDay) {
  const entries = Object.entries(byDay || {})
    .map(([day, value]) => [String(day), Number(value || 0)])
    .filter(([day, value]) => value > 0 && parseIsoDay(day))
    .sort(([a], [b]) => a.localeCompare(b));
  if (!entries.length) {
    return `<div class="mini-heatmap"><div class="mini-heatmap-label">${esc(label)}</div><div class="mini-heatmap-empty">no data</div></div>`;
  }

  const firstDate = parseIsoDay(entries[0][0]);
  if (!firstDate) {
    return `<div class="mini-heatmap"><div class="mini-heatmap-label">${esc(label)}</div><div class="mini-heatmap-empty">no data</div></div>`;
  }
  const firstMonday = mondayOnOrBefore(firstDate);
  const max = Math.max(...entries.map(([, v]) => Number(v || 0)), 1);

  const weeks = new Map();
  for (const [day, value] of entries) {
    const date = parseIsoDay(day);
    if (!date) continue;
    const dow = date.getUTCDay(); // 0=Sun,1=Mon...6=Sat
    if (dow === 0 || dow === 6) continue; // render only Mo..Fr columns
    const weekStart = mondayOnOrBefore(date);
    const weekIndex = Math.floor((weekStart.getTime() - firstMonday.getTime()) / (7 * 24 * 60 * 60 * 1000)) + 1;
    if (!weeks.has(weekIndex)) {
      weeks.set(weekIndex, { weekStart, days: new Map() });
    }
    weeks.get(weekIndex).days.set(dayToIso(date), value);
  }

  const weekNumbers = Array.from(weeks.keys()).sort((a, b) => a - b);
  if (!weekNumbers.length) {
    return `<div class="mini-heatmap"><div class="mini-heatmap-label">${esc(label)}</div><div class="mini-heatmap-empty">no weekday data</div></div>`;
  }

  const headers = ["Wk", "Mo", "Tu", "We", "Th", "Fr"]
    .map((h) => `<th>${h}</th>`)
    .join("");
  const rows = weekNumbers
    .map((weekNumber) => {
      const row = weeks.get(weekNumber);
      const monday = row.weekStart;
      const cells = [];
      for (let i = 0; i < 5; i += 1) {
        const day = new Date(monday.getTime());
        day.setUTCDate(monday.getUTCDate() + i);
        const iso = dayToIso(day);
        const n = Number(row.days.get(iso) || 0);
        const intensity = n > 0 ? Math.max(0.18, Math.min(1, n / max)) : 0;
        cells.push(
          `<td class="mini-heat-grid-cell ${n > 0 ? "has-value" : ""}" style="${n > 0 ? `opacity:${intensity.toFixed(3)}` : ""}" title="${esc(iso)}: ${n}">${n > 0 ? n : ""}</td>`
        );
      }
      return `<tr><th>${weekNumber}</th>${cells.join("")}</tr>`;
    })
    .join("");

  return `<div class="mini-heatmap"><div class="mini-heatmap-label">${esc(label)}</div><table class="mini-heat-grid"><thead><tr>${headers}</tr></thead><tbody>${rows}</tbody></table></div>`;
}

function renderDayHeatmap(label, byDay) {
  return renderWeeklyHeatmap(label, byDay);
}

function renderMarkdown(md) {
  if (!md) return "<p>Not available for this document.</p>";
  if (typeof marked !== "undefined") return marked.parse(md);
  return `<pre>${esc(md)}</pre>`;
}

function aiDisclaimerHtml() {
  return `<div class="ai-disclaimer"><strong>AI-generated summary:</strong> This material is produced by automated analysis and may be incomplete or wrong. It is informational only, not legal advice. Verify key claims against the source record and use independent judgment before commenting.</div>`;
}

function detailHtml(d, summaryMd, analysisMd) {
  const docId = d.document_id || "";
  const subjectId = d.subject_document_id || d.summary_source_document_id || docId;
  const scoreSourceId = d.score_source_document_id || docId;
  const commentId = d.comment_document_id || docId;
  const commentUrl = d.comment_action_url || `https://www.regulations.gov/commenton/${encodeURIComponent(commentId)}`;
  const commentLabel = d.comment_action_label || "Comment on this NPRM";
  const commentSupported = d.comment_action_supported !== false;
  const commentIssue = d.comment_action_error || "";
  const commentReadUrl = d.comment_read_url || "";
  const docUrl = `https://www.regulations.gov/document/${encodeURIComponent(subjectId)}`;
  const override = (window.__overrides && window.__overrides[docId]) || null;
  const flags = (d.pass_2_flags || []).map((f) => `<li>${esc(flagLabel(f))}</li>`).join("");
  const sources = (d.rule_text_sources || [])
    .map((s) => `<li><a href="${esc(s)}" target="_blank" rel="noopener noreferrer">${esc(s)}</a></li>`)
    .join("");
  const attachments = d.supporting_related_material || [];
  const attachmentRows = attachments.map(attachmentRow).join("");
  const governmentSubmissions = d.government_submissions || [];
  const governmentSubmissionRows = governmentSubmissions.map(govSubmissionRow).join("");
  const referencedDocuments = Array.isArray(d.referenced_documents)
    ? d.referenced_documents
    : [];
  const referencedDocumentRows = referencedDocuments.map(referencedDocumentRow).join("");
  const commentsPanelHtml =
    window.RegwatchComments && typeof window.RegwatchComments.renderCommentsPanel === "function"
      ? window.RegwatchComments.renderCommentsPanel(
          d,
          {
            rowsPerPage: 25,
            showSentiment: true,
            showSelectionMeta: true,
            showFirstPageCards: true,
          },
          {
            esc,
            formatMetricNumber,
            formatPct,
            formatDateOnly,
            formatEasternDateTime,
            commenterTypesText,
            submissionRolesText,
            stanceMixText,
            renderDayHeatmap,
            sentimentNetMeta,
          }
        )
      : "<p>No comment renderer available.</p>";
  const hasSummary = Boolean(d.summary_available && summaryMd);
  const hasAnalysis = Boolean(d.raw_summary_available && analysisMd);
  const summaryBody = `${renderMarkdown(summaryMd)}${aiDisclaimerHtml()}`;
  const analysisBody = `${renderMarkdown(analysisMd)}${aiDisclaimerHtml()}`;

  return `
    <section class="card">
      <h2>${esc(d.title || "(untitled)")}</h2>
      <p class="inline-actions">
        ${
          commentUrl && commentSupported
            ? `<a class="comment-btn" href="${commentUrl}" target="_blank" rel="noopener noreferrer">${esc(commentLabel)}</a>`
            : `<span class="comment-btn disabled" title="${esc(commentIssue || "comment link unavailable")}">${esc(commentLabel)}</span>`
        }
      </p>
      ${!commentSupported ? `<p><em>Comment link check failed (${esc(commentIssue || "unavailable")}). Button disabled pending override.</em></p>` : ""}
      <p><a href="${docUrl}" target="_blank" rel="noopener noreferrer">Open Substantive Document on Regulations.gov</a></p>
      ${commentReadUrl ? `<p><a href="${commentReadUrl}" target="_blank" rel="noopener noreferrer">Read submitted comments</a></p>` : ""}
    </section>
    <section class="tabs">
      <div class="tab-list" role="tablist" aria-label="Document sections">
        <button type="button" class="tab-btn is-active" data-tab="overview" role="tab" aria-selected="true">Overview</button>
        <button type="button" class="tab-btn ${hasSummary ? "" : "is-disabled"}" data-tab="summary" role="tab" aria-selected="false" ${hasSummary ? "" : "disabled"}>Summary</button>
        <button type="button" class="tab-btn ${hasAnalysis ? "" : "is-disabled"}" data-tab="analysis" role="tab" aria-selected="false" ${hasAnalysis ? "" : "disabled"}>Full Analysis</button>
        <button type="button" class="tab-btn" data-tab="comments" role="tab" aria-selected="false">Comments</button>
        <button type="button" class="tab-btn" data-tab="attachments" role="tab" aria-selected="false">Attachments</button>
      </div>

      <div class="tab-panel is-active" data-panel="overview" role="tabpanel">
        <p><strong>Document ID:</strong> ${esc(d.document_id)} | <strong>Docket ID:</strong> ${esc(d.docket_id || "")}</p>
        ${
          subjectId !== docId
            ? `<p><strong>Substantive Rule ID:</strong> ${esc(subjectId)}</p>`
            : ""
        }
        ${
          commentId !== docId
            ? `<p><strong>Comment Notice ID:</strong> ${esc(commentId)}</p>`
            : ""
        }
        ${
          scoreSourceId !== docId
            ? `<p><strong>Score Source ID:</strong> ${esc(scoreSourceId)}</p>`
            : ""
        }
        <p><strong>Agency:</strong> ${esc(d.agency_name || "")} (${esc(d.agency_id || "")})</p>
        <p><strong>Type:</strong> ${esc(d.document_type || "")} | <strong>Comment End:</strong> ${esc(d.comment_end_date || "")}</p>
        <p><strong>Scores:</strong> pass_1=${esc(d.pass_1_score)} (scaled ${pct5(d.pass_1_scaled)}),
           pass_2=${esc(d.pass_2_score)} (scaled ${pct5(d.pass_2_scaled)}),
           combined=${pct5(d.combined_score)}</p>
        ${
          override
            ? `<p><strong>Reviewed Significance:</strong> ${esc(override.display_band || "")}
                 ${override.review_status ? `<span class="review-pill">${esc(override.review_status)}</span>` : ""}</p>
               ${override.note ? `<p class="band-note">${esc(override.note)}</p>` : ""}`
            : ""
        }
        <p><strong>Structural Risk:</strong> ${esc(structuralBandLabel(d.pass_2_risk_band || ""))}</p>
        <p><strong>Pass 2 Type:</strong> ${esc(d.pass_2_rule_type || "")}</p>
        <h3>Structural Flags</h3>
        ${flags ? `<ul>${flags}</ul>` : "<p>None</p>"}
        <h3>Rule Text Sources</h3>
        ${sources ? `<ul>${sources}</ul>` : "<p>None</p>"}
        <h3>Referenced Documents</h3>
        ${
          referencedDocuments.length
            ? `<p><strong>Detected:</strong> ${esc(String(d.referenced_documents_count || referencedDocuments.length))} unique references, ${esc(String(d.referenced_documents_mentions || 0))} total mentions.</p>
               <div class="table-wrap">
                 <table>
                   <thead>
                     <tr>
                       <th>Type</th>
                       <th>ID</th>
                       <th>Mentions</th>
                       <th>From comments</th>
                       <th>From rule text</th>
                     </tr>
                   </thead>
                   <tbody>${referencedDocumentRows}</tbody>
                 </table>
               </div>`
            : "<p>None detected in cached rule/comment text.</p>"
        }
      </div>

      <div class="tab-panel markdown-body" data-panel="summary" role="tabpanel">
        ${summaryBody}
      </div>

      <div class="tab-panel markdown-body" data-panel="analysis" role="tabpanel">
        ${analysisBody}
      </div>

      <div class="tab-panel" data-panel="comments" role="tabpanel">
        ${commentsPanelHtml}
      </div>

      <div class="tab-panel" data-panel="attachments" role="tabpanel">
        ${
          governmentSubmissions.length
            ? `<h3>Government Submissions (From Docket Comments)</h3>
               <table>
                 <thead>
                   <tr>
                     <th>Comment ID</th>
                     <th>Organization</th>
                     <th>Role</th>
                     <th>Date</th>
                     <th>Attachments</th>
                     <th>Withdrawn</th>
                     <th>Title / Excerpt</th>
                   </tr>
                 </thead>
                 <tbody>${governmentSubmissionRows}</tbody>
               </table>`
            : ""
        }
        ${governmentSubmissions.length && attachments.length ? "<h3>Supporting & Related Material</h3>" : ""}
        ${
          attachments.length
            ? `<table>
                <thead>
                  <tr>
                    <th>Document ID</th>
                    <th>Title</th>
                    <th>Subtype</th>
                    <th>Date</th>
                    <th>Authors</th>
                    <th>Pages</th>
                  </tr>
                </thead>
                <tbody>${attachmentRows}</tbody>
              </table>`
            : "<p>No supporting attachment metadata available in current site export.</p>"
        }
      </div>
    </section>
  `;
}

function initTabs() {
  const buttons = Array.from(document.querySelectorAll(".tab-list .tab-btn[data-tab]"));
  const panels = Array.from(document.querySelectorAll(".tab-panel"));
  if (!buttons.length || !panels.length) return;
  const applyTab = (tab) => {
    for (const b of buttons) {
      const active = b.dataset.tab === tab;
      b.classList.toggle("is-active", active);
      b.setAttribute("aria-selected", active ? "true" : "false");
    }
    for (const p of panels) {
      p.classList.toggle("is-active", p.dataset.panel === tab);
    }
  };
  const activateFromHash = () => {
    const tab = tabFromHash();
    if (!tab) return;
    const btn = buttons.find((b) => b.dataset.tab === tab);
    if (!btn || btn.disabled) return;
    applyTab(tab);
  };
  for (const btn of buttons) {
    btn.addEventListener("click", () => {
      if (btn.disabled) return;
      const tab = btn.dataset.tab;
      if (!tab) return;
      applyTab(tab);
      if (tabFromHash() !== tab) {
        window.location.hash = tab;
      }
    });
  }
  window.addEventListener("hashchange", activateFromHash);
  activateFromHash();
}

async function main() {
  const parts = window.location.pathname.split("/").filter(Boolean);
  const docId = parts.length >= 2 && parts[0] === "document" ? parts[1] : "";
  const root = document.getElementById("detailRoot");
  if (!docId) {
    root.innerHTML = "<p>Missing document id in URL.</p>";
    return;
  }
  const [res, overrides] = await Promise.all([
    fetch(`/data/documents/${encodeURIComponent(docId)}.json`, { cache: "no-store" }),
    loadOverrides(),
  ]);
  window.__overrides = overrides || {};
  if (!res.ok) {
    root.innerHTML = `<p>Could not load detail data for ${esc(docId)}.</p>`;
    return;
  }
  const data = await res.json();
  const [summaryRes, analysisRes] = await Promise.all([
    data.summary_available
      ? fetch(`/data/summaries/${encodeURIComponent(docId)}.md`, { cache: "no-store" })
      : Promise.resolve(null),
    data.raw_summary_available
      ? fetch(`/data/summaries_raw/${encodeURIComponent(docId)}.md`, { cache: "no-store" })
      : Promise.resolve(null),
  ]);
  const summaryMd = summaryRes && summaryRes.ok ? await summaryRes.text() : "";
  const analysisMd = analysisRes && analysisRes.ok ? await analysisRes.text() : "";
  root.innerHTML = detailHtml(data, summaryMd, analysisMd);
  initTabs();
  if (window.RegwatchComments && typeof window.RegwatchComments.initCommentPager === "function") {
    window.RegwatchComments.initCommentPager(data.comments_clusters || [], { esc, formatDateOnly });
  }
}

main().catch((err) => {
  const root = document.getElementById("detailRoot");
  root.innerHTML = `<p>Error: ${esc(err.message)}</p>`;
});
