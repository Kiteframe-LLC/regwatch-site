(function () {
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

  window.RegwatchComments = window.RegwatchComments || {};
  window.RegwatchComments.resolveClusterSentiment = resolveClusterSentiment;
  window.RegwatchComments.commentClusterRow = commentClusterRow;
  window.RegwatchComments.samplingBackfillHtml = samplingBackfillHtml;
})();
