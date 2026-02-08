const piecesContainer = document.getElementById("pieces");
const board = document.getElementById("board");
const countDisplay = document.getElementById("count");

const TOTAL = 10;
let placed = 0;

// Crée 10 slots (cases)
for (let i = 0; i < TOTAL; i++) {
  const slot = document.createElement("div");
  slot.className = "slot";
  slot.dataset.filled = "0";

  slot.style.width = "100%";
  slot.style.aspectRatio = "1 / 1";
  slot.style.maxWidth = "90px";
  slot.style.borderRadius = "14px";
  slot.style.border = "2px dashed rgba(255,255,255,0.35)";
  slot.style.background = "rgba(0,0,0,0.12)";
  slot.style.display = "flex";
  slot.style.alignItems = "center";
  slot.style.justifyContent = "center";
  slot.style.fontSize = "34px";
  slot.style.userSelect = "none";

  slot.addEventListener("dragover", (e) => {
    e.preventDefault();
    slot.style.borderColor = "rgba(255,255,255,0.75)";
  });

  slot.addEventListener("dragleave", () => {
    slot.style.borderColor = "rgba(255,255,255,0.35)";
  });

  slot.addEventListener("drop", (e) => {
    e.preventDefault();
    slot.style.borderColor = "rgba(255,255,255,0.35)";

    if (slot.dataset.filled === "1") return;

    const id = e.dataTransfer.getData("text/plain");
    const piece = document.getElementById(id);
    if (!piece) return;

    // place la pièce dans la case
    slot.textContent = piece.textContent;
    slot.dataset.filled = "1";

    // retire la pièce de la zone pièces
    piece.remove();

    placed++;
    countDisplay.textContent = placed;

    // petit feedback : case remplie
    slot.style.border = "2px solid rgba(255,255,255,0.35)";
    slot.style.background = "rgba(255,255,255,0.10)";

    if (placed === TOTAL) finishPuzzle();
  });

  board.appendChild(slot);
}

// Crée 10 pièces draggable
// (On met des emojis différents pour donner l'impression de "morceaux")
const pieceEmojis = ["💖","💗","💘","💝","💕","💞","💓","💟","❤️","🩷"];

// Mélange
pieceEmojis.sort(() => Math.random() - 0.5);

pieceEmojis.forEach((emoji, idx) => {
  const piece = document.createElement("div");
  piece.id = "piece-" + idx;
  piece.textContent = emoji;
  piece.draggable = true;

  piece.style.width = "64px";
  piece.style.height = "64px";
  piece.style.borderRadius = "16px";
  piece.style.display = "flex";
  piece.style.alignItems = "center";
  piece.style.justifyContent = "center";
  piece.style.fontSize = "34px";
  piece.style.cursor = "grab";
  piece.style.userSelect = "none";
  piece.style.background = "rgba(255,255,255,0.14)";
  piece.style.border = "1px solid rgba(255,255,255,0.25)";
  piece.style.boxShadow = "0 10px 22px rgba(0,0,0,0.25)";

  piece.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", piece.id);
    // effet visuel
    piece.style.opacity = "0.6";
  });

  piece.addEventListener("dragend", () => {
    piece.style.opacity = "1";
  });

  piecesContainer.appendChild(piece);
});

function finishPuzzle() {
  // Remplace l'intérieur du board par un gros coeur final
  board.innerHTML = "";
  const big = document.createElement("div");
  big.textContent = "💖";
  big.style.fontSize = "120px";
  big.style.filter = "drop-shadow(0 18px 28px rgba(0,0,0,0.35))";
  big.style.animation = "pulse 0.8s ease-in-out infinite alternate";
  board.appendChild(big);

  // petite animation sans toucher style.css
  const style = document.createElement("style");
  style.textContent = `
    @keyframes pulse {
      from { transform: scale(1); }
      to { transform: scale(1.08); }
    }
  `;
  document.head.appendChild(style);

  countDisplay.textContent = TOTAL;

  setTimeout(() => {
    window.location.href = "bouton-qui-grossit.html";
  }, 1400);
}
