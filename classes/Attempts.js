import { MAX } from "../common/constants";

export class Attempts {
  constructor() {
    this.attempts = [];
    this.element = document.querySelector("#attempts");
  }

  init() {
    while (this.element.firstChild) {
      this.element.firstChild.remove();
    }
  }

  addAttempt(attempt, isRight) {
    this.attempts.push(attempt);

    const element = document.createElement("div");
    element.classList.add("text-xs");
    element.style.position = "absolute";
    element.innerText = isRight ? "🟢" : "❌";

    const percentage = Math.min(Math.max(0, (attempt / MAX) * 100), 98);
    element.style.left = `${percentage}%`;
    element.style.top = "9px";

    this.element.appendChild(element);
  }
}
