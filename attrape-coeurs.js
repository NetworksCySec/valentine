const stage = document.getElementById("gameStage");
const scoreDisplay = document.getElementById("score");

let score = 0;
const maxScore = 10;

let running = true;

// Réglages
const SPAWN_EVERY_MS = 500;
const FALL_SPEED = 2; // plus grand = plus rapide
const MAX_ON_SCREEN = 10;

function finishGame() {
  running = false;
  stage.innerHTML = "<h2 style='text-align:center;'>Amour validé 💘</h2>";

  setTimeout(() => {
    window.location.href = "puzzle-coeur.html";
  }, 1200);
}

function spawnHeart() {
  if (!running) return;
  if (stage.querySelectorAll(".heart").length >= MAX_ON_SCREEN) return;

  const heart = document.createElement("div");
  heart.className = "heart";
  heart.textContent = "💖";
  heart.style.position = "absolute";
  heart.style.left = Math.random() * (stage.clientWidth - 40) + "px";
  heart.style.top = "-40px";
  heart.style.fontSize = "32px";
  heart.style.cursor = "pointer";
  heart.style.userSelect = "none";

  let y = -40;

  function fall() {
    if (!running) return;

    y += FALL_SPEED;
    heart.style.top = y + "px";

    if (y > stage.clientHeight) {
      heart.remove();
      return;
    }

    requestAnimationFrame(fall);
  }

  heart.addEventListener("click", () => {
    if (!running) return;

    score++;
    scoreDisplay.textContent = score;

    heart.remove();

    if (score >= maxScore) {
      finishGame();
    }
  });

  stage.appendChild(heart);
  requestAnimationFrame(fall);
}

// pluie continue
setInterval(spawnHeart, SPAWN_EVERY_MS);
