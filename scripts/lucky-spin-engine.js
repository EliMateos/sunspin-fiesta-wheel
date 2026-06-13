const segments = [
  { title: "Consumición directa", desc: "Premio automático.", explanation: "No tienes que hacer ningún reto. Enseña esta pantalla y recoge tu consumición.", icon: "🍹", drinks: 1, c1: "#ffd166", c2: "#f4a261", type: "win" },
  { title: "Selfie grupal", desc: "Foto con 5 personas diferentes.", explanation: "Hazte una selfie con al menos 5 personas del cumple. Si la foto existe, la consumición es tuya.", icon: "📸", drinks: 1, c1: "#f6b0a8", c2: "#ffd1cb", type: "win" },
  { title: "Anécdota", desc: "Cuenta una anécdota divertida de la cumpleañera.", explanation: "Cuenta en voz alta una anécdota graciosa, bonita o comprometida de la cumpleañera. El grupo valida si merece premio.", icon: "🎤", drinks: 1, c1: "#f7c65d", c2: "#fff0a6", type: "win" },
  { title: "Conoce a alguien", desc: "Habla 2 minutos con alguien nuevo.", explanation: "Elige a una persona con la que hayas hablado poco o nada esta noche y habla con ella durante 2 minutos.", icon: "🤝", drinks: 1, c1: "#bfe3b4", c2: "#7fc8a9", type: "win" },
  { title: "Paso prohibido", desc: "Tu mejor paso de baile durante 10 segundos.", explanation: "Haz un paso de baile durante 10 segundos. No hace falta hacerlo bien: hace falta hacerlo con actitud.", icon: "💃", drinks: 1, c1: "#ff9fb2", c2: "#ffd1dc", type: "win" },
  { title: "Brindis oficial", desc: "Haz un brindis improvisado.", explanation: "Levanta el vaso y dedica un brindis corto a la cumpleañera o al grupo. Con solemnidad o con drama, tú eliges.", icon: "🥂", drinks: 1, c1: "#ffe08a", c2: "#f4a261", type: "win" },
  {
    title: "Pregunta cumpleañera",
    desc: "Responde correctamente una pregunta sobre la cumpleañera.",
    explanation: "La ruleta elegirá una pregunta aleatoria sobre la cumpleañera. Si aciertas, ganas la consumición.",
    icon: "❓",
    drinks: 1,
    c1: "#9fc5f8",
    c2: "#8ecae6",
    type: "win",
    questions: [
      { question: "¿Cómo me apellido?", answer: "Mateos Vicente" },
      { question: "¿Cuál es mi color favorito?", answer: "Verde" },
      { question: "¿Cuál es mi canción favorita?", answer: "Love Yourself de Justin Bieber" },
      { question: "¿Dónde trabajo? Di empresa y área.", answer: "Openbank, área de Riesgos" }
    ]
  },
  { title: "Reto dardos", desc: "Acertar al tablero o a un número concreto.", explanation: "Tienes 3 lanzamientos. El grupo o la cumpleañera decide el objetivo antes de tirar.", icon: "🎯", drinks: 1, c1: "#f4a261", c2: "#fff4df", type: "win" },
  { title: "Reto billar", desc: "Meter una bola sencilla.", explanation: "Tienes un intento para meter una bola fácil. Si entra, ganas la consumición.", icon: "🎱", drinks: 1, c1: "#a8dadc", c2: "#7fc8d6", type: "win" },
  { title: "Cadena humana", desc: "Reúne a 5 personas para una foto divertida.", explanation: "Consigue juntar a 5 personas y haced una foto posando de forma ridícula o épica.", icon: "👯", drinks: 1, c1: "#ffb3ba", c2: "#f6d3a7", type: "win" },
  { title: "Imitación", desc: "Imita a alguien del grupo durante 15 segundos.", explanation: "Imita a alguien del grupo durante 15 segundos. Tiene que adivinarse o hacer reír.", icon: "🎭", drinks: 1, c1: "#cdb4db", c2: "#ffc8dd", type: "win" },
  { title: "Roba premio", desc: "Elige a alguien para hacer el reto contigo.", explanation: "Elige a otra persona. Hacéis juntos un mini reto decidido por el grupo. Si lo conseguís, el premio es tuyo.", icon: "🎁", drinks: 1, c1: "#b7d989", c2: "#ffd166", type: "win" },
  { title: "Vuelve a girar", desc: "Tienes otra oportunidad.", explanation: "No cuenta como premio ni castigo. Cierra esta pantalla y gira otra vez.", icon: "🔄", drinks: 0, c1: "#ffd1cb", c2: "#ff9fb2", type: "lose" },
  { title: "Jackpot", desc: "Ganas 2 consumiciones.", explanation: "Premio grande. Enseña esta pantalla a la cumpleañera y reclama 2 consumiciones.", icon: "👑", drinks: 2, c1: "#f06d5e", c2: "#ffd166", type: "win" },
  { title: "Mala suerte", desc: "No hay premio esta vez.", explanation: "La ruleta ha hablado. No hay consumición, pero puedes intentarlo en otra ronda si la cumpleañera lo permite.", icon: "💀", drinks: 0, c1: "#b7c9e2", c2: "#d8e2dc", type: "lose" }
];

