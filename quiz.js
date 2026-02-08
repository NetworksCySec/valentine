const questions = [
  {
    question: "Quelle est la date de notre rencontre ?",
    answers: ["19 novembre 2021", "20 janvier 2022", "15 mars 2022"],
    correct: 2
  },
  {
    question: "Quel est le premier truc que j’ai remarqué chez toi ?",
    answers: ["Ton visage", "Ton boule 😈", "Tes cheveux"],
    correct: 2
  },
  {
    question: "Si on partait en voyage, je choisirais ?",
    answers: ["Japon 🇯🇵", "Corée 🇰🇷", "Philippines 🇵🇭"],
    correct: 1
  },
  {
    question: "Qui est le plus têtu ?",
    answers: ["Moi 😇", "Toi 😏", "On est parfaits"],
    correct: 0
  },
  {
    question: "Qui dit “je t’aime” en premier ?",
    answers: ["Moi 💘", "Toi 😌", "Ça dépend"],
    correct: 0
  },
  {
    question: "Ce que je préfère chez toi ?",
    answers: [
      "Ton intelligence hors norme 😊",
      "Ton humour 😂",
      "Ton énorme boule (le retour) 💖"
    ],
    correct: 0
  },
  {
    question: "Mon dessert préféré ?",
    answers: [
      "Éclair au chocolat 🍫",
      "Tarte à la fraise 🍓",
      "Glace vanille beurre salé 🍨"
    ],
    correct: 0
  },
  {
    question: "Mon talent caché ?",
    answers: [
      "Toucher mon coude avec ma langue 😳",
      "Être le meilleur dans tout 😌",
      "Marcher sur les fesses 😭"
    ],
    correct: 1
  }
];

let currentQuestion = 0;
let score = 0;
let locked = false;

const questionText = document.getElementById("questionText");
const questionNumber = document.getElementById("questionNumber");

const buttons = [
  document.getElementById("choice1"),
  document.getElementById("choice2"),
  document.getElementById("choice3")
];

// Couleurs
const BLUE = "linear-gradient(45deg, #2b6cff, #00c2ff)";
const GREEN = "linear-gradient(45deg, #22c55e, #86efac)";
const REDBLACK = "linear-gradient(45deg, #ff2e2e, #111111)";

function setDefaultButtonStyle(btn) {
  btn.style.background = BLUE;
  btn.style.color = "#fff";
  btn.style.fontWeight = "800";
  btn.disabled = false;
}

function disableAllButtons() {
  buttons.forEach(b => (b.disabled = true));
}

function loadQuestion() {
  locked = false;

  const q = questions[currentQuestion];
  questionText.textContent = q.question;
  questionNumber.textContent = currentQuestion + 1 + " / 8";

  buttons.forEach((btn, index) => {
    setDefaultButtonStyle(btn);
    btn.textContent = q.answers[index];
    btn.onclick = () => checkAnswer(index);
  });
}

function checkAnswer(index) {
  if (locked) return;
  locked = true;
  disableAllButtons();

  const correctIndex = questions[currentQuestion].correct;

  if (index === correctIndex) {
    score++;
    buttons[index].style.background = GREEN;
    questionText.textContent = "Bonne réponse 😌💚";
  } else {
    buttons[index].style.background = REDBLACK;
    buttons[correctIndex].style.background = GREEN;
    questionText.textContent = "Nope 😈";
  }

  setTimeout(() => {
    currentQuestion++;

    if (currentQuestion < questions.length) {
      loadQuestion();
    } else {
      finishQuiz();
    }
  }, 900);
}

function finishQuiz() {
  if (score === questions.length) {
    questionText.textContent = `Parfait : ${score}/8 💘`;
    setTimeout(() => {
      window.location.href = "attrape-coeurs.html";
    }, 1300);
  } else {
    questionText.textContent = `Score : ${score}/8 😈 Recommence depuis le début...`;
    setTimeout(() => {
      currentQuestion = 0;
      score = 0;
      loadQuestion();
    }, 1600);
  }
}

loadQuestion();
