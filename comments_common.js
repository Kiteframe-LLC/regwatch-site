(function () {
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

  function commentClusterRow(cluster, esc, formatDateOnly) {
    const count = Number((cluster && cluster.count) || 0);
    const sentiment = resolveClusterSentiment(cluster || {});
    const cid = esc((cluster && cluster.representative_comment_id) || "");
    const posted = esc(formatDateOnly((cluster && cluster.representative_posted_date) || ""));
    const chars = Number((cluster && cluster.representative_length) || 0);
    const excerpt = esc((cluster && cluster.representative_excerpt) || "");
    return `<tr>
    <td>${count}</td>
    <td><span class="review-pill ${sentiment.sentimentClass}">${esc(sentiment.sentimentLabel)}</span></td>
    <td>${cid ? `<a href="https://www.regulations.gov/comment/${encodeURIComponent((cluster && cluster.representative_comment_id) || "")}" target="_blank" rel="noopener noreferrer">${cid}</a>` : ""}</td>
    <td>${posted}</td>
    <td>${chars}</td>
    <td>${excerpt}</td>
  </tr>`;
  }

  window.RegwatchComments = window.RegwatchComments || {};
  window.RegwatchComments.resolveClusterSentiment = resolveClusterSentiment;
  window.RegwatchComments.commentClusterRow = commentClusterRow;
})();
