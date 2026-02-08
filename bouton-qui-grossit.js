const stage = document.getElementById("stage");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const msg = document.getElementById("msg");

let level = 0;

const GROW_YES = 1.14;
const SHRINK_NO = 0.90;

const MAX_LEVEL = 10;      // seuil critique
const FINAL_SHRINKS = 3;   // encore 3 clics avant reset
const TOTAL_LIMIT = MAX_LEVEL + FINAL_SHRINKS;

const phrases = [
  "Tu es sûre ? 😏",
  "Vraiment sûre ? 🤨",
  "Réfléchis bien… 😌",
  "Je pense que tu mens 😈",
  "Allez… avoue 😇",
  "Non non non… 😏",
  "Je te connais 😌💗",
  "Dernière chance 😈",
  "Ok… tu forces… 😌",
  "Le NON devient fragile… 😈"
];

function setButtonSize(btn, scale) {
  const basePaddingY = 14;
  const basePaddingX = 26;
  const baseFont = 18;

  btn.style.padding = `${basePaddingY * scale}px ${basePaddingX * scale}px`;
  btn.style.fontSize = `${baseFont * scale}px`;
}

function scaleButton(btn, factor) {
  const current = btn.dataset.scale ? parseFloat(btn.dataset.scale) : 1;
  const next = current * factor;
  btn.dataset.scale = String(next);
  setButtonSize(btn, next);
}

function resetGame() {
  level = 0;

  yesBtn.dataset.scale = "1";
  noBtn.dataset.scale = "1";
  setButtonSize(yesBtn, 1);
  setButtonSize(noBtn, 1);

  yesBtn.classList.add("floating");
  noBtn.classList.add("floating");

  yesBtn.style.left = "";
  yesBtn.style.top = "";
  yesBtn.style.transform = "";

  noBtn.style.left = "";
  noBtn.style.top = "70%";
  noBtn.style.transform = "";

  msg.textContent = "Choisis… mais appuie pas sur non ça serait vraiment bête !😌";
}

noBtn.addEventListener("click", (e) => {
  e.preventDefault();

  level++;

  scaleButton(yesBtn, GROW_YES);
  scaleButton(noBtn, SHRINK_NO);

  const rect = stage.getBoundingClientRect();
  const x = Math.random() * (rect.width - 140) + 30;
  const y = Math.random() * (rect.height - 140) + 30;
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
  noBtn.style.transform = "translate(0,0)";

  // Phase normale
  if (level <= MAX_LEVEL) {
    msg.textContent = phrases[Math.min(level - 1, phrases.length - 1)];
  }

  // Phase critique (les 3 derniers clics)
  if (level > MAX_LEVEL && level < TOTAL_LIMIT) {
    const remaining = TOTAL_LIMIT - level;
    msg.textContent = `Le NON disparaît… encore ${remaining} tentative${remaining > 1 ? "s" : ""} 😈`;
  }

  // Reset après les 3 clics supplémentaires
  if (level >= TOTAL_LIMIT) {
    msg.textContent = "Trop tard 😈 Recommence !";

    setTimeout(() => {
      resetGame();
    }, 1200);
  }
});

yesBtn.addEventListener("click", () => {
  window.location.href = "choix.html";
});

resetGame();
