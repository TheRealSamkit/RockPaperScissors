let userScore = 0;
let compScore = 0;
let userChoices = [];
const messages = {
  rock: {
    scissors: "Your rock crushed the scissors!",
    fire: "Your rock crushed the fire!",
    paper: "The paper wrapped your rock!",
    water: "The water eroded your rock!",
  },
  paper: {
    rock: "Your paper wrapped the rock!",
    water: "Your paper absorbed the water!",
    scissors: "The scissors cut your paper!",
    fire: "The fire burned your paper!",
  },
  scissors: {
    paper: "Your scissors cut the paper!",
    water: "Your scissors sliced through the water!",
    rock: "The rock crushed your scissors!",
    fire: "The fire melted your scissors!",
  },
  fire: {
    paper: "Your fire burned the paper!",
    scissors: "Your fire melted the scissors!",
    water: "The water extinguished your fire!",
    rock: "The rock crushed your fire!",
  },
  water: {
    fire: "Your water extinguished the fire!",
    rock: "Your water eroded the rock!",
    paper: "The paper absorbed your water!",
    scissors: "The scissors sliced through your water!",
  },
};

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");

const drawGame = () => {
  // Draw Game
  msg.innerText = "Game was draw. Play Again.";
  msg.style.backgroundColor = "#000";
};

const showWin = (userWin, userChoice, compChoice) => {
  if (userWin) {
    userScore++;
    userScorePara.innerText = userScore;
    msg.innerText = `You win! ${messages[userChoice][compChoice]}`;
    msg.style.backgroundColor = "Green";
  } else {
    compScore++;
    compScorePara.innerText = compScore;
    msg.innerText = `You lost. ${messages[userChoice][compChoice]}`;
    msg.style.backgroundColor = "Red";
  }
};
const genCompChoice = (userChoice) => {
  const options = ["rock", "paper", "scissors", "fire", "water"];

  const weightedOptions = options.flatMap((option) =>
    option === userChoice ? [option] : [option, option]
  );

  const randIdx = Math.floor(Math.random() * weightedOptions.length);
  return weightedOptions[randIdx];
};

const playGame = (userChoice) => {
  const compChoice = genCompChoice(userChoice);
  console.log("UserChoice: ", userChoice, "\nComputer Choice:", compChoice);
  if (userChoice === compChoice) {
    drawGame();
  } else {
    let userWin = true;

    if (userChoice === "rock") {
      userWin = compChoice === "paper" || compChoice === "water" ? false : true;
    } else if (userChoice === "paper") {
      userWin =
        compChoice === "scissors" || compChoice === "fire" ? false : true;
    } else if (userChoice === "scissors") {
      userWin = compChoice === "rock" || compChoice === "water" ? false : true;
    } else if (userChoice === "fire") {
      userWin = compChoice === "water" || compChoice === "rock" ? false : true;
    } else if (userChoice === "water") {
      userWin =
        compChoice === "scissors" || compChoice === "paper" ? false : true;
    }

    showWin(userWin, userChoice, compChoice);
  }
};

function trackUserChoices(choice) {
  userChoices.push(choice);

  if (userChoices.length > 20) {
    userChoices.shift();
  }

  const allSame = userChoices.every((c) => c === userChoices[0]);
  if (allSame && userChoices.length === 20) {
    alert("Suspicious activity detected! Please play fairly.");
  }
}

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");
    playGame(userChoice);
    trackUserChoices(userChoice);
  });
});
