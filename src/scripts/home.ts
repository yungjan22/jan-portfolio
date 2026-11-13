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
const photo = panel?.querySelector<HTMLElement>('.panel__photo');
const idText = panel?.querySelector<HTMLElement>('.panel__idtext');
const extras = panel ? Array.from(panel.querySelectorAll<HTMLElement>('.panel__intro, .nav')) : [];
const css = getComputedStyle(document.documentElement);
// Token durations may be minified to seconds (".5s"), so convert both units.
const ms = (name: string, fallback: number) => {
  const v = css.getPropertyValue(name).trim();
  const n = parseFloat(v);
  if (!Number.isFinite(n)) return fallback;
  return v.endsWith('ms') ? n : v.endsWith('s') ? n * 1000 : n;
};
const EASE = 'cubic-bezier(0.2, 0.7, 0.2, 1)';
let portraitWanted = false;

// Smoothly zoom the panel photo between the small thumbnail and the 3:4 portrait,
// with the name gliding from beside it to below it (FLIP).
function setPortrait(on: boolean) {
  if (!panel || !photo || !idText || on === portraitWanted) return;
  portraitWanted = on;
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches || innerWidth < 900;
  [photo, idText, ...extras].forEach((el) => el.getAnimations().forEach((a) => a.cancel()));
  if (still) {
    panel.classList.toggle('is-portrait', on);
    return;
  }
  const dur = ms('--dur-portrait', 500);
  const fade = ms('--dur-fade', 150);

  const flip = () => {
    if (portraitWanted !== on) return;
    const p0 = photo.getBoundingClientRect();
    const n0 = idText.getBoundingClientRect();
    panel.classList.toggle('is-portrait', on);
    const p1 = photo.getBoundingClientRect();
    // Where the name sits in the new layout while the photo is still its old size.
    photo.style.width = `${p0.width}px`;
    photo.style.height = `${p0.height}px`;
    const nStart = idText.getBoundingClientRect();
    photo.style.width = '';
    photo.style.height = '';
    const opts = { duration: dur, easing: EASE };
    photo.animate(
      [
        { width: `${p0.width}px`, height: `${p0.height}px` },
        { width: `${p1.width}px`, height: `${p1.height}px` },
      ],
      opts,
    );
    const dx = n0.left - nStart.left;
    const dy = n0.top - nStart.top;
    if (on) {
      // Drop below the photo early, then glide left while the photo keeps growing,
      // so the name never sits on top of the image.
      idText.animate(
        [
          { transform: `translate(${dx}px, ${dy}px)` },
          { transform: `translate(${dx * 0.75}px, 0px)`, offset: 0.25 },
          { transform: 'none' },
        ],
        opts,
      );
    } else {
      idText.animate([{ opacity: 0 }, { opacity: 0, offset: 0.55 }, { opacity: 1 }], opts);
    }
    if (!on) extras.forEach((el) => el.animate([{ opacity: 0 }, { opacity: 0, offset: 0.5 }, { opacity: 1 }], opts));
  };

  if (on) {
    // Fade the intro and section links out first, then zoom.
    const fades = extras.map((el) => el.animate([{ opacity: 1 }, { opacity: 0 }], { duration: fade, fill: 'forwards' }));
    Promise.all(fades.map((a) => a.finished))
      .then(() => {
        flip();
        fades.forEach((a) => a.cancel());
      })
      .catch(() => {});
  } else {
    flip();
  }
}
function spy() {
  const y = window.scrollY + window.innerHeight * 0.3;
  let active = sections[0]?.id;
  for (const s of sections) if (s.offsetTop <= y) active = s.id;
  if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) active = sections.at(-1)?.id;
  links.forEach((l) => l.setAttribute('aria-current', String(l.dataset.spy === active)));
  setPortrait(active === 'experience' || active === 'about');
}
window.addEventListener('scroll', spy, { passive: true });
window.addEventListener('resize', spy);
spy();
