import { Game } from "../classes/Game";

export const toggleGame = () => {
  let inGame = null;
  const startContainer = document.getElementById("start-container");
  startContainer.classList.add("hidden");

  if (inGame) {
    inGame.destroy();
  }

  inGame = new Game();
  inGame.init();
};
