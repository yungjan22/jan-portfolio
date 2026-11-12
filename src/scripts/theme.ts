// Appearance control: Light / Dark. With no saved choice, the OS setting decides.
const root = document.documentElement;
const media = window.matchMedia('(prefers-color-scheme: dark)');

function current(): 'light' | 'dark' {
  const set = root.dataset.theme;
  if (set === 'light' || set === 'dark') return set;
  return media.matches ? 'dark' : 'light';
}

function sync() {
  const theme = current();
  document.querySelectorAll<HTMLButtonElement>('[data-theme-set]').forEach((b) => {
    b.setAttribute('aria-pressed', String(b.dataset.themeSet === theme));
  });
}

document.querySelectorAll<HTMLButtonElement>('[data-theme-set]').forEach((b) => {
  b.addEventListener('click', () => {
    const theme = b.dataset.themeSet as 'light' | 'dark';
    root.dataset.theme = theme;
    try {
      localStorage.setItem('theme', theme);
    } catch {}
    sync();
  });
});
media.addEventListener('change', sync);
sync();
