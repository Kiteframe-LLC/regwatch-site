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
  const commentSupported = d.comment_action_supported !== false;
  const commentIssue = d.comment_action_error || "";
  const commentReadUrl = d.comment_read_url || "";
  const docUrl = `https://www.regulations.gov/document/${encodeURIComponent(subjectId)}`;
  const flags = (d.pass_2_flags || []).map((f) => `<li>${esc(flagLabel(f))}</li>`).join("");
  const sources = (d.rule_text_sources || [])
    .map((s) => `<li><a href="${esc(s)}" target="_blank" rel="noopener noreferrer">${esc(s)}</a></li>`)
    .join("");
  const attachments = d.supporting_related_material || [];
  const attachmentRows = attachments.map(attachmentRow).join("");
  const comments = d.comments_clusters || [];
  const sentimentPos = Number(d.comments_sentiment_positive_pct || 0);
  const sentimentNeg = Number(d.comments_sentiment_negative_pct || 0);
  const sentimentNeu = Number(d.comments_sentiment_neutral_pct || 0);
  const sentimentNet = Number(d.comments_sentiment_net || 0);
  const sentimentSample = Number(d.comments_sentiment_sample_size || 0);
  const sentimentNetView = sentimentNetMeta(sentimentNet, sentimentSample);
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
          <div class="metric-card"><div class="metric-label">Positive</div><div class="metric-value">${esc(formatPct(sentimentPos))}</div></div>
          <div class="metric-card"><div class="metric-label">Negative</div><div class="metric-value">${esc(formatPct(sentimentNeg))}</div></div>
          <div class="metric-card"><div class="metric-label">Neutral</div><div class="metric-value">${esc(formatPct(sentimentNeu))}</div></div>
          <div class="metric-card"><div class="metric-label">Net sentiment</div><div class="metric-value"><span class="review-pill ${esc(sentimentNetView.cls)}">${esc(sentimentNetView.label)}</span></div></div>
          <div class="metric-card"><div class="metric-label">Sentiment sample</div><div class="metric-value">${esc(formatMetricNumber(sentimentSample))}</div></div>
        </div>
        <p><strong>Commenter types:</strong> ${esc(commenterTypesText(d.comments_commenter_type_counts || {}))}</p>
        <p><strong>Submission roles:</strong> ${esc(submissionRolesText(d.comments_submission_role_counts || {}))}</p>
        <p><strong>Submission channels:</strong> ${esc(commenterTypesText(d.comments_submission_channel_counts || {}))}</p>
        <p><strong>Selection:</strong> ${esc(d.comments_display_strategy || "default")} | first-page coverage ${esc(formatPct(d.comments_first_page_coverage_share || 0))} | stance mix ${esc(stanceMixText(d.comments_first_page_stance_counts || {}))} | days represented ${esc(d.comments_first_page_unique_days || 0)}</p>
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
            ? `<div class="comment-metrics-grid">
                <div class="metric-card"><div class="metric-label">Displayed / analyzed clusters</div><div class="metric-value">${esc(formatMetricNumber(d.comments_first_page_count || 0))}/${esc(formatMetricNumber(d.comments_clusters_total_available || 0))}</div></div>
                <div class="metric-card"><div class="metric-label">High-signal on page 1</div><div class="metric-value">${esc(formatMetricNumber(d.comments_first_page_high_signal_clusters || 0))}</div></div>
                <div class="metric-card"><div class="metric-label">Novelty on page 1</div><div class="metric-value">${esc(formatMetricNumber(d.comments_first_page_novelty_clusters || 0))}</div></div>
                <div class="metric-card"><div class="metric-label">Represented comments</div><div class="metric-value">${esc(formatMetricNumber(d.comments_first_page_coverage_count || 0))}/${esc(formatMetricNumber(d.comments_total || 0))}</div></div>
              </div>
              <table>
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
  initCommentPager(detail.comments_clusters || []);
}

main().catch((err) => {
  const root = document.getElementById("summaryRoot");
  root.innerHTML = `<p>Error: ${esc(err.message)}</p>`;
});
