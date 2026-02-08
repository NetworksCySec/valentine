const startBtn = document.getElementById("startBtn");
const percentEl = document.getElementById("percent");
const bar = document.getElementById("bar");
const status = document.getElementById("status");

let running = false;

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function runMeter() {
  if (running) return;
  running = true;
  startBtn.disabled = true;

  // Étapes (phrases + % + durée d'affichage)
  const sequence = [
    { p: 3,  text: "Analyse du niveau d’amour… 💗",               ms: 1500 },
    { p: 9,  text: "Mesure des papillons dans le ventre… 🦋",     ms: 1600 },
    { p: 17, text: "Test de la compatibilité… 💞",                ms: 1600 },
    { p: 28, text: "Vérification des souvenirs partagés… 📸",     ms: 1500 },
    { p: 41, text: "Analyse de la capacité à se supporter… 😈",   ms: 1600 },
    { p: 56, text: "Calcul du potentiel de bisous… 😌",           ms: 1500 },
    { p: 71, text: "Détection du rire et de la complicité… 😂",   ms: 1600 },
    { p: 86, text: "Simulation d’un futur rendez-vous… 🍷",       ms: 1600 },
    { p: 94, text: "Double vérification… (parce que oui) 😇",     ms: 1500 },
    { p: 99, text: "Validation finale… 💘",                        ms: 1700 },
    { p: 100,text: "Résultat : compatibilité maximale 💖",         ms: 1400 }
  ];

  // Petite montée initiale
  status.textContent = "Initialisation du compteur…";
  percentEl.textContent = "0";
  bar.style.width = "0%";
  await sleep(900);

  for (const step of sequence) {
    status.textContent = step.text;
    percentEl.textContent = step.p;
    bar.style.width = step.p + "%";
    await sleep(step.ms);
  }

  status.textContent = "Score final : 100% 💘 (évidemment)";
  await sleep(1200);

  // Prochaine étape (chez toi : épreuve 6)
  window.location.href = "fuite.html";
}

startBtn.addEventListener("click", runMeter);
