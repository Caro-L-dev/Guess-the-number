// @ts-nocheck
const displayContent = () => {
  const startContent = document.getElementById("startContent");
  const mainContent = document.getElementById("mainContent");

  startContent.style.display = "none";
  mainContent.style.display = "block";
};

const playBtn = () => {
  const playBtn = document.getElementById("playBtn");
  playBtn.addEventListener("click", () => {
    game();
  });
};

const generateRandomNumberBetween0And500 = () => {
  const randomNumber = Math.random() * 501;
  const roundedNumber = Math.round(randomNumber);
  console.log("Random Number:", roundedNumber);
  return roundedNumber;
};

const fetchUserGuess = () => {
  const inputElement = document.getElementById("yourGuess");
  return inputElement.value;
};

const displayMessage = (message) => {
  const messageElement = document.getElementById("message");
  messageElement.innerHTML = message;
};

const game = () => {
  displayContent();
  let targetNumber = generateRandomNumberBetween0And500();
  let attempts = 0;
  let score = 0;
  playBtn();

  const submitBtn = document.getElementById("submitBtn");
  const replayBtn = document.getElementById("replayBtn");
  const inputElement = document.getElementById("yourGuess");
  const messageElement = document.getElementById("message");
  const scoreElement = document.getElementById("score");
  const attemptElement = document.getElementById("attempt");

  submitBtn.addEventListener("click", () => {
    const userGuess = parseInt(fetchUserGuess(), 10);

    if (isNaN(userGuess)) {
      displayMessage("💥 Hep hep, entrez votre numéro.");
    } else {
      attempts++;
      attemptElement.innerHTML = `Essais : ${attempts}`;
    }

    if (userGuess > targetNumber) {
      displayMessage("🔴 Nombre trop grand.");
    } else if (userGuess < targetNumber) {
      displayMessage("🔴 Nombre trop petit.");
    } else if (userGuess === targetNumber) {
      displayMessage("✅ Bravo ! Vous avez deviné le bon nombre !");
      replayBtn.style.display = "block";
      inputElement.value = "";
      score++;
      scoreElement.innerHTML = `Score: ${score}`;
    }
  });

  replayBtn.addEventListener("click", () => {
    targetNumber = generateRandomNumberBetween0And500();
    replayBtn.style.display = "none";
    inputElement.value = "";
    messageElement.innerHTML = "";
    attemptElement.innerHTML = "Essai : 0";
  });
};

// game();
playBtn();
