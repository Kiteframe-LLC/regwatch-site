(function () {
  function fallbackEsc(value) {
    if (value === null || value === undefined) return "";
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");
  }

  function fallbackPct(value) {
    const v = Number(value || 0);
    return `${Math.round(v * 100)}%`;
  }

  function fallbackDateOnly(raw) {
    return String(raw || "").slice(0, 10);
  }

  function fallbackHeatmap(label) {
    return `<div class="mini-heatmap"><div class="mini-heatmap-label">${fallbackEsc(label)}</div><div class="mini-heatmap-empty">no renderer</div></div>`;
  }

  function fallbackSentimentNetMeta(net, sample) {
    if (!Number.isFinite(net) || sample <= 0 || Math.abs(net) < 0.03) {
      return { label: "Net: neutral", cls: "sentiment-neutral" };
    }
    if (net > 0) return { label: `Net: +${fallbackPct(net)}`, cls: "sentiment-positive" };
    return { label: `Net: -${fallbackPct(Math.abs(net))}`, cls: "sentiment-negative" };
  }

  function humanBasisLabel(raw) {
    const key = String(raw || "").toLowerCase();
    if (key === "representative_sample") return "Representative sample";
    if (!key) return "Unknown";
    return key.replace(/_/g, " ");
  }

  function fallbackMetricNumber(v) {
    return String(Number(v || 0));
  }

  function samplingBackfillHtml(detail, esc, formatMetricNumber) {
    const d = detail || {};
    const fmt = typeof formatMetricNumber === "function" ? formatMetricNumber : fallbackMetricNumber;
    const selected = Number(d.comments_representative_selected || 0);
    const prior = Number(d.comments_representative_prior_selected || 0);
    const newly = Number(d.comments_representative_newly_selected || 0);
    const mustKeep = Number(d.comments_representative_must_keep || 0);
    const budget = Number(d.comments_representative_run_budget || 0);
    const missing = Number(d.comments_representative_missing_from_archive || 0);
    const priorMissing = Number(d.comments_representative_prior_missing || 0);
    const cap = Number(d.comments_analysis_cap_per_period || 0);
    const sampleSize = Number(d.comments_analysis_sample_size || 0);
    const backfillComplete = Boolean(d.comments_api_backfill_complete);
    const backfillPage = Number(d.comments_api_backfill_next_page || 1);
    const backfillSort = String(d.comments_api_backfill_sort || "postedDate");
    const overflow = Boolean(d.comments_representative_overflow);
    return `<p><strong>Sampling basis:</strong> ${esc(humanBasisLabel(d.comments_metrics_basis))}
      | <strong>Representative:</strong> ${esc(fmt(selected))} selected (${esc(fmt(prior))} prior, ${esc(fmt(newly))} new)
      | <strong>Cap:</strong> ${esc(fmt(cap))}/period
      | <strong>Sample size:</strong> ${esc(fmt(sampleSize))}
      | <strong>Must-keep:</strong> ${esc(fmt(mustKeep))}
      | <strong>Run budget:</strong> ${esc(fmt(budget))}
      | <strong>Overflow:</strong> ${overflow ? "yes" : "no"}
      | <strong>Missing archive:</strong> ${esc(fmt(missing))} (prior ${esc(fmt(priorMissing))})
      | <strong>Backfill:</strong> ${backfillComplete ? "complete" : "in progress"}
      (next page ${esc(fmt(backfillPage))}, sort ${esc(backfillSort)})</p>`;
  }

  function resolveClusterSentiment(cluster) {
    const stance = String(
      (cluster && (
        cluster.representative_stance ||
        cluster.representative_library_stance ||
        cluster.representative_lexical_stance
      )) || ""
    ).toLowerCase();
    const sentimentClass =
      stance === "positive"
        ? "sentiment-positive"
        : stance === "negative"
          ? "sentiment-negative"
          : "sentiment-neutral";
    const sentimentLabel = stance || "neutral";
    return { sentimentClass, sentimentLabel };
  }

  function resolveSubmissionChannel(cluster) {
    const raw = String((cluster && cluster.representative_submission_channel) || "unknown").toLowerCase();
    if (raw === "public_portal") return { cls: "sentiment-positive", label: "Public" };
    if (raw === "other_channel_recorded") return { cls: "sentiment-neutral", label: "Recorded" };
    if (raw === "agency_material") return { cls: "sentiment-negative", label: "Agency" };
    return { cls: "review-pill", label: "Unknown" };
  }

  function commentClusterRow(cluster, esc, formatDateOnly) {
    const count = Number((cluster && cluster.count) || 0);
    const sentiment = resolveClusterSentiment(cluster || {});
    const channel = resolveSubmissionChannel(cluster || {});
    const cid = esc((cluster && cluster.representative_comment_id) || "");
    const posted = esc(formatDateOnly((cluster && cluster.representative_posted_date) || ""));
    const chars = Number((cluster && cluster.representative_length) || 0);
    const excerpt = esc((cluster && cluster.representative_excerpt) || "");
    return `<tr>
    <td>${count}</td>
    <td><span class="review-pill ${sentiment.sentimentClass}">${esc(sentiment.sentimentLabel)}</span></td>
    <td><span class="review-pill ${channel.cls}">${esc(channel.label)}</span></td>
    <td>${cid ? `<a href="https://www.regulations.gov/comment/${encodeURIComponent((cluster && cluster.representative_comment_id) || "")}" target="_blank" rel="noopener noreferrer">${cid}</a>` : ""}</td>
    <td>${posted}</td>
    <td>${chars}</td>
    <td>${excerpt}</td>
  </tr>`;
  }

  function commentRowsHtml(comments, page, perPage, esc, formatDateOnly) {
    const start = Math.max(0, (page - 1) * perPage);
    const end = start + perPage;
    return (comments || [])
      .slice(start, end)
      .map((cluster) => commentClusterRow(cluster, esc, formatDateOnly))
      .join("");
  }

  function renderCommentsPanel(detail, options, helpers) {
    const d = detail || {};
    const opts = options || {};
    const h = helpers || {};
    const esc = typeof h.esc === "function" ? h.esc : fallbackEsc;
    const formatMetricNumber = typeof h.formatMetricNumber === "function" ? h.formatMetricNumber : fallbackMetricNumber;
    const formatPct = typeof h.formatPct === "function" ? h.formatPct : fallbackPct;
    const formatDateOnly = typeof h.formatDateOnly === "function" ? h.formatDateOnly : fallbackDateOnly;
    const formatEasternDateTime =
      typeof h.formatEasternDateTime === "function" ? h.formatEasternDateTime : (raw) => esc(raw || "n/a");
    const commenterTypesText = typeof h.commenterTypesText === "function" ? h.commenterTypesText : () => "n/a";
    const submissionRolesText = typeof h.submissionRolesText === "function" ? h.submissionRolesText : () => "n/a";
    const stanceMixText = typeof h.stanceMixText === "function" ? h.stanceMixText : () => "n/a";
    const renderDayHeatmap = typeof h.renderDayHeatmap === "function" ? h.renderDayHeatmap : fallbackHeatmap;
    const sentimentNetMeta =
      typeof h.sentimentNetMeta === "function" ? h.sentimentNetMeta : fallbackSentimentNetMeta;
    const comments = Array.isArray(d.comments_clusters) ? d.comments_clusters : [];
    const rowsPerPage = Number(opts.rowsPerPage || 25);
    const totalCommentPages = Math.max(1, Math.ceil(comments.length / rowsPerPage));
    const commentRows = commentRowsHtml(comments, 1, rowsPerPage, esc, formatDateOnly);
    const showSelectionMeta = opts.showSelectionMeta !== false;
    const showFirstPageCards = Boolean(opts.showFirstPageCards);
    const showSentiment = Boolean(opts.showSentiment);
    const sentimentPos = Number(d.comments_sentiment_positive_pct || 0);
    const sentimentNeg = Number(d.comments_sentiment_negative_pct || 0);
    const sentimentNeu = Number(d.comments_sentiment_neutral_pct || 0);
    const sentimentNet = Number(d.comments_sentiment_net || 0);
    const sentimentSample = Number(d.comments_sentiment_sample_size || 0);
    const sentimentNetView = sentimentNetMeta(sentimentNet, sentimentSample);
    return `<div class="comment-metrics-grid">
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
          ${
            showSentiment
              ? `<div class="metric-card"><div class="metric-label">Positive</div><div class="metric-value">${esc(formatPct(sentimentPos))}</div></div>
          <div class="metric-card"><div class="metric-label">Negative</div><div class="metric-value">${esc(formatPct(sentimentNeg))}</div></div>
          <div class="metric-card"><div class="metric-label">Neutral</div><div class="metric-value">${esc(formatPct(sentimentNeu))}</div></div>
          <div class="metric-card"><div class="metric-label">Net sentiment</div><div class="metric-value"><span class="review-pill ${esc(sentimentNetView.cls)}">${esc(sentimentNetView.label)}</span></div></div>
          <div class="metric-card"><div class="metric-label">Sentiment sample</div><div class="metric-value">${esc(formatMetricNumber(sentimentSample))}</div></div>`
              : ""
          }
        </div>
        <p><strong>Commenter types:</strong> ${esc(commenterTypesText(d.comments_commenter_type_counts || {}))}</p>
        <p><strong>Submission roles:</strong> ${esc(submissionRolesText(d.comments_submission_role_counts || {}))}</p>
        <p><strong>Submission channels:</strong> ${esc(commenterTypesText(d.comments_submission_channel_counts || {}))}</p>
        ${
          Number(d.government_submissions_count || 0) > 0
            ? `<p><strong>Government submissions detected:</strong> <span class="review-pill sentiment-negative">${esc(formatMetricNumber(d.government_submissions_count || 0))}</span></p>`
            : ""
        }
        ${
          showSelectionMeta
            ? `<p><strong>Selection:</strong> ${esc(d.comments_display_strategy || "default")} | first-page coverage ${esc(formatPct(d.comments_first_page_coverage_share || 0))} | stance mix ${esc(stanceMixText(d.comments_first_page_stance_counts || {}))} | days represented ${esc(d.comments_first_page_unique_days || 0)}</p>`
            : ""
        }
        <div class="comment-heatmaps">
          ${renderDayHeatmap("New clusters/day", d.comments_new_cluster_count_by_day || {})}
          ${renderDayHeatmap("High-signal/day", d.comments_high_signal_cluster_count_by_day || {})}
        </div>
        <p><strong>Freshness (ET):</strong> bulk snapshot ${esc(formatEasternDateTime(d.comments_bulk_last_posted_date))} | API last seen ${esc(formatEasternDateTime(d.comments_api_last_seen_at))}</p>
        ${samplingBackfillHtml(d, esc, formatMetricNumber)}
        ${d.comment_count_supported === false ? `<p><em>${esc(d.comment_count_note || "Comment counts are not available for this comment channel.")}</em></p>` : ""}
        ${d.comments_truncated ? "<p><em>Comment sample is truncated for performance.</em></p>" : ""}
        ${d.comments_error ? `<p><em>Comments warning: ${esc(d.comments_error)}</em></p>` : ""}
        ${
          comments.length
            ? `${showFirstPageCards
                ? `<div class="comment-metrics-grid">
                <div class="metric-card"><div class="metric-label">Displayed / analyzed clusters</div><div class="metric-value">${esc(formatMetricNumber(d.comments_first_page_count || 0))}/${esc(formatMetricNumber(d.comments_clusters_total_available || 0))}</div></div>
                <div class="metric-card"><div class="metric-label">High-signal on page 1</div><div class="metric-value">${esc(formatMetricNumber(d.comments_first_page_high_signal_clusters || 0))}</div></div>
                <div class="metric-card"><div class="metric-label">Novelty on page 1</div><div class="metric-value">${esc(formatMetricNumber(d.comments_first_page_novelty_clusters || 0))}</div></div>
                <div class="metric-card"><div class="metric-label">Represented comments</div><div class="metric-value">${esc(formatMetricNumber(d.comments_first_page_coverage_count || 0))}/${esc(formatMetricNumber(d.comments_total || 0))}</div></div>
              </div>`
                : ""}
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
        }`;
  }

  function initCommentPager(comments, helpers) {
    const h = helpers || {};
    const esc = typeof h.esc === "function" ? h.esc : fallbackEsc;
    const formatDateOnly = typeof h.formatDateOnly === "function" ? h.formatDateOnly : fallbackDateOnly;
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
      body.innerHTML = commentRowsHtml(comments || [], page, perPage, esc, formatDateOnly);
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

  window.RegwatchComments = window.RegwatchComments || {};
  window.RegwatchComments.resolveClusterSentiment = resolveClusterSentiment;
  window.RegwatchComments.commentClusterRow = commentClusterRow;
  window.RegwatchComments.commentRowsHtml = commentRowsHtml;
  window.RegwatchComments.renderCommentsPanel = renderCommentsPanel;
  window.RegwatchComments.initCommentPager = initCommentPager;
  window.RegwatchComments.samplingBackfillHtml = samplingBackfillHtml;
})();
