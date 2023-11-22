// @ts-nocheck
const displayContent = () => {
  const startContent = document.getElementById("startContent");
  const mainContent = document.getElementById("mainContent");

  startContent.style.display = "none";
  mainContent.style.display = "block";
};

const playBtn = () => {
  const playBtn = document.getElementById("playBtn");
  playBtn.addEventListener("click", game);
};

const generateRandomNumberBetween0And500 = () => {
  const randomNumber = Math.random() * 501;
  const roundedNumber = Math.round(randomNumber);
  console.log("Random Number:", roundedNumber);
  return roundedNumber;
};

const fetchUserGuess = () => {
  const inputElement = document.getElementById("yourGuess");

  const submitBtn = document.getElementById("submitBtn");
  submitBtn.addEventListener("click", () => {
    const userGuess = fetchUserGuess();
    console.log("User Guess:", userGuess);
  });

  return inputElement.value;
};

const game = () => {
  playBtn();
  displayContent();
  generateRandomNumberBetween0And500();
  fetchUserGuess();
};

game();
