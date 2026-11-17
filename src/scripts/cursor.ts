// Multiplayer-style name tag that follows the (ember) cursor over clickable things,
// saying what the click does: data-cursor, else aria-label, else the element's text.
// Mouse/trackpad only; nothing for touch.
const fine = matchMedia('(hover: hover) and (pointer: fine)');
if (fine.matches) {
  const tag = document.createElement('div');
  tag.className = 'cursor-tag';
  tag.setAttribute('aria-hidden', 'true');
  document.body.append(tag);

  const CLICKABLE = 'a[href], button, summary, label, [role="button"], [data-cursor]';
  const label = (el: Element) =>
    (el.getAttribute('data-cursor') || el.getAttribute('aria-label') || el.textContent || '')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 40);

  let x = 0;
  let y = 0;
  let frame = 0;
  const place = () => {
    frame = 0;
    tag.style.transform = `translate(${x + 16}px, ${y + 20}px)`;
  };

  document.addEventListener(
    'pointermove',
    (e) => {
      if (e.pointerType !== 'mouse') return;
      x = e.clientX;
      y = e.clientY;
      const el = (e.target as Element).closest?.(CLICKABLE);
      const text = el ? label(el) : '';
      if (text) {
        if (tag.textContent !== text) tag.textContent = text;
        tag.classList.add('is-on');
      } else tag.classList.remove('is-on');
      if (!frame) frame = requestAnimationFrame(place);
    },
    { passive: true },
  );
  document.documentElement.addEventListener('pointerleave', () => tag.classList.remove('is-on'));

  // A modal dialog sits in the browser's top layer, above everything else,
  // so the tag moves into an open dialog and back out when it closes.
  document.querySelectorAll('dialog').forEach((d) => {
    new MutationObserver(() => (d.open ? d.append(tag) : document.body.append(tag))).observe(d, {
      attributes: true,
      attributeFilter: ['open'],
    });
  });
}