const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spinBtn");
const startBtn = document.getElementById("startBtn");
const guestInput = document.getElementById("guestInput");
const ticketsInput = document.getElementById("ticketsInput");
const totalInput = document.getElementById("totalInput");
const ticketsGiven = document.getElementById("ticketsGiven");
const rouletteDrinks = document.getElementById("rouletteDrinks");
const winRate = document.getElementById("winRate");
const remainingDrinks = document.getElementById("remainingDrinks");
const givenDrinks = document.getElementById("givenDrinks");
const currentRate = document.getElementById("currentRate");
const setupPanel = document.getElementById("setupPanel");
const winnerScreen = document.getElementById("winnerScreen");
const selectedSlice = document.getElementById("selectedSlice");
const winnerIcon = document.getElementById("winnerIcon");
const winnerTitle = document.getElementById("winnerTitle");
const winnerDesc = document.getElementById("winnerDesc");
const winnerExplanation = document.getElementById("winnerExplanation");
const winnerPrize = document.getElementById("winnerPrize");
const claimBtn = document.getElementById("claimBtn");
const nextBtn = document.getElementById("nextBtn");
const hint = document.getElementById("hint");

const step = 360 / segments.length;
let rotation = 0;
let spinning = false;
let selectedRate = 0.60;
let availableDrinks = 10;
let deliveredDrinks = 0;
let pendingPrize = null;

function numberValue(input, fallback) {
  const value = parseInt(input.value, 10);
  return Number.isFinite(value) ? Math.max(0, value) : fallback;
}

function calculatePool() {
  const guests = numberValue(guestInput, 20);
  const tickets = numberValue(ticketsInput, 2);
  const total = numberValue(totalInput, 50);
  const initialTickets = guests * tickets;
  availableDrinks = Math.max(0, total - initialTickets - deliveredDrinks);

  ticketsGiven.textContent = initialTickets;
  rouletteDrinks.textContent = availableDrinks;
  remainingDrinks.textContent = availableDrinks;
  givenDrinks.textContent = deliveredDrinks;
  winRate.textContent = Math.round(selectedRate * 100) + "%";
  currentRate.textContent = Math.round(selectedRate * 100) + "%";
}

function setRate(rate) {
  selectedRate = rate;
  document.querySelectorAll(".rateButton").forEach(button => {
    button.classList.toggle("active", Number(button.dataset.rate) === rate);
  });
  calculatePool();
}

function chooseIndex() {
  const winIndexes = segments
    .map((segment, index) => segment.type === "win" && segment.drinks <= availableDrinks ? index : null)
    .filter(index => index !== null);

  const loseIndexes = segments
    .map((segment, index) => segment.type === "lose" ? index : null)
    .filter(index => index !== null);

  const shouldWin = Math.random() < selectedRate && winIndexes.length > 0;

  const pool = shouldWin ? winIndexes : loseIndexes;
  return pool[Math.floor(Math.random() * pool.length)];
}

function chooseQuestion(questions) {
  return questions[Math.floor(Math.random() * questions.length)];
}

function spin() {
  if (spinning) return;

  calculatePool();

  spinning = true;
  pendingPrize = null;
  spinBtn.disabled = true;
  claimBtn.disabled = false;
  claimBtn.style.display = "none";
  hint.textContent = "Girando... 🎡";

  const index = chooseIndex();
  const turns = 7 + Math.floor(Math.random() * 4);
  const targetRotation = 360 - (index * step);
  rotation = rotation + turns * 360 + targetRotation - (rotation % 360);

  wheel.style.transform = "rotate(" + rotation + "deg)";

  setTimeout(() => {
    const prize = segments[index];
    showWinner(prize);
    spinning = false;
    spinBtn.disabled = false;
    hint.textContent = "Pulsa GIRAR para el siguiente jugador 🎡";
  }, 5200);
}

