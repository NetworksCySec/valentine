const stage = document.getElementById("stage");
const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");

let posX = 0;
let posY = 0;

// petite "vitesse" persistante pour éviter l'effet coincé
let velX = 0;
let velY = 0;

// Réglages
const TRIGGER_DIST = 150; // distance où il commence à fuir
const FORCE = 15;         // vitesse de fuite
const MAX_VEL = 18;       // limite de vitesse
const PADDING = 12;       // marge des bords

// Anti-approche lente
const PANIC_DIST = 70;
const PANIC_MAX_BOOST = 26;
const MIN_KICK_DIST = 28;
const MIN_KICK = 10;

// Anti-coin (fix définitif)
const CORNER_ZONE = 80;      // zone proche des coins (px)
const CORNER_PUSH = 55;      // déplacement immédiat (px) pour décoller du coin
const CORNER_PUSH_VEL = 16;  // impulsion de vitesse vers l'intérieur

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

function initPosition() {
  const rect = stage.getBoundingClientRect();

  // départ pas au centre, pour ne pas recouvrir le bouton Oui
  posX = rect.width * 0.65;
  posY = rect.height * 0.72;

  noBtn.style.left = posX + "px";
  noBtn.style.top = posY + "px";
  noBtn.style.transform = "translate(-50%, -50%)";
}

function moveAwayFromMouse(e) {
  const stageRect = stage.getBoundingClientRect();

  // limites en tenant compte de la taille du bouton
  const bw = noBtn.offsetWidth;
  const bh = noBtn.offsetHeight;

  const minX = bw / 2 + PADDING;
  const maxX = stageRect.width - bw / 2 - PADDING;
  const minY = bh / 2 + PADDING;
  const maxY = stageRect.height - bh / 2 - PADDING;

  // souris en coordonnées stage
  const mx = e.clientX - stageRect.left;
  const my = e.clientY - stageRect.top;

  const dx = posX - mx;
  const dy = posY - my;
  const distance = Math.sqrt(dx * dx + dy * dy);

  // 1) Anti-coin "impossible à cliquer"
  // Si la souris est proche ET que le bouton est dans une zone de coin,
  // on le décale immédiatement vers l'intérieur (1 frame) + on lui donne une vitesse.
  if (distance < TRIGGER_DIST) {
    const nearLeft = (posX - minX) < CORNER_ZONE;
    const nearRight = (maxX - posX) < CORNER_ZONE;
    const nearTop = (posY - minY) < CORNER_ZONE;
    const nearBottom = (maxY - posY) < CORNER_ZONE;

    const inTopLeft = nearLeft && nearTop;
    const inTopRight = nearRight && nearTop;
    const inBottomLeft = nearLeft && nearBottom;
    const inBottomRight = nearRight && nearBottom;

    if (inTopLeft) {
      posX += CORNER_PUSH;
      posY += CORNER_PUSH;
      velX += CORNER_PUSH_VEL;
      velY += CORNER_PUSH_VEL;
    } else if (inTopRight) {
      posX -= CORNER_PUSH;
      posY += CORNER_PUSH;
      velX -= CORNER_PUSH_VEL;
      velY += CORNER_PUSH_VEL;
    } else if (inBottomLeft) {
      posX += CORNER_PUSH;
      posY -= CORNER_PUSH;
      velX += CORNER_PUSH_VEL;
      velY -= CORNER_PUSH_VEL;
    } else if (inBottomRight) {
      posX -= CORNER_PUSH;
      posY -= CORNER_PUSH;
      velX -= CORNER_PUSH_VEL;
      velY -= CORNER_PUSH_VEL;
    }

    // Clamp immédiat pour rester dans la zone après le "kick"
    posX = clamp(posX, minX, maxX);
    posY = clamp(posY, minY, maxY);
  }

  // 2) Fuite normale
  if (distance < TRIGGER_DIST && distance > 0.0001) {
    const nx = dx / distance;
    const ny = dy / distance;

    velX += nx * (FORCE * 0.25);
    velY += ny * (FORCE * 0.25);
  }

  // 3) Anti-approche lente (boost progressif)
  if (distance < PANIC_DIST && distance > 0.0001) {
    const nx = dx / distance;
    const ny = dy / distance;

    const t = clamp(1 - (distance / PANIC_DIST), 0, 1);
    const boost = 6 + t * PANIC_MAX_BOOST;

    velX += nx * boost;
    velY += ny * boost;

    // dérive latérale progressive (casse l’alignement parfait)
    const side = 1.5 + t * 3.0;
    velX += -ny * side;
    velY += nx * side;

    if (distance < MIN_KICK_DIST) {
      velX += nx * MIN_KICK;
      velY += ny * MIN_KICK;
    }
  }

  // friction (fluidifie)
  velX *= 0.92;
  velY *= 0.92;

  // limite vitesse
  velX = clamp(velX, -MAX_VEL, MAX_VEL);
  velY = clamp(velY, -MAX_VEL, MAX_VEL);

  // mise à jour position
  posX += velX;
  posY += velY;

  // rebonds anti-coincement sur les bords
  if (posX <= minX) {
    posX = minX;
    velX = Math.abs(velX) + 2;
  } else if (posX >= maxX) {
    posX = maxX;
    velX = -Math.abs(velX) - 2;
  }

  if (posY <= minY) {
    posY = minY;
    velY = Math.abs(velY) + 2;
  } else if (posY >= maxY) {
    posY = maxY;
    velY = -Math.abs(velY) - 2;
  }

  // applique au bouton
  noBtn.style.left = posX + "px";
  noBtn.style.top = posY + "px";
}

stage.addEventListener("mousemove", moveAwayFromMouse);

stage.addEventListener(
  "touchmove",
  (e) => moveAwayFromMouse(e.touches[0]),
  { passive: true }
);

yesBtn.addEventListener("click", () => {
  window.location.href = "choix.html";
});

// Si par miracle elle clique dessus
noBtn.addEventListener("click", (e) => {
  e.preventDefault();
});

initPosition();
