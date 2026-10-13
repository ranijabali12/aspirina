// Executa antes da pintura: tema salvo (sem piscar) e promessa do 3D
(() => {
  try { const t = localStorage.getItem('asp-theme'); if (t === 'light' || t === 'dark') document.documentElement.dataset.theme = t; } catch (e) {}
  document.documentElement.classList.add('js');
  window.ASP3D = new Promise(r => { window.__asp3d = r; setTimeout(() => r(null), 9000); });
})();
