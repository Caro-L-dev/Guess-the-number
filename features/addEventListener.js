import { START_BUTTON, RESET_BUTTON } from "../common/constants";
import { toggleGame } from "./toggleGame";

export const addEventButtons = () => {
  START_BUTTON.addEventListener("click", toggleGame);
  RESET_BUTTON.addEventListener("click", toggleGame);
};
