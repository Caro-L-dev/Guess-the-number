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

  // const submitBtn = document.getElementById("submitBtn");
  // submitBtn.addEventListener("click", () => {
  //   const userGuess = fetchUserGuess();
  //   console.log("User Guess:", userGuess);
  // });

  return inputElement.value;
};

const displayMessage = (message) => {
  const messageElement = document.createElement("p");
  messageElement.innerHTML = message;
  document.body.appendChild(messageElement);
};

const game = () => {
  displayContent();
  const targetNumber = generateRandomNumberBetween0And500();
  playBtn();

  const submitBtn = document.getElementById("submitBtn");
  submitBtn.addEventListener("click", () => {
    const userGuess = parseInt(fetchUserGuess(), 10);

    if (userGuess > targetNumber) {
      displayMessage("Nombre trop grand");
    } else if (userGuess < targetNumber) {
      displayMessage("Nombre trop petit");
    } else {
      displayMessage("Bravo ! Vous avez deviné le bon nombre !");
    }
  });
};

game();
