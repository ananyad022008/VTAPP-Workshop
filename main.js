// ============================================================
// ANANYA // PORTFOLIO — shared behavior
// ============================================================

// Highlight the current page in the nav
document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('.nav-links a');
  const current = window.location.pathname.split('/').pop() || 'index.html';
  links.forEach(link => {
    if (link.getAttribute('href') === current) {
      link.classList.add('active');
    }
  });
});

// Terminal boot-sequence typing effect (used on the home page hero)
function runTerminalBoot(elementId, lines, onDone) {
  const el = document.getElementById(elementId);
  if (!el) return;
  el.textContent = '';
  const cursor = document.createElement('span');
  cursor.className = 'blink-cursor';
  cursor.innerHTML = '&nbsp;';

  let lineIndex = 0;
  let charIndex = 0;

  function typeNext() {
    if (lineIndex >= lines.length) {
      cursor.remove();
      if (onDone) onDone();
      return;
    }
    const line = lines[lineIndex];
    if (charIndex <= line.length) {
      el.textContent = lines.slice(0, lineIndex).join('\n') +
        (lineIndex > 0 ? '\n' : '') + line.slice(0, charIndex);
      el.appendChild(cursor);
      charIndex++;
      setTimeout(typeNext, 18 + Math.random() * 20);
    } else {
      lineIndex++;
      charIndex = 0;
      setTimeout(typeNext, 260);
    }
  }
  typeNext();
}

// Workshop popup — shows once per visit on the homepage
function initWorkshopPopup() {
  const overlay = document.getElementById('workshopModal');
  if (!overlay) return;
  const closeBtn = document.getElementById('workshopModalClose');

  setTimeout(() => overlay.classList.add('show'), 900);

  function close() {
    overlay.classList.remove('show');
  }
  closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
}
