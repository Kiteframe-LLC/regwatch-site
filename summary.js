function esc(value) {
  if (value === null || value === undefined) return "";
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function structuralBandLabel(raw) {
  const map = {
    likely_routine_rule: "Routine Lexicon",
    moderate_analytical_concern: "Moderate Concern",
    high_comment_leverage_probability: "High Leverage",
    not_run_fetch_error: "Not Scored",
    skipped_closed_comment_period: "Skipped",
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

function pageTabFromPath(pathname) {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length >= 3 && parts[2] === "summary") return "summary";
  if (parts.length >= 3 && parts[2] === "analysis") return "analysis";
  return "overview";
}

function detailHtml(d, summaryMd, analysisMd) {
  const activeTab = pageTabFromPath(window.location.pathname);
  const docId = d.document_id || "";
  const subjectId = d.subject_document_id || d.summary_source_document_id || docId;
  const scoreSourceId = d.score_source_document_id || docId;
  const commentId = d.comment_document_id || docId;
  const commentUrl = `https://www.regulations.gov/commenton/${encodeURIComponent(commentId)}`;
  const docUrl = `https://www.regulations.gov/document/${encodeURIComponent(subjectId)}`;
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
  const tabActive = (name) => (activeTab === name ? "is-active" : "");

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
        <a class="tab-btn ${tabActive("overview")}" href="/document/${encodeURIComponent(docId)}/" role="tab" aria-selected="${activeTab === "overview"}">Overview</a>
        <a class="tab-btn ${hasSummary ? tabActive("summary") : "is-disabled"}" href="${hasSummary ? `/document/${encodeURIComponent(docId)}/summary/` : "#"}" role="tab" aria-selected="${activeTab === "summary"}" ${hasSummary ? "" : 'aria-disabled="true"'}>Summary</a>
        <a class="tab-btn ${hasAnalysis ? tabActive("analysis") : "is-disabled"}" href="${hasAnalysis ? `/document/${encodeURIComponent(docId)}/analysis/` : "#"}" role="tab" aria-selected="${activeTab === "analysis"}" ${hasAnalysis ? "" : 'aria-disabled="true"'}>Full Analysis</a>
        <a class="tab-btn ${tabActive("attachments")}" href="/document/${encodeURIComponent(docId)}/?tab=attachments" role="tab" aria-selected="${activeTab === "attachments"}">Attachments</a>
      </div>

      <div class="tab-panel ${tabActive("overview")}" data-panel="overview" role="tabpanel">
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
        <p><strong>Structural Risk:</strong> ${esc(structuralBandLabel(d.pass_2_risk_band || ""))}</p>
        <p><strong>Pass 2 Type:</strong> ${esc(d.pass_2_rule_type || "")}</p>
        <h3>Structural Flags</h3>
        ${flags ? `<ul>${flags}</ul>` : "<p>None</p>"}
        <h3>Rule Text Sources</h3>
        ${sources ? `<ul>${sources}</ul>` : "<p>None</p>"}
      </div>

      <div class="tab-panel markdown-body ${tabActive("summary")}" data-panel="summary" role="tabpanel">
        ${summaryBody}
      </div>

      <div class="tab-panel markdown-body ${tabActive("analysis")}" data-panel="analysis" role="tabpanel">
        ${analysisBody}
      </div>

      <div class="tab-panel ${tabActive("attachments")}" data-panel="attachments" role="tabpanel">
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

async function main() {
  const parts = window.location.pathname.split("/").filter(Boolean);
  const docId = parts.length >= 2 && parts[0] === "document" ? parts[1] : "";
  const root = document.getElementById("summaryRoot");
  if (!docId) {
    root.innerHTML = "<p>Missing document id in URL.</p>";
    return;
  }

  const [detailRes, summaryRes, analysisRes] = await Promise.all([
    fetch(`/data/documents/${encodeURIComponent(docId)}.json`, { cache: "no-store" }),
    fetch(`/data/summaries/${encodeURIComponent(docId)}.md`, { cache: "no-store" }),
    fetch(`/data/summaries_raw/${encodeURIComponent(docId)}.md`, { cache: "no-store" }),
  ]);

  if (!detailRes.ok) {
    root.innerHTML = `<p>Could not load detail data for ${esc(docId)}.</p>`;
    return;
  }

  const detail = await detailRes.json();
  const summaryMd = summaryRes.ok ? await summaryRes.text() : "";
  const analysisMd = analysisRes.ok ? await analysisRes.text() : "";
  root.innerHTML = detailHtml(detail, summaryMd, analysisMd);
}

main().catch((err) => {
  const root = document.getElementById("summaryRoot");
  root.innerHTML = `<p>Error: ${esc(err.message)}</p>`;
});
