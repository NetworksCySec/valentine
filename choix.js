const btnA = document.getElementById("btnA");
const btnB = document.getElementById("btnB");

let alreadyClicked = false;

function goYesWithDelay() {
  if (alreadyClicked) return;
  alreadyClicked = true;

  // petit délai pour qu'elle voie le changement
  setTimeout(() => {
    window.location.href = "yes.html";
  }, 1000); // 1 seconde
}

function swapLabels() {
  const aText = btnA.textContent;
  const bText = btnB.textContent;

  btnA.textContent = bText;
  btnB.textContent = aText;

  btnA.classList.toggle("btn-yes");
  btnA.classList.toggle("btn-no");
  btnB.classList.toggle("btn-no");
  btnB.classList.toggle("btn-yes");

  flashEffect();

}

btnA.addEventListener("click", () => {
  const t = btnA.textContent.trim().toLowerCase();

  if (t === "oui") {
    goYesWithDelay();
  } else {
    swapLabels();
    goYesWithDelay();
  }
});

btnB.addEventListener("click", () => {
  const t = btnB.textContent.trim().toLowerCase();

  if (t === "oui") {
    goYesWithDelay();
  } else {
    swapLabels();
    goYesWithDelay();
  }
});
