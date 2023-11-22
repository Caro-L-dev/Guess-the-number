// @ts-nocheck

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const MAX = 500;

class Attempts {
  constructor() {
    this.attempts = [];
  }

  init() {
    this.element = document.getElementById("attempts");
  }

  addAttempt(attempt, isRight) {
    this.attempts.push(attempt);

    const element = document.createElement("div");
    element.classList.add("text-xs");
    element.style.position = "absolute";

    element.innerText = isRight ? "V" : "X";

    const percentage = Math.min(Math.max(0, (attempt / MAX) * 100), 98);
    element.style.left = `${percentage}%`;
    element.style.top = 9;

    this.element.appendChild(element);
  }
}

class Game {
  constructor() {
    this.targetNumber = getRandomNumber(0, MAX);
    this.attempt = 0;
    this.attempts = new Attempts();

    this.submitHandler = (event) => {
      this.submitGuess(event);
    };
  }

  init() {
    this.attempts.init();
    this.element = document.getElementById("game-content");
    this.element.classList.remove("hidden");

    this.guessForm = document.getElementById("guess-form");
    this.message = document.getElementById("message");

    this.guessForm.addEventListener("submit", this.submitHandler);
  }

  submitGuess(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const guess = Number(formData.get("guess"));

    if (Number.isNaN(guess)) {
      this.message.innerText =
        "Valeur incorrecte, vous devez utiliser un nombre valide";
      return;
    }

    this.attempt++;
    form.querySelector("input").value = "";

    this.attempts.addAttempt(guess, guess === this.targetNumber);

    if (guess === this.targetNumber) {
      this.message.innerText = `Super, vous avez trouver le nombre mystère ! C'était ${this.targetNumber}.`;
      return;
    }

    if (guess > this.targetNumber) {
      const isAlreadyHight = this.message.innerText.includes("grand");
      const getLastCharacter = Number(this.message.innerText.slice(-1)) || 0;
      this.message.innerText = `Votre numéro est trop grand.
      ${isAlreadyHight ? `x${getLastCharacter + 1}` : ""}`;
    }

    if (guess < this.targetNumber) {
      const isAlreadyLow = this.message.innerText.includes("petit");
      const getLastCharacter = Number(this.message.innerText.slice(-1)) || 0;
      this.message.innerText = `Votre numéro est trop petit.
      ${isAlreadyLow ? `x${getLastCharacter + 1}` : ""}`;
    }
  }
}

let game = null;
const startGame = () => {
  const startContent = document.getElementById("start-content");
  startContent.classList.add("hidden");

  if (game) {
    //
  }

  game = new Game();
  game.init();
};

const startBtn = document.getElementById("startBtn");
startBtn.addEventListener("click", startGame);
