function esc(value) {
  if (value === null || value === undefined) return "";
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function topLinks(docId) {
  const detail = `/document/${encodeURIComponent(docId)}/`;
  const summary = `/document/${encodeURIComponent(docId)}/summary/`;
  const docUrl = `https://www.regulations.gov/document/${encodeURIComponent(docId)}`;
  const commentUrl = `https://www.regulations.gov/commenton/${encodeURIComponent(docId)}`;
  return `
    <p class="inline-actions">
      <a class="action-btn" href="${detail}">Detail</a>
      <a class="action-btn" href="${summary}">Public Summary</a>
      <a class="action-btn" href="${docUrl}" target="_blank" rel="noopener noreferrer">Regulations.gov</a>
      <a class="comment-btn" href="${commentUrl}" target="_blank" rel="noopener noreferrer">Comment on this NPRM</a>
    </p>
  `;
}

function renderAnalysis(detail, markdown) {
  const root = document.getElementById("analysisRoot");
  const docId = detail.document_id || "";
  const commentUrl = `https://www.regulations.gov/commenton/${encodeURIComponent(docId)}`;
  const htmlBody =
    typeof marked !== "undefined"
      ? marked.parse(markdown || "")
      : `<pre>${esc(markdown || "")}</pre>`;

  root.innerHTML = `
    <section class="card">
      <h2>${esc(detail.title || "(untitled)")}</h2>
      ${topLinks(docId)}
      <p><strong>Document ID:</strong> ${esc(detail.document_id || "")}</p>
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
  const docId = parts.length >= 3 && parts[0] === "document" && parts[2] === "analysis" ? parts[1] : "";
  const root = document.getElementById("analysisRoot");
  if (!docId) {
    root.innerHTML = "<p>Missing document id in URL.</p>";
    return;
  }

  const [detailRes, analysisRes] = await Promise.all([
    fetch(`/data/documents/${encodeURIComponent(docId)}.json`, { cache: "no-store" }),
    fetch(`/data/summaries_raw/${encodeURIComponent(docId)}.md`, { cache: "no-store" }),
  ]);

  if (!detailRes.ok) {
    root.innerHTML = `<p>Could not load detail data for ${esc(docId)}.</p>`;
    return;
  }
  if (!analysisRes.ok) {
    root.innerHTML = `<p>No detailed analysis available for ${esc(docId)}.</p>`;
    return;
  }

  const detail = await detailRes.json();
  const markdown = await analysisRes.text();
  renderAnalysis(detail, markdown);
}

main().catch((err) => {
  const root = document.getElementById("analysisRoot");
  root.innerHTML = `<p>Error: ${esc(err.message)}</p>`;
});
