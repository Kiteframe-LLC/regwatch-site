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

function renderDayHeatmap(label, byDay) {
  const entries = Object.entries(byDay || {})
    .filter(([, v]) => Number(v || 0) > 0)
    .sort(([a], [b]) => a.localeCompare(b));
  if (!entries.length) {
    return `<div class="mini-heatmap"><div class="mini-heatmap-label">${esc(label)}</div><div class="mini-heatmap-empty">no data</div></div>`;
  }
  const max = Math.max(...entries.map(([, v]) => Number(v || 0)), 1);
  const cells = entries
    .map(([day, value]) => {
      const n = Number(value || 0);
      const intensity = Math.max(0.18, Math.min(1, n / max));
      const dayShort = day.length >= 10 ? day.slice(5) : day;
      return `<span class="mini-heat-cell" style="opacity:${intensity.toFixed(3)}" title="${esc(day)}: ${n}">${esc(dayShort)}<em>${n}</em></span>`;
    })
    .join("");
  return `<div class="mini-heatmap"><div class="mini-heatmap-label">${esc(label)}</div><div class="mini-heatmap-cells">${cells}</div></div>`;
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

function aiDisclaimerHtml() {
  return `<div class="ai-disclaimer"><strong>AI-generated summary:</strong> This material is produced by automated analysis and may be incomplete or wrong. It is informational only, not legal advice. Verify key claims against the source record and use independent judgment before commenting.</div>`;
}

const TAB_NAMES = new Set(["overview", "summary", "analysis", "comments", "attachments"]);

function tabFromHash(hash) {
  const hashTab = String(hash || "").replace(/^#/, "").trim().toLowerCase();
  if (TAB_NAMES.has(hashTab)) return hashTab;
  return "";
}

function detailHtml(d, summaryMd, analysisMd) {
  const activeTab = tabFromHash(window.location.hash) || "overview";
  const docId = d.document_id || "";
  const subjectId = d.subject_document_id || d.summary_source_document_id || docId;
  const scoreSourceId = d.score_source_document_id || docId;
  const commentId = d.comment_document_id || docId;
  const commentUrl = d.comment_action_url || `https://www.regulations.gov/commenton/${encodeURIComponent(commentId)}`;
  const commentLabel = d.comment_action_label || "Comment on this NPRM";
  const commentReadUrl = d.comment_read_url || "";
  const docUrl = `https://www.regulations.gov/document/${encodeURIComponent(subjectId)}`;
  const flags = (d.pass_2_flags || []).map((f) => `<li>${esc(flagLabel(f))}</li>`).join("");
  const sources = (d.rule_text_sources || [])
    .map((s) => `<li><a href="${esc(s)}" target="_blank" rel="noopener noreferrer">${esc(s)}</a></li>`)
    .join("");
  const attachments = d.supporting_related_material || [];
  const attachmentRows = attachments.map(attachmentRow).join("");
  const governmentSubmissions = d.government_submissions || [];
  const governmentSubmissionRows = governmentSubmissions.map(govSubmissionRow).join("");
  const comments = d.comments_clusters || [];
  const rowsPerPage = 25;
  const totalCommentPages = Math.max(1, Math.ceil(comments.length / rowsPerPage));
  const commentRows = commentRowsHtml(comments, 1, rowsPerPage);
  const hasSummary = Boolean(d.summary_available && summaryMd);
  const hasAnalysis = Boolean(d.raw_summary_available && analysisMd);
  const summaryBody = `${renderMarkdown(summaryMd)}${aiDisclaimerHtml()}`;
  const analysisBody = `${renderMarkdown(analysisMd)}${aiDisclaimerHtml()}`;
  const tabActive = (name) => (activeTab === name ? "is-active" : "");
  const docBase = `/document/${encodeURIComponent(docId)}/`;

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
        <a class="tab-btn ${tabActive("overview")}" href="${docBase}#overview" role="tab" aria-selected="${activeTab === "overview"}">Overview</a>
        <a class="tab-btn ${hasSummary ? tabActive("summary") : "is-disabled"}" href="${hasSummary ? `${docBase}#summary` : "#"}" role="tab" aria-selected="${activeTab === "summary"}" ${hasSummary ? "" : 'aria-disabled="true"'}>Summary</a>
        <a class="tab-btn ${hasAnalysis ? tabActive("analysis") : "is-disabled"}" href="${hasAnalysis ? `${docBase}#analysis` : "#"}" role="tab" aria-selected="${activeTab === "analysis"}" ${hasAnalysis ? "" : 'aria-disabled="true"'}>Full Analysis</a>
        <a class="tab-btn ${tabActive("comments")}" href="${docBase}#comments" role="tab" aria-selected="${activeTab === "comments"}">Comments</a>
        <a class="tab-btn ${tabActive("attachments")}" href="${docBase}#attachments" role="tab" aria-selected="${activeTab === "attachments"}">Attachments</a>
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

      <div class="tab-panel ${tabActive("comments")}" data-panel="comments" role="tabpanel">
        <div class="comment-metrics-grid">
          <div class="metric-card"><div class="metric-label">Total comments</div><div class="metric-value">${esc(formatMetricNumber(d.comments_total || 0))}</div></div>
          <div class="metric-card"><div class="metric-label">Fetched sample</div><div class="metric-value">${esc(formatMetricNumber(d.comments_fetched || 0))}</div></div>
          <div class="metric-card"><div class="metric-label">Hydrated text</div><div class="metric-value">${esc(formatMetricNumber(d.comments_text_hydrated || 0))}</div></div>
          <div class="metric-card"><div class="metric-label">Unique clusters</div><div class="metric-value">${esc(formatMetricNumber(d.comments_unique_clusters || 0))}</div></div>
          <div class="metric-card"><div class="metric-label">Clustered duplicates</div><div class="metric-value">${esc(formatMetricNumber(d.comments_clustered_duplicates || 0))}</div></div>
          <div class="metric-card"><div class="metric-label">Source</div><div class="metric-value">${esc(d.comments_source || "unknown")}</div></div>
          <div class="metric-card"><div class="metric-label">Citizen comments</div><div class="metric-value">${esc(formatMetricNumber(d.comments_citizen_count || 0))}</div></div>
          <div class="metric-card"><div class="metric-label">Novel cluster share</div><div class="metric-value">${esc(formatPct(d.comments_novel_comment_rate || 0))}</div></div>
          <div class="metric-card"><div class="metric-label">Public channel</div><div class="metric-value">${esc(formatMetricNumber(d.comments_public_count || 0))}</div></div>
          <div class="metric-card"><div class="metric-label">Recorded channel</div><div class="metric-value">${esc(formatMetricNumber(d.comments_recorded_count || 0))}</div></div>
          <div class="metric-card"><div class="metric-label">Agency material</div><div class="metric-value">${esc(formatMetricNumber(d.comments_agency_material_count || 0))}</div></div>
        </div>
        <p><strong>Commenter types:</strong> ${esc(commenterTypesText(d.comments_commenter_type_counts || {}))}</p>
        <p><strong>Submission roles:</strong> ${esc(submissionRolesText(d.comments_submission_role_counts || {}))}</p>
        <p><strong>Submission channels:</strong> ${esc(commenterTypesText(d.comments_submission_channel_counts || {}))}</p>
        ${
          Number(d.government_submissions_count || 0) > 0
            ? `<p><strong>Government submissions detected:</strong> <span class="review-pill sentiment-negative">${esc(formatMetricNumber(d.government_submissions_count || 0))}</span></p>`
            : ""
        }
        <div class="comment-heatmaps">
          ${renderDayHeatmap("New clusters/day", d.comments_new_cluster_count_by_day || {})}
          ${renderDayHeatmap("High-signal/day", d.comments_high_signal_cluster_count_by_day || {})}
        </div>
        <p><strong>Freshness (ET):</strong> bulk snapshot ${esc(formatEasternDateTime(d.comments_bulk_last_posted_date))} | API last seen ${esc(formatEasternDateTime(d.comments_api_last_seen_at))}</p>
        ${samplingBackfillHtml(d)}
        ${d.comment_count_supported === false ? `<p><em>${esc(d.comment_count_note || "Comment counts are not available for this comment channel.")}</em></p>` : ""}
        ${d.comments_truncated ? "<p><em>Comment sample is truncated for performance.</em></p>" : ""}
        ${d.comments_error ? `<p><em>Comments warning: ${esc(d.comments_error)}</em></p>` : ""}
        ${
          comments.length
            ? `<table>
                <thead>
                  <tr>
                    <th>Count</th>
                    <th>Sentiment</th>
                    <th>Channel</th>
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

      <div class="tab-panel ${tabActive("attachments")}" data-panel="attachments" role="tabpanel">
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

async function main() {
  const parts = window.location.pathname.split("/").filter(Boolean);
  const docId = parts.length >= 2 && parts[0] === "document" ? parts[1] : "";
  const root = document.getElementById("analysisRoot");
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
  initCommentPager(detail.comments_clusters || []);
}

main().catch((err) => {
  const root = document.getElementById("analysisRoot");
  root.innerHTML = `<p>Error: ${esc(err.message)}</p>`;
});
