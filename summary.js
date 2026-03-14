function esc(value) {
  if (value === null || value === undefined) return "";
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function topLinks(docId, subjectId, commentId) {
  const base = `/document/${encodeURIComponent(docId)}/`;
  const analysis = `/document/${encodeURIComponent(docId)}/analysis/`;
  const docUrl = `https://www.regulations.gov/document/${encodeURIComponent(subjectId)}`;
  const commentUrl = `https://www.regulations.gov/commenton/${encodeURIComponent(commentId)}`;
  return `
    <p class="inline-actions">
      <a class="action-btn" href="${base}">Detail</a>
      <a class="action-btn" href="${analysis}">Full Analysis</a>
      <a class="action-btn" href="${docUrl}" target="_blank" rel="noopener noreferrer">Regulations.gov</a>
      <a class="comment-btn" href="${commentUrl}" target="_blank" rel="noopener noreferrer">Comment on this NPRM</a>
    </p>
  `;
}

function renderSummary(detail, markdown) {
  const root = document.getElementById("summaryRoot");
  const docId = detail.document_id || "";
  const subjectId = detail.subject_document_id || detail.summary_source_document_id || docId;
  const scoreSourceId = detail.score_source_document_id || docId;
  const commentId = detail.comment_document_id || docId;
  const commentUrl = `https://www.regulations.gov/commenton/${encodeURIComponent(commentId)}`;
  const htmlBody =
    typeof marked !== "undefined"
      ? marked.parse(markdown || "")
      : `<pre>${esc(markdown || "")}</pre>`;

  root.innerHTML = `
    <section class="card">
      <h2>${esc(detail.title || "(untitled)")}</h2>
      ${topLinks(docId, subjectId, commentId)}
      <p><strong>Document ID:</strong> ${esc(detail.document_id || "")}</p>
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
      <p><strong>Docket ID:</strong> ${esc(detail.docket_id || "")}</p>
      <p><strong>Agency:</strong> ${esc(detail.agency_name || "")} (${esc(detail.agency_id || "")})</p>
    </section>
    <section class="markdown-body">
      ${htmlBody}
    </section>
    <section class="summary-footer-actions">
      <p>
        <a class="comment-btn" href="${commentUrl}" target="_blank" rel="noopener noreferrer">Comment on this NPRM</a>
      </p>
    </section>
  `;
}

async function main() {
  const parts = window.location.pathname.split("/").filter(Boolean);
  const docId = parts.length >= 3 && parts[0] === "document" && parts[2] === "summary" ? parts[1] : "";
  const root = document.getElementById("summaryRoot");
  if (!docId) {
    root.innerHTML = "<p>Missing document id in URL.</p>";
    return;
  }

  const [detailRes, summaryRes] = await Promise.all([
    fetch(`/data/documents/${encodeURIComponent(docId)}.json`, { cache: "no-store" }),
    fetch(`/data/summaries/${encodeURIComponent(docId)}.md`, { cache: "no-store" }),
  ]);

  if (!detailRes.ok) {
    root.innerHTML = `<p>Could not load detail data for ${esc(docId)}.</p>`;
    return;
  }
  if (!summaryRes.ok) {
    root.innerHTML = `<p>No summary available for ${esc(docId)}.</p>`;
    return;
  }

  const detail = await detailRes.json();
  const markdown = await summaryRes.text();
  renderSummary(detail, markdown);
}

main().catch((err) => {
  const root = document.getElementById("summaryRoot");
  root.innerHTML = `<p>Error: ${esc(err.message)}</p>`;
});
