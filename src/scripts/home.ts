// Home page behaviour: size badges, touch selection, profile lightbox, scroll-spy.

// ---------- Size badges: real rendered size in px ----------
const ro = new ResizeObserver((entries) => {
  for (const e of entries) {
    const badge = (e.target as HTMLElement).querySelector<HTMLElement>(':scope > [data-size]');
    if (!badge) continue;
    const r = (e.target as HTMLElement).getBoundingClientRect();
    badge.textContent = `${Math.round(r.width)} × ${Math.round(r.height)}`;
  }
});
document.querySelectorAll<HTMLElement>('.sel').forEach((el) => ro.observe(el));

// ---------- Lightbox ----------
const dialog = document.querySelector<HTMLDialogElement>('dialog.lightbox')!;
const body = dialog.querySelector<HTMLElement>('[data-lb-body]')!;
const pos = dialog.querySelector<HTMLElement>('[data-pos]')!;
const profiles = Array.from(dialog.querySelectorAll<HTMLElement>('[data-profile]'));
let opener: HTMLElement | null = null;

function show(id: string) {
  profiles.forEach((p, i) => {
    const on = p.dataset.profile === id;
    p.hidden = !on;
    if (on) {
      pos.textContent = String(i + 1);
      dialog.setAttribute('aria-labelledby', `lb-title-${i}`);
    }
  });
  body.scrollTop = 0;
}

function open(id: string, from: HTMLElement) {
  opener = from;
  show(id);
  dialog.showModal();
  dialog.querySelector<HTMLElement>('[data-close]')?.focus();
  document.documentElement.style.overflow = 'hidden';
}

dialog.addEventListener('close', () => {
  document.documentElement.style.overflow = '';
  document.querySelectorAll('.sel.is-selected').forEach((s) => s.classList.remove('is-selected'));
  opener?.focus();
});
dialog.querySelector('[data-close]')!.addEventListener('click', () => dialog.close());
// Backdrop click: the dialog element itself is the target only outside its content.
dialog.addEventListener('click', (e) => {
  if (e.target !== dialog) return;
  const r = dialog.getBoundingClientRect();
  const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
  if (!inside) dialog.close();
});
dialog.querySelectorAll<HTMLButtonElement>('[data-next]').forEach((b) =>
  b.addEventListener('click', () => {
    show(b.dataset.next!);
    dialog.querySelector<HTMLElement>('[data-close]')?.focus();
  }),
);

// ---------- Cards: touch = first tap selects, second opens ----------
let lastPointer = 'mouse';
document.addEventListener('pointerdown', (e) => (lastPointer = e.pointerType), { capture: true });

document.querySelectorAll<HTMLAnchorElement>('[data-open]').forEach((a) => {
  const card = a.closest<HTMLElement>('.sel')!;
  a.addEventListener('click', (e) => {
    // Modified clicks open the full story page as a normal link.
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    if (lastPointer === 'touch' && !card.classList.contains('is-selected')) {
      document.querySelectorAll('.sel.is-selected').forEach((s) => s.classList.remove('is-selected'));
      card.classList.add('is-selected');
      return;
    }
    open(a.dataset.open!, a);
  });
});
document.addEventListener('click', (e) => {
  if (!(e.target as HTMLElement).closest('.sel')) {
    document.querySelectorAll('.sel.is-selected').forEach((s) => s.classList.remove('is-selected'));
  }
});

// ---------- Scroll-spy ----------
const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('[data-spy]'));
const sections = links
  .map((l) => document.getElementById(l.dataset.spy!))
  .filter((s): s is HTMLElement => !!s);

const panel = document.querySelector<HTMLElement>('.panel');
function spy() {
  const y = window.scrollY + window.innerHeight * 0.3;
  let active = sections[0]?.id;
  for (const s of sections) if (s.offsetTop <= y) active = s.id;
  if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) active = sections.at(-1)?.id;
  links.forEach((l) => l.setAttribute('aria-current', String(l.dataset.spy === active)));
  panel?.classList.toggle('is-portrait', active === 'experience' || active === 'about');
}
window.addEventListener('scroll', spy, { passive: true });
window.addEventListener('resize', spy);
spy();
