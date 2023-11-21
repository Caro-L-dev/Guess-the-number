const game = () => {
  const startContent = document.getElementById("startContent");
  const mainContent = document.getElementById("mainContent");

  startContent.style.display = "none";
  mainContent.style.display = "block";
};

const playBtn = () => {
  const playBtn = document.getElementById("playBtn");
  playBtn.addEventListener("click", game);
};

// playBtn();
game();