function showWinner(prize) {
  pendingPrize = prize;
  selectedSlice.style.setProperty("--sliceColor", prize.c1);
  selectedSlice.style.setProperty("--sliceColor2", prize.c2);
  winnerIcon.textContent = prize.icon;
  winnerTitle.textContent = prize.title;

  if (prize.questions && prize.questions.length > 0) {
    const q = chooseQuestion(prize.questions);
    winnerDesc.textContent = q.question;
    winnerExplanation.innerHTML =
      "<strong>Pregunta secreta:</strong><br>" +
      "Deja que la persona responda antes de revelar la solución." +
      "<div class='answerControls'>" +
      "<button id='showAnswerBtn' class='showAnswerBtn'>Mostrar respuesta</button>" +
      "<div id='hiddenAnswer' class='hiddenAnswer'>" +
      "<div class='answerBox'>" + q.answer + "</div>" +
      "</div>" +
      "</div>";

    setTimeout(() => {
      const showAnswerBtn = document.getElementById("showAnswerBtn");
      const hiddenAnswer = document.getElementById("hiddenAnswer");

      if (showAnswerBtn && hiddenAnswer) {
        showAnswerBtn.addEventListener("click", () => {
          hiddenAnswer.style.display = "block";
          showAnswerBtn.style.display = "none";
        });
      }
    }, 0);
  } else {
    winnerDesc.textContent = prize.desc;
    winnerExplanation.innerHTML = "<strong>Explicación:</strong> " + prize.explanation;
  }

  if (prize.drinks > 0) {
    winnerPrize.textContent = "🍻 Premio: " + prize.drinks + " consumición" + (prize.drinks > 1 ? "es" : "");
    claimBtn.style.display = "inline-block";
    claimBtn.disabled = false;
    launchConfetti();
  } else if (prize.title === "Vuelve a girar") {
    winnerPrize.textContent = "🔄 Puedes volver a girar";
    claimBtn.style.display = "none";
  } else {
    winnerPrize.textContent = "😈 Sin premio esta vez";
    claimBtn.style.display = "none";
  }

  winnerScreen.classList.add("show");
}

function claimPrize() {
  if (!pendingPrize || pendingPrize.drinks <= 0) return;

  calculatePool();

  if (availableDrinks < pendingPrize.drinks) {
    winnerPrize.textContent = "😅 Ya no quedan consumiciones suficientes";
    claimBtn.disabled = true;
    return;
  }

  deliveredDrinks += pendingPrize.drinks;
  claimBtn.disabled = true;
  winnerPrize.textContent = "✅ Premio entregado";
  calculatePool();
}

function closeWinner() {
  winnerScreen.classList.remove("show");
  pendingPrize = null;
}

function launchConfetti() {
  const colors = ["#0757b8", "#e34d35", "#ffd166", "#fff4df", "#2a9d8f", "#ff9fb2"];
  for (let i = 0; i < 55; i++) {
    const piece = document.createElement("div");
    piece.className = "confetti";
    piece.style.left = Math.random() * 100 + "vw";
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDuration = (1.8 + Math.random() * 1.8) + "s";
    piece.style.transform = "rotate(" + (Math.random() * 360) + "deg)";
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 3900);
  }
}

[guestInput, ticketsInput, totalInput].forEach(input => {
  input.addEventListener("input", calculatePool);
});

document.querySelectorAll(".rateButton").forEach(button => {
  button.addEventListener("click", () => setRate(Number(button.dataset.rate)));
});

startBtn.addEventListener("click", () => {
  calculatePool();
  setupPanel.style.display = "none";
});

spinBtn.addEventListener("click", spin);
wheel.addEventListener("click", spin);
claimBtn.addEventListener("click", claimPrize);
nextBtn.addEventListener("click", closeWinner);

document.addEventListener("keydown", event => {
  if (event.code === "Space") {
    event.preventDefault();
    if (winnerScreen.classList.contains("show")) closeWinner();
    else spin();
  }
});

calculatePool();
