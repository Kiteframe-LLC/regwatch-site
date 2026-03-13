async function loadData() {
  const res = await fetch("./data/rules.json", { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Failed to load data/rules.json (${res.status})`);
  }
  return res.json();
}

function fmt(value, digits = 3) {
  if (value === null || value === undefined) return "";
  return Number(value).toFixed(digits);
}

function rowHtml(r) {
  const docket = r.docket_id ? ` (docket ${r.docket_id})` : "";
  return `<tr>
    <td>${fmt(r.combined_score, 6)}</td>
    <td>${r.agency_id || ""}</td>
    <td>${r.document_id || ""}${docket}</td>
    <td class="title">${r.title || ""}</td>
    <td>${r.pass_1_score ?? ""}</td>
    <td>${r.pass_2_score ?? ""}</td>
    <td>${r.pass_2_risk_band || ""}</td>
    <td>${r.comment_end_date || ""}</td>
  </tr>`;
}

function render(records) {
  const tbody = document.querySelector("#rulesTable tbody");
  tbody.innerHTML = records.map(rowHtml).join("");
}

function applyFilters(records) {
  const agency = document.getElementById("agencyFilter").value.trim().toLowerCase();
  const minScore = Number(document.getElementById("minScore").value || 0);
  return records.filter((r) => {
    const agencyOk =
      !agency ||
      (r.agency_id || "").toLowerCase().includes(agency) ||
      (r.agency_name || "").toLowerCase().includes(agency);
    const scoreOk = (r.combined_score || 0) >= minScore;
    return agencyOk && scoreOk;
  });
}

async function main() {
  const data = await loadData();
  const records = data.records || [];
  document.getElementById("meta").textContent =
    `Published ${records.length} records. Generated at ${data.generated_at || "unknown"}.`;

  const rerender = () => render(applyFilters(records));
  document.getElementById("agencyFilter").addEventListener("input", rerender);
  document.getElementById("minScore").addEventListener("input", rerender);
  document.getElementById("resetBtn").addEventListener("click", () => {
    document.getElementById("agencyFilter").value = "";
    document.getElementById("minScore").value = "0.75";
    rerender();
  });
  rerender();
}

main().catch((err) => {
  const meta = document.getElementById("meta");
  meta.textContent = `Error: ${err.message}`;
});
