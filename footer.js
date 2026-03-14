(() => {
  const year = new Date().getFullYear();
  document.querySelectorAll(".current-year").forEach((el) => {
    el.textContent = String(year);
  });
})();
