const playBtn = () => {
  const playBtn = document.getElementById("playBtn");
  playBtn.addEventListener("click", game);
};

const generateRandomNumberBetween0And500 = () => {
  const randomNumber = Math.random() * 501;
  const roundedNumber = Math.round(randomNumber);
  console.log(roundedNumber);
  return roundedNumber;
};

const game = () => {
  playBtn();
  const startContent = document.getElementById("startContent");
  const mainContent = document.getElementById("mainContent");

  startContent.style.display = "none";
  mainContent.style.display = "block";
  generateRandomNumberBetween0And500();
};

game();
