function esc(value) {
  if (value === null || value === undefined) return "";
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
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
  const title = esc(doc.title);
  const subtype = esc(doc.document_subtype || "");
  const rcv = esc(doc.received_date || doc.posted_date || "");
  const authors = Array.isArray(doc.authors) ? esc(doc.authors.join("; ")) : esc(doc.authors || "");
  const pages = doc.page_count ?? "";
  return `<tr>
    <td>${id}</td>
    <td>${title}</td>
    <td>${subtype}</td>
    <td>${rcv}</td>
    <td>${authors}</td>
    <td>${pages}</td>
  </tr>`;
}

function renderMarkdown(md) {
  if (!md) return "<p>Not available for this document.</p>";
  if (typeof marked !== "undefined") return marked.parse(md);
  return `<pre>${esc(md)}</pre>`;
}

function detailHtml(d, summaryMd, analysisMd) {
  const docId = d.document_id || "";
  const subjectId = d.subject_document_id || d.summary_source_document_id || docId;
  const scoreSourceId = d.score_source_document_id || docId;
  const commentId = d.comment_document_id || docId;
  const commentUrl = `https://www.regulations.gov/commenton/${encodeURIComponent(commentId)}`;
  const docUrl = `https://www.regulations.gov/document/${encodeURIComponent(subjectId)}`;
  const override = (window.__overrides && window.__overrides[docId]) || null;
  const flags = (d.pass_2_flags || []).map((f) => `<li>${esc(flagLabel(f))}</li>`).join("");
  const sources = (d.rule_text_sources || [])
    .map((s) => `<li><a href="${esc(s)}" target="_blank" rel="noopener noreferrer">${esc(s)}</a></li>`)
    .join("");
  const attachments = d.supporting_related_material || [];
  const attachmentRows = attachments.map(attachmentRow).join("");
  const hasSummary = Boolean(d.summary_available && summaryMd);
  const hasAnalysis = Boolean(d.raw_summary_available && analysisMd);
  const summaryBody = renderMarkdown(summaryMd);
  const analysisBody = renderMarkdown(analysisMd);

  return `
    <section class="card">
      <h2>${esc(d.title || "(untitled)")}</h2>
      <p class="inline-actions">
        <a class="comment-btn" href="${commentUrl}" target="_blank" rel="noopener noreferrer">Comment on this NPRM</a>
      </p>
      <p><a href="${docUrl}" target="_blank" rel="noopener noreferrer">Open Substantive Document on Regulations.gov</a></p>
    </section>
    <section class="tabs">
      <div class="tab-list" role="tablist" aria-label="Document sections">
        <button type="button" class="tab-btn is-active" data-tab="overview" role="tab" aria-selected="true">Overview</button>
        <button type="button" class="tab-btn ${hasSummary ? "" : "is-disabled"}" data-tab="summary" role="tab" aria-selected="false" ${hasSummary ? "" : "disabled"}>Summary</button>
        <button type="button" class="tab-btn ${hasAnalysis ? "" : "is-disabled"}" data-tab="analysis" role="tab" aria-selected="false" ${hasAnalysis ? "" : "disabled"}>Full Analysis</button>
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
      </div>

      <div class="tab-panel markdown-body" data-panel="summary" role="tabpanel">
        ${summaryBody}
      </div>

      <div class="tab-panel markdown-body" data-panel="analysis" role="tabpanel">
        ${analysisBody}
      </div>

      <div class="tab-panel" data-panel="attachments" role="tabpanel">
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
  const buttons = Array.from(document.querySelectorAll(".tab-btn"));
  const panels = Array.from(document.querySelectorAll(".tab-panel"));
  if (!buttons.length || !panels.length) return;
  for (const btn of buttons) {
    btn.addEventListener("click", () => {
      if (btn.disabled) return;
      const tab = btn.dataset.tab;
      for (const b of buttons) {
        const active = b === btn;
        b.classList.toggle("is-active", active);
        b.setAttribute("aria-selected", active ? "true" : "false");
      }
      for (const p of panels) {
        p.classList.toggle("is-active", p.dataset.panel === tab);
      }
    });
  }
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
}

main().catch((err) => {
  const root = document.getElementById("detailRoot");
  root.innerHTML = `<p>Error: ${esc(err.message)}</p>`;
});
