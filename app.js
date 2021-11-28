const paper = document.querySelector(".paper.game-button");
const scissors = document.querySelector(".scissors.game-button");
const rock = document.querySelector(".rock.game-button");
const rulesButton = document.querySelector(".rules-button");
const gameContainer = document.querySelector(".main-game-container");
const gameOn = document.querySelector(".game-on");
const rulesTab = document.querySelector(".rules-tab");
const scoreText = document.querySelector(".score-box-number");
const playerText = document.querySelector(".player.result-text");
const houseText = document.querySelector(".house.result-text");
const resultSection = document.querySelector(".result-and-restart");
const roundResult = document.querySelector(".round-result");
const restartButton = document.querySelector(".restart-button");
const firstColumnDiv = document.querySelector(".first.column");
const secondColumnDiv = document.querySelector(".second.column");
const playerHandContainer = document.querySelector(".player-hand-container");
const houseHandContainer = document.querySelector(".house-hand-container");
const myStorage = window.localStorage;
let glocalScore = 0;
let houseMove = "";

function decideWinner(playerChoice, houseChoice) {
  if (
    (playerChoice === "rock" && houseChoice === "scissors") ||
    (playerChoice === "paper" && houseChoice === "rock") ||
    (playerChoice === "scissors" && houseChoice === "paper")
  ) {
    winRound();
  } else if (playerChoice === houseChoice) {
    drawRound();
  } else {
    loseRound();
  }
}

function scoreNumOnReload() {
  scoreText.textContent = myStorage.getItem("score");
}

function updateScoreText(update) {
  if (myStorage.getItem("score") === null) {
    myStorage.setItem("score", 0);
  }
  let score = Number(myStorage.getItem("score")) + update;
  myStorage.setItem("score", score);

  scoreText.textContent = myStorage.getItem("score");
  console.log(score, myStorage.getItem("score"));
}
function loseRound() {
  glocalScore--;
  updateScoreText(-1);
  roundResult.textContent = "you lost";
}
function drawRound() {
  roundResult.textContent = "you drew";
}
function winRound() {
  glocalScore++;
  updateScoreText(1);
  roundResult.textContent = "you won";
}

function decideHouseMove() {
  let rng = Math.floor(Math.random() * 3) + 1;
  switch (rng) {
    case 1:
      makeHouseHandSign("rock");
      break;
    case 2:
      makeHouseHandSign("paper");
      break;
    default:
      makeHouseHandSign("scissors");
      break;
  }
  return rng;
}
function makeHandSign(name) {
  var tempDiv = document.createElement("div");
  const content = `<div class="move-container-gradient ${name}"> <div class="move-container"> <img class="hand-signs" src="./images/icon-${name}.svg" alt=""> </div> </div>`;
  tempDiv.innerHTML = content;
  playerHandContainer.append(tempDiv);
}
function makeHouseHandSign(name) {
  houseMove = name;
  var tempDiv = document.createElement("div");
  const content = `<div class="move-container-gradient ${name}"> <div class="move-container"> <img class="hand-signs" src="./images/icon-${name}.svg" alt=""> </div> </div>`;
  tempDiv.innerHTML = content;
  houseHandContainer.append(tempDiv);
}
function startGame() {
  gameContainer.style.display = "none";
  gameOn.style.display = "block";
  playerText.style.display = "block";
  houseText.style.display = "block";
}
function returnToGameScreen() {
  gameOn.style.display = "none";
  gameContainer.style.display = "flex";
  resultSection.style.display = "none";
}
function gameProcess(name) {
  startGame();
  makeHandSign(name);
  let playerMove = name;
  decideHouseMove();
  decideWinner(playerMove, houseMove);
  resultSection.style.display = "flex";
}

paper.addEventListener("click", (e) => {
  gameProcess("paper");
});
rock.addEventListener("click", (e) => {
  gameProcess("rock");
});
scissors.addEventListener("click", (e) => {
  gameProcess("scissors");
});
restartButton.addEventListener("click", (e) => {
  //   remove old hand signs left so they wont stack in the background
  playerHandContainer.innerHTML = "";
  houseHandContainer.innerHTML = "";
  returnToGameScreen();
});
rulesButton.addEventListener("click", (e) => {
  decideHouseMove();
});
