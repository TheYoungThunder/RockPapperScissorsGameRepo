console.log("app.js is running");
const paper = document.querySelector(".paper.game-button");
const scissors = document.querySelector(".scissors.game-button");
const rock = document.querySelector(".rock.game-button");
const rulesButton = document.querySelector(".rules-button");
const gameContainer = document.querySelector(".main-game-container");
const gameOn = document.querySelector(".game-on");
const rulesTab = document.querySelector(".rules-tab");
const scoreText = document.querySelector(".score-box-number");
let score = 0;

function decideWinner(playerChoice, houseChoice) {
  if (
    (playerChoice === "rock" && houseChoice === "scissors") ||
    (playerChoice === "paper" && houseChoice === "rock") ||
    (playerChoice === "scissors" && houseChoice === "paper")
  ) {
    score++;
    updateScoreText();
    winRound();
  } else if (playerChoice === houseChoice) {
    drawRound();
  } else {
    score--;
    updateScoreText();
    loseRound();
  }
}

function updateScoreText() {
  scoreText.textContent = score;
}
function loseRound() {}
function drawRound() {}
function winRound() {}

function decideHouseMove() {
  let rng = Math.floor(Math.random() * 3) + 1;
  switch (rng) {
    case 1:
      makeHandSign("rock");
      break;
    case 2:
      makeHandSign("paper");
      break;
    default:
      makeHandSign("scissors");
      break;
  }
  return rng;
}
function makeHandSign(name) {
  const firstRowDiv = document.querySelector(".first-row");
  var tempDiv = document.createElement("div");
  const content = `<div class="move-container-gradient ${name}"> <div class="move-container"> <img class="hand-signs" src="./images/icon-${name}.svg" alt=""> </div> </div>`;
  tempDiv.innerHTML = content;
  firstRowDiv.append(tempDiv);
}
function startGame() {
  gameContainer.style.display = "none";
  gameOn.style.display = "flex";
}
function returnToGameScreen() {
  gameOn.style.display = "none";
  gameContainer.style.display = "flex";
}

paper.addEventListener("click", (e) => {
  makeHandSign("paper");
});
rock.addEventListener("click", (e) => {
  makeHandSign("rock");
});
scissors.addEventListener("click", (e) => {
  makeHandSign("scissors");
});

rulesButton.addEventListener("click", (e) => {
  decideHouseMove();
});
