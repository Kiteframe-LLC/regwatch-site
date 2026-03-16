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

function commentClusterRow(cluster) {
  const count = Number(cluster.count || 0);
  const pageCount = Number(cluster.page_count || 0);
  const cid = esc(cluster.representative_comment_id || "");
  const posted = esc(formatDateOnly(cluster.representative_posted_date || ""));
  const chars = Number(cluster.representative_length || 0);
  const excerpt = esc(cluster.representative_excerpt || "");
  return `<tr>
    <td>${count}</td>
    <td>${pageCount || ""}</td>
    <td>${cid ? `<a href="https://www.regulations.gov/comment/${encodeURIComponent(cluster.representative_comment_id || "")}" target="_blank" rel="noopener noreferrer">${cid}</a>` : ""}</td>
    <td>${posted}</td>
    <td>${chars}</td>
    <td>${excerpt}</td>
  </tr>`;
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

function commentRowsHtml(comments, page, perPage) {
  const start = Math.max(0, (page - 1) * perPage);
  const end = start + perPage;
  return comments.slice(start, end).map(commentClusterRow).join("");
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
  const commentUrl = d.comment_action_url || `https://www.regulations.gov/commenton/${encodeURIComponent(commentId)}`;
  const commentLabel = d.comment_action_label || "Comment on this NPRM";
  const commentReadUrl = d.comment_read_url || "";
  const docUrl = `https://www.regulations.gov/document/${encodeURIComponent(subjectId)}`;
  const override = (window.__overrides && window.__overrides[docId]) || null;
  const flags = (d.pass_2_flags || []).map((f) => `<li>${esc(flagLabel(f))}</li>`).join("");
  const sources = (d.rule_text_sources || [])
    .map((s) => `<li><a href="${esc(s)}" target="_blank" rel="noopener noreferrer">${esc(s)}</a></li>`)
    .join("");
  const attachments = d.supporting_related_material || [];
  const attachmentRows = attachments.map(attachmentRow).join("");
  const comments = d.comments_clusters || [];
  const rowsPerPage = 25;
  const totalCommentPages = Math.max(1, Math.ceil(comments.length / rowsPerPage));
  const commentRows = commentRowsHtml(comments, 1, rowsPerPage);
  const zipPrefixSpan = Number(d.comments_zip_prefix_span || 0);
  const zipPrefixDisplay = zipPrefixSpan > 0 ? String(zipPrefixSpan) : "n/a";
  const hasSummary = Boolean(d.summary_available && summaryMd);
  const hasAnalysis = Boolean(d.raw_summary_available && analysisMd);
  const summaryBody = renderMarkdown(summaryMd);
  const analysisBody = renderMarkdown(analysisMd);

  return `
    <section class="card">
      <h2>${esc(d.title || "(untitled)")}</h2>
      <p class="inline-actions">
        <a class="comment-btn" href="${commentUrl}" target="_blank" rel="noopener noreferrer">${esc(commentLabel)}</a>
      </p>
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
      </div>

      <div class="tab-panel markdown-body" data-panel="summary" role="tabpanel">
        ${summaryBody}
      </div>

      <div class="tab-panel markdown-body" data-panel="analysis" role="tabpanel">
        ${analysisBody}
      </div>

      <div class="tab-panel" data-panel="comments" role="tabpanel">
        <p><strong>Total comments:</strong> ${esc(d.comments_total || 0)} |
           <strong>Fetched:</strong> ${esc(d.comments_fetched || 0)} |
           <strong>Hydrated text:</strong> ${esc(d.comments_text_hydrated || 0)} |
           <strong>Unique clusters:</strong> ${esc(d.comments_unique_clusters || 0)} |
           <strong>Clustered duplicates:</strong> ${esc(d.comments_clustered_duplicates || 0)}</p>
        <p><strong>Source:</strong> ${esc(d.comments_source || "unknown")} |
           <strong>Citizen count:</strong> ${esc(d.comments_citizen_count || 0)} |
           <strong>ZIP prefix span:</strong> ${zipPrefixDisplay} |
           <strong>Novel rate:</strong> ${esc(((Number(d.comments_novel_comment_rate || 0)).toFixed(3)))}</p>
        ${d.comment_count_supported === false ? `<p><em>${esc(d.comment_count_note || "Comment counts are not available for this comment channel.")}</em></p>` : ""}
        <p><strong>Commenter types:</strong> ${esc(JSON.stringify(d.comments_commenter_type_counts || {}))}</p>
        <p><strong>New clusters/day:</strong> ${esc(JSON.stringify(d.comments_new_cluster_count_by_day || {}))} |
           <strong>High-signal/day:</strong> ${esc(JSON.stringify(d.comments_high_signal_cluster_count_by_day || {}))}</p>
        <p><strong>Freshness:</strong> bulk_last=${esc(d.comments_bulk_last_posted_date || "")}
           api_seen=${esc(d.comments_api_last_seen_at || "")}</p>
        ${d.comments_truncated ? "<p><em>Comment sample is truncated for performance.</em></p>" : ""}
        ${d.comments_error ? `<p><em>Comments warning: ${esc(d.comments_error)}</em></p>` : ""}
        ${
          comments.length
            ? `<table>
                <thead>
                  <tr>
                    <th>Count</th>
                    <th>Pages</th>
                    <th>Representative Comment ID</th>
                    <th>Date</th>
                    <th>Chars</th>
                    <th>Representative Excerpt</th>
                  </tr>
                </thead>
                <tbody id="commentRowsBody">${commentRows}</tbody>
              </table>
              <div class="inline-actions" id="commentPager" data-total-pages="${totalCommentPages}" data-page-size="${rowsPerPage}">
                <button type="button" class="action-btn" id="commentPrevBtn" disabled>Prev</button>
                <span id="commentPageLabel">Page 1 of ${totalCommentPages}</span>
                <button type="button" class="action-btn" id="commentNextBtn" ${totalCommentPages > 1 ? "" : "disabled"}>Next</button>
              </div>`
            : "<p>No comment text clusters available in current site export.</p>"
        }
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

function initCommentPager(comments) {
  const pager = document.getElementById("commentPager");
  const body = document.getElementById("commentRowsBody");
  const prev = document.getElementById("commentPrevBtn");
  const next = document.getElementById("commentNextBtn");
  const label = document.getElementById("commentPageLabel");
  if (!pager || !body || !prev || !next || !label) return;
  const totalPages = Number(pager.dataset.totalPages || 1);
  const perPage = Number(pager.dataset.pageSize || 25);
  let page = 1;
  const renderPage = () => {
    body.innerHTML = commentRowsHtml(comments || [], page, perPage);
    label.textContent = `Page ${page} of ${totalPages}`;
    prev.disabled = page <= 1;
    next.disabled = page >= totalPages;
  };
  prev.addEventListener("click", () => {
    if (page > 1) {
      page -= 1;
      renderPage();
    }
  });
  next.addEventListener("click", () => {
    if (page < totalPages) {
      page += 1;
      renderPage();
    }
  });
}

function initTabs() {
  const buttons = Array.from(document.querySelectorAll(".tab-list .tab-btn[data-tab]"));
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
  initCommentPager(data.comments_clusters || []);
}

main().catch((err) => {
  const root = document.getElementById("detailRoot");
  root.innerHTML = `<p>Error: ${esc(err.message)}</p>`;
});
