'use strict';
const icons = ['angular', 'css', 'javascript', 'react'];
const buttons = Array.from(document.querySelectorAll('.solution-btn'));
const allRows = Array.from(
  document.querySelectorAll('.playing-rows .flex-row')
);
const allColorRows = Array.from(
  document.querySelectorAll('.guess-rows .flex-row')
);
const allColorCells = Array.from(document.querySelectorAll('.color-cell'));
const userCombination = [];
const numberOfCellsInRow = 4;
let activeRowIndex = 0;
let activeColorRowIndex = 0;
let correctCells = 0;
let activeCellIndex = 0;
let activeRow = allRows[activeRowIndex];
let activeColorRow = allColorRows[activeColorRowIndex];
const solutionCells = Array.from(document.querySelectorAll('.answer-cell'));

let score = 0;

const modal = document.querySelector('.modal');
const giveUp = document.querySelector('.giveup');
const hiddenInput = document.querySelector('.hiddenInput');

const timer = document.getElementById('timer');

const countdown = () => {
    timer.innerHTML -= '1';
    if (timer.innerHTML === '0') outOfTime();
  };
  
  const outOfTime = () => {
  stopCountdown();
    alert('ponestalo je vremena');
    endGame();
  };
  
  const timeInterval = setInterval(countdown, 1000);
  
  const stopCountdown = () => clearInterval(timeInterval);

const generateCombination = () => {
  const aiCombination = [];
  for (let i = 0; i < icons.length; i++) {
    let randomIndex = Math.floor(Math.random() * icons.length);
    let randomElement = icons[randomIndex];
    aiCombination.push(randomElement);
  }
  return aiCombination;
};

const aiCombination = generateCombination();
console.log(aiCombination);

const selectTechnology = (e) => {
  if (activeCellIndex < 4) {
    let activeCell = activeRow.children[activeCellIndex].classList;
    if (activeCell.length === 1) {
      activeCell.add(`background-${e.target.id}`);
      activeCell.add(e.target.id);
      activeCellIndex++;
    }
    if (activeCellIndex % numberOfCellsInRow === 0) {
      guessCombination();
      activeRowIndex++;
      matching();
      activeRow = allRows[activeRowIndex];
      activeCellIndex = 0;
    }
  }
};

buttons.map((button) => {
  button.addEventListener('click', selectTechnology);
});

const backspace = (e) => {
  if (e.code === 'Backspace') {
    if (activeCellIndex > 0) {
      let activeCell = activeRow.children[--activeCellIndex].classList;
      activeCell.remove(activeCell[1], activeCell[2]);
    }
  }
};

document.addEventListener('keydown', backspace);

const guessCombination = () => {
  let activeCells = Array.from(activeRow.children);
  activeCells.forEach((element) => {
    if (element.classList.length === 3) {
      userCombination.push(element.classList[2]);
    }
  });
  return userCombination;
};
//runs only if the row is filled (each cell has 3 classes when filled)

const matching = () => {
  let matched = [];
  let pointerAiCombination = [...aiCombination];

  checkGreen(userCombination, pointerAiCombination, matched);
  checkRed(userCombination, pointerAiCombination, matched);
  isGameOver();
  fillGuessRow(matched);
  switchRow();
};

const checkGreen = (userCombination, aiCombination, matched) => {
  for (let i = 0; i < aiCombination.length; i++) {
    if (aiCombination[i] === userCombination[i]) {
      aiCombination[i] = '';
      userCombination[i] = '+';
      matched.push('green');
      correctCells++;
    }
  }
  return matched;
};

const checkRed = (userCombination, aiCombination, matched) => {
  for (let i = 0; i < userCombination.length; i++) {
    if (aiCombination.includes(userCombination[i])) {
      aiCombination[aiCombination.indexOf(userCombination[i])] = '';
      userCombination[i] = '+';
      matched.push('red');
    }
  }
  return matched;
};

const fillGuessRow = (matched) => {
  matched.forEach((element, i) => {
    let activeCell = activeColorRow.children[i].classList;
    if (activeCell.length !== 2) {
      activeCell.add(element);
      i++;
    }
  });
};
const switchRow = () => {
  activeColorRowIndex++;
  activeColorRow = allColorRows[activeColorRowIndex];
  userCombination.length = 0;
  correctCells = 0;
};
const isGameOver=()=> {
  if (correctCombination()) {
    score = (allRows.length - activeRowIndex + 1) * 10;
    endGame();
  } else if (allMovesAreMade()) {
    endGame();
  }
}
const correctCombination = () => numberOfCellsInRow === correctCells;
const allMovesAreMade = () => activeRowIndex === allRows.length;

const endGame = () => {
  buttons.forEach((element) => {
    element.removeEventListener('click', selectTechnology);
  });
  showAnswer();
  stopCountdown();
  showModal();
  giveUp.classList.add('hidden');
};

const showModal = () => {
  modal.classList.remove('hidden');
  const heading = document.querySelector('.heading');
  heading.innerHTML = `Osvojili ste ${score} poena!`;
  hiddenInput.value = score;
};

const showAnswer = () => {
  for (let i = 0; i < solutionCells.length; i++) {
    solutionCells[i].classList.add('background-' + aiCombination[i]);
  }
};
