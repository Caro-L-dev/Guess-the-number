const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const MAX = 500;

class Attempts {
  constructor() {
    this.attempts = [];
  }

  init() {
    this.element = document.querySelector("#attempts");

    while (this.element.firstChild) {
      this.element.firstChild.remove();
    }
  }

  addAttempt(attempt, isRight) {
    this.attempts.push(attempt);

    const element = document.createElement("div");
    element.classList.add("text-xs");
    element.style.position = "absolute";

    element.innerText = isRight ? "🟢" : "x";

    const percentage = Math.min(Math.max(0, (attempt / MAX) * 100), 98);
    element.style.left = `${percentage}%`;
    element.style.top = "9px";

    this.element.appendChild(element);
  }
}

class Game {
  constructor() {
    this.targetNumber = getRandomNumber(0, MAX);
    console.log("Random Number:", this.targetNumber);
    this._attempt = 0;
    this.attempts = new Attempts();

    this.submitHandler = (event) => {
      this.submitGuess(event);
    };
  }

  get attempt() {
    return this._attempt;
  }

  set attempt(newAttempt) {
    this._attempt = newAttempt;
    this.attemptElement.innerText = `Nombre d'essai(s) : ${newAttempt}`;
  }

  init() {
    this.attempts.init();
    this.element = document.getElementById("game-container");
    this.element.classList.remove("hidden");

    this.guessForm = document.getElementById("guess-form");
    this.message = document.getElementById("message");

    this.attemptElement = document.getElementById("attempt");

    this.guessForm.addEventListener("submit", this.submitHandler);
    this.restartButton = document.getElementById("restart");
  }

  submitGuess(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const guess = Number(formData.get("guess"));

    if (Number.isNaN(guess)) {
      this.message.innerText =
        "❌ Format incorrect, vous devez entrer un numéro valide";
      return;
    }

    this.attempt++;
    form.querySelector("input").value = "";

    this.attempts.addAttempt(guess, guess === this.targetNumber);

    if (guess === this.targetNumber) {
      this.message.innerText = `🟢 Super vous avez trouvé ! Le numéro mystère était ${this.targetNumber}.`;
      this.restartButton.classList.remove("hidden");
      return;
    }

    if (guess > this.targetNumber) {
      const isAlredyHigh = this.message.innerText.includes("grand");
      const getLastChar = Number(this.message.innerText.slice(-1)) || 1;
      this.message.innerText = `🔴 Votre numéro est trop grand. ${
        isAlredyHigh ? `x${getLastChar + 1}` : ""
      }`;
    }

    if (guess < this.targetNumber) {
      const isAlredyLow = this.message.innerText.includes("bas");
      const getLastChar = Number(this.message.innerText.slice(-1)) || 1;
      this.message.innerText = `🔴 Votre numéro est trop bas. ${
        isAlredyLow ? `x${getLastChar + 1}` : ""
      }`;
    }
  }

  destroy() {
    this.element.classList.add("hidden");
    this.guessForm.removeEventListener("form", this.submitHandler);
    this.message.innerText = "";
    this.attemptElement.innerText = "Nombre d'essai(s) : 0";
    this.restartButton.classList.add("hidden");
  }
}

let game = null;
const toggleGame = () => {
  const startContainer = document.getElementById("start-container");
  startContainer.classList.add("hidden");

  if (game) {
    game.destroy();
  }
  game = new Game();
  game.init();
};

const startButton = document.getElementById("start");
startButton.addEventListener("click", toggleGame);

const restartButton = document.getElementById("restart");
restartButton.addEventListener("click", toggleGame);
