const proposalScreen = document.getElementById('proposalScreen');
const storyScreen = document.getElementById('storyScreen');
const yesButton = document.getElementById('yesButton');
const noButton = document.getElementById('noButton');
const replayButton = document.getElementById('replayButton');
const sparkleLayer = document.querySelector('.sparkle-layer');

function moveNoButton() {
  // Move it somewhere visible, away from the pointer/tap.
  noButton.classList.add('running');
  const margin = 18;
  const maxX = Math.max(margin, window.innerWidth - noButton.offsetWidth - margin);
  const maxY = Math.max(margin, window.innerHeight - noButton.offsetHeight - margin);
  let x = margin + Math.random() * (maxX - margin);
  let y = margin + Math.random() * (maxY - margin);

  // Avoid placing it directly over the Yes button.
  const yesRect = yesButton.getBoundingClientRect();
  if (x > yesRect.left - 100 && x < yesRect.right + 40 &&
      y > yesRect.top - 60 && y < yesRect.bottom + 60) {
    x = margin;
    y = margin;
  }
  noButton.style.left = `${x}px`;
  noButton.style.top = `${y}px`;
}

noButton.addEventListener('pointerenter', moveNoButton);
noButton.addEventListener('pointerdown', (event) => {
  event.preventDefault();
  moveNoButton();
});
noButton.addEventListener('click', (event) => {
  event.preventDefault();
  moveNoButton();
});

function makeSparkles() {
  sparkleLayer.innerHTML = '';
  for (let i = 0; i < 30; i++) {
    const sparkle = document.createElement('span');
    sparkle.className = 'sparkle';
    sparkle.textContent = Math.random() > 0.5 ? '✦' : '·';
    sparkle.style.left = `${Math.random() * 100}%`;
    sparkle.style.top = `${Math.random() * 100}%`;
    sparkle.style.fontSize = `${8 + Math.random() * 12}px`;
    sparkle.style.animationDelay = `${Math.random() * 3}s`;
    sparkleLayer.appendChild(sparkle);
  }
}

function floatHearts() {
  const symbols = ['♡', '♥', '✧', 'ღ'];
  for (let i = 0; i < 24; i++) {
    setTimeout(() => {
      const heart = document.createElement('span');
      heart.className = 'heart-float';
      heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      heart.style.left = `${Math.random() * 100}%`;
      heart.style.fontSize = `${14 + Math.random() * 24}px`;
      heart.style.animationDuration = `${4 + Math.random() * 4}s`;
      document.body.appendChild(heart);
      heart.addEventListener('animationend', () => heart.remove());
    }, i * 180);
  }
}

yesButton.addEventListener('click', () => {
  proposalScreen.classList.remove('active');
  storyScreen.classList.add('active');
  storyScreen.setAttribute('aria-hidden', 'false');
  proposalScreen.setAttribute('aria-hidden', 'true');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  floatHearts();
});

replayButton.addEventListener('click', () => {
  storyScreen.classList.remove('active');
  proposalScreen.classList.add('active');
  storyScreen.setAttribute('aria-hidden', 'true');
  proposalScreen.setAttribute('aria-hidden', 'false');
  noButton.classList.remove('running');
  noButton.style.left = '';
  noButton.style.top = '';
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('resize', () => {
  if (noButton.classList.contains('running')) moveNoButton();
});

makeSparkles();
