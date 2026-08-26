// ============================================================
// ANANYA // PORTFOLIO — games.html logic
// ============================================================

/* ---------------- Reflex Test ---------------- */
(function reflexGame() {
  const box = document.getElementById('reflexBox');
  const result = document.getElementById('reflexResult');
  if (!box) return;

  let state = 'idle'; // idle -> waiting -> go -> done
  let timeoutId = null;
  let startTime = 0;
  let best = null;

  function setBox(cls, text) {
    box.className = 'reflex-box ' + cls;
    box.textContent = text;
  }

  function startRound() {
    state = 'waiting';
    setBox('wait', 'Wait for it...');
    const delay = 1200 + Math.random() * 2000;
    timeoutId = setTimeout(() => {
      state = 'go';
      startTime = performance.now();
      setBox('go', 'Click Now!');
    }, delay);
  }

  box.addEventListener('click', () => {
    if (state === 'idle' || state === 'done') {
      startRound();
      return;
    }
    if (state === 'waiting') {
      clearTimeout(timeoutId);
      state = 'done';
      setBox('idle', 'Too soon! Click to retry');
      return;
    }
    if (state === 'go') {
      const reaction = Math.round(performance.now() - startTime);
      if (best === null || reaction < best) best = reaction;
      state = 'done';
      setBox('idle', reaction + ' ms — click to retry');
      result.textContent = 'Best time this session: ' + best + ' ms';
    }
  });
})();

/* ---------------- Memory Grid ---------------- */
(function memoryGame() {
  const gridEl = document.getElementById('memoryGrid');
  const movesEl = document.getElementById('memMoves');
  const pairsEl = document.getElementById('memPairs');
  const resetBtn = document.getElementById('memoryReset');
  if (!gridEl) return;

  const symbols = ['🎮', '⚡', '🛰️', '🕹️', '💾', '🔷', '👾', '🧠'];
  let cards = [];
  let flipped = [];
  let matchedCount = 0;
  let moves = 0;
  let lock = false;

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function build() {
    gridEl.innerHTML = '';
    cards = shuffle([...symbols, ...symbols]);
    flipped = [];
    matchedCount = 0;
    moves = 0;
    lock = false;
    movesEl.textContent = '0';
    pairsEl.textContent = '0';

    cards.forEach((symbol, index) => {
      const cardEl = document.createElement('div');
      cardEl.className = 'memory-card';
      cardEl.dataset.symbol = symbol;
      cardEl.dataset.index = index;
      cardEl.addEventListener('click', () => onCardClick(cardEl));
      gridEl.appendChild(cardEl);
    });
  }

  function onCardClick(cardEl) {
    if (lock) return;
    if (cardEl.classList.contains('flipped') || cardEl.classList.contains('matched')) return;
    if (flipped.length === 2) return;

    cardEl.classList.add('flipped');
    cardEl.textContent = cardEl.dataset.symbol;
    flipped.push(cardEl);

    if (flipped.length === 2) {
      moves++;
      movesEl.textContent = String(moves);
      const [a, b] = flipped;
      if (a.dataset.symbol === b.dataset.symbol) {
        a.classList.add('matched');
        b.classList.add('matched');
        flipped = [];
        matchedCount++;
        pairsEl.textContent = String(matchedCount);
      } else {
        lock = true;
        setTimeout(() => {
          a.classList.remove('flipped');
          b.classList.remove('flipped');
          a.textContent = '';
          b.textContent = '';
          flipped = [];
          lock = false;
        }, 700);
      }
    }
  }

  resetBtn.addEventListener('click', build);
  build();
})();
