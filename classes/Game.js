import { getRandomNumber } from "../features/getRandomNumber";
import { MAX } from "../common/constants";
import { Attempts } from "./Attempts";

export class Game {
  constructor() {
    this.targetNumber = getRandomNumber(0, MAX);
    console.log("Random Number:", this.targetNumber);
    this._attempt = 0;
    this.attempts = new Attempts();
    this.submitHandler = (event) => this.submitGuess(event);
  }

  get attempt() {
    return this._attempt;
  }

  set attempt(newAttempt) {
    this._attempt = newAttempt;
    this.attemptElement.innerText = `Nombre d'essai(s) : ${newAttempt}`;
  }

  init() {
    this.element = document.getElementById("game-container");
    this.element.classList.remove("hidden");

    this.guessForm = document.getElementById("guess-form");
    this.message = document.getElementById("message");
    this.attemptElement = document.getElementById("attempt");

    this.guessForm.addEventListener("submit", this.submitHandler);
    this.restartButton = document.getElementById("restart");
    this.restartButton.addEventListener("click", () => this.restartGame());
  }

  submitGuess(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const isGuess = Number(form.querySelector("input").value);

    if (Number.isNaN(isGuess)) {
      this.message.innerText =
        "❌ Format incorrect, vous devez entrer un numéro valide";
      return;
    }

    this.attempt++;
    form.querySelector("input").value = "";

    this.attempts.addAttempt(isGuess, isGuess === this.targetNumber);

    if (isGuess === this.targetNumber) {
      this.handleWin();
    } else {
      this.handleGuessMismatch(isGuess);
    }
  }

  handleWin() {
    this.message.innerText = `🟢 Super vous avez trouvé ! Le numéro mystère était ${this.targetNumber}.`;
    this.restartButton.classList.remove("hidden");
  }

  handleGuessMismatch(guess) {
    const comparisonMessage =
      guess > this.targetNumber ? "trop grand" : "trop bas";
    const isAlready = this.message.innerText.includes(comparisonMessage);
    const getLastChar = Number(this.message.innerText.slice(-1)) || 1;

    this.message.innerText = `🔴 Votre numéro est ${comparisonMessage}. ${
      isAlready ? `x${getLastChar + 1}` : ""
    }`;
  }

  restartGame() {
    this.destroy();
    this.init();
  }

  destroy() {
    this.element.classList.add("hidden");
    this.guessForm.removeEventListener("submit", this.submitHandler);
    this.message.innerText = "";
    this.attemptElement.innerText = "Nombre d'essai(s) : 0";
    this.restartButton.classList.add("hidden");
  }
}
