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

function detailHtml(d) {
  const docId = d.document_id || "";
  const commentUrl = `https://www.regulations.gov/commenton/${encodeURIComponent(docId)}`;
  const summaryUrl = d.summary_available ? `/document/${encodeURIComponent(docId)}/summary/` : "";
  const override = (window.__overrides && window.__overrides[docId]) || null;
  const flags = (d.pass_2_flags || []).map((f) => `<li>${esc(flagLabel(f))}</li>`).join("");
  const sources = (d.rule_text_sources || [])
    .map((s) => `<li><a href="${esc(s)}" target="_blank" rel="noopener noreferrer">${esc(s)}</a></li>`)
    .join("");
  const attachments = d.supporting_related_material || [];
  const attachmentRows = attachments.map(attachmentRow).join("");

  return `
    <section class="card">
      <h2>${esc(d.title || "(untitled)")}</h2>
      <p class="inline-actions">
        <a class="comment-btn" href="${commentUrl}" target="_blank" rel="noopener noreferrer">Comment on this NPRM</a>
        ${summaryUrl ? `<a class="action-btn" href="${summaryUrl}">Summary</a>` : ""}
      </p>
      <p><strong>Document ID:</strong> ${esc(d.document_id)} | <strong>Docket ID:</strong> ${esc(d.docket_id || "")}</p>
      <p><strong>Agency:</strong> ${esc(d.agency_name || "")} (${esc(d.agency_id || "")})</p>
      <p><strong>Type:</strong> ${esc(d.document_type || "")} | <strong>Comment End:</strong> ${esc(d.comment_end_date || "")}</p>
      <p><strong>Scores:</strong> pass_1=${esc(d.pass_1_score)} (scaled ${Number(d.pass_1_scaled || 0).toFixed(6)}),
         pass_2=${esc(d.pass_2_score)} (scaled ${Number(d.pass_2_scaled || 0).toFixed(6)}),
         combined=${Number(d.combined_score || 0).toFixed(6)}</p>
      ${
        override
          ? `<p><strong>Reviewed Significance:</strong> ${esc(override.display_band || "")}
               ${override.review_status ? `<span class="review-pill">${esc(override.review_status)}</span>` : ""}</p>
             ${override.note ? `<p class="band-note">${esc(override.note)}</p>` : ""}`
          : ""
      }
      <p><strong>Structural Risk:</strong> ${esc(structuralBandLabel(d.pass_2_risk_band || ""))}</p>
      <p><strong>Pass 2 Type:</strong> ${esc(d.pass_2_rule_type || "")}</p>
      <p><a href="https://www.regulations.gov/document/${encodeURIComponent(d.document_id || "")}" target="_blank" rel="noopener noreferrer">Open on Regulations.gov</a></p>
      <h3>Structural Flags</h3>
      ${flags ? `<ul>${flags}</ul>` : "<p>None</p>"}
      <h3>Rule Text Sources</h3>
      ${sources ? `<ul>${sources}</ul>` : "<p>None</p>"}
    </section>

    <section>
      <h3>Attachments / Supporting Materials</h3>
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
    </section>
  `;
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
  root.innerHTML = detailHtml(data);
}

main().catch((err) => {
  const root = document.getElementById("detailRoot");
  root.innerHTML = `<p>Error: ${esc(err.message)}</p>`;
});
