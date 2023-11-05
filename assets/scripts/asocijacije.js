'use strict';
const asocGrid = document.querySelector('.asoc-grid');
const modal = document.querySelector('.modal');
const giveUp = document.querySelector('.giveup');
const hiddenInput = document.querySelector('.hiddenInput');
const btnX = document.querySelector('.button-x');
const returnModal = document.querySelector('.return-modal');
const timer = document.getElementById('timer');

const columnNames = 'ABCD';
const clickCellsArray = [];
const guessCellsArray = [];
const asocColumnsArray = [];
let score = 0;

const associations = [
  'FESTIVAL',
  'FOTO-APARAT',
  'TABLETA',
  'MJUZIKL',
  'ODELO',
  'NAVIKA',
  'BERZA',
  'HONORAR',
  'HEMIJA',
  'LANAC',
  'ALERGIJA',
  'ODGOVOR',
  'PESAK',
  'STADION',
  'FIFA',
  'UEFA',
];
const columnAnswers = ['FILM', 'RAD', 'REAKCIJA', 'FUDBAL', 'AKCIJA'];

const countdown = () => {
  timer.innerHTML -= '1';
  if (timer.innerHTML === '0') outOfTime();
};

const outOfTime = () => gameLost();

const timeInterval = setInterval(countdown, 1000);

const stopCountdown = () => clearInterval(timeInterval);

const checkAnswer = (e, guessAnswer, guessCell, previousCellText) => {
  if (e.code === 'Enter') {
    let answerIndex = guessCell.getAttribute('id');
    guessAnswer = guessAnswer.toUpperCase();
    if (answersMatch(guessAnswer, columnAnswers[answerIndex])) {
      correctAnswer(guessAnswer, guessCell, answerIndex);
    } else wrongAnswer(guessCell, guessAnswer, previousCellText);
  }
};

const answersMatch = (guessAnswer, computerAnswer) =>
  guessAnswer === computerAnswer ? true : false;

const correctAnswer = (guessAnswer, guessCell, answerIndex) => {
  if (guessAnswer !== finalSolution()) {
    const selectedColumn = asocColumnsArray[answerIndex];
    fillColumn(selectedColumn, answerIndex);
    guessCell.innerHTML = guessAnswer;
    score += 5;
  } else {
    gameWon();
  }
};

const finalSolution = () => columnAnswers[columnAnswers.length - 1];

const fillColumn = (selectedColumn, index) => {
  let selectedColumnCells = Array.from(selectedColumn.children);
  index *= columnNames.length; //get correct index of the asocs
  selectedColumnCells.forEach((element) => {
    element.classList.add('correct');
    fillCell(element, index);
    index++;
  });
};

const wrongAnswer = (guessCell, guessAnswer, previousCellText) => {
  guessCell.innerHTML = guessAnswer;
  guessCell.classList.add('wrong');
  disableClick(guessCell);
  setTimeout(() => {
    enableClick(guessCell);
    clearGuessCell(guessCell, previousCellText);
  }, 2000);
};

const disableClick = (element) => {
  element.classList.add('zero-pointer-normal');
};
const enableClick = (element) => {
  element.classList.remove('zero-pointer-normal');
};

const clearGuessCell = (guessCell, previousCellText) => {
  guessCell.innerHTML = previousCellText;
  guessCell.classList.remove('wrong');
};

const gameWon = () => {
  stopCountdown();
  score = 30;
  correctBoard(true);
  showModal(true);
};

const correctBoard = (win) => {
  clickCellsArray.forEach((element, i) => {
    fillCell(element, i);
    win && element.classList.add('correct');
  });
  guessCellsArray.forEach((element, i) => {
    element.innerHTML = columnAnswers[i];
    win && element.classList.add('correct');
  });
};

const gameLost = () => {
  stopCountdown();
  showModal(false);
  correctBoard();
};

const showModal = (win) => {
  modal.classList.remove('hidden');
  giveUp.classList.add('hidden');
  const headings = document.querySelector('.headings');
  const mainHeading = document.createElement('h1');
  win
    ? (mainHeading.innerHTML = 'Čestitamo!')
    : (mainHeading.innerHTML = 'Ponestalo Vam je vremena!');

  const scoreHeading = document.createElement('h1');
  scoreHeading.innerHTML = `Osvojili ste ${score} poena! `;
  headings.appendChild(mainHeading);
  headings.appendChild(scoreHeading);
  hiddenInput.value = score;
  modalFunctionalities();
};

const previewInput = (guessCell) => {
  let previousCellText = guessCell.innerHTML;
  guessCell.innerHTML = '';
  const input = document.createElement('input');
  input.setAttribute('type', 'text');

  stylingInput(input);
  guessCell.appendChild(input);
  input.addEventListener('keydown', (e) => {
    checkAnswer(e, input.value, guessCell, previousCellText);
  });
};

const stylingInput = (input) => {
  input.style.textAlign = 'center';
  input.style.fontWeight = 'bold';
  input.style.fontSize = '20px';
};

const fillCell = (clickCell, i) => {
  for (let assocIndex = 0; assocIndex < associations.length; assocIndex++) {
    if (assocIndex === i) {
      clickCell.innerHTML = associations[i];
    }
  }
};

const createGrid = () => {
  for (let i = 0; i < columnNames.length; i++)
    addColumn(columnNames.charAt(i), columnNames, i);
  const solutionCell = createCell('?', true);
  solutionCell.setAttribute('id', columnAnswers.length - 1);
  asocGrid.appendChild(solutionCell);
  guessCellsArray.push(solutionCell);
};

const addColumn = (char, columnNames, index) => {
  const asocColumn = document.createElement('div');
  asocColumn.classList.add('asoc-column');
  asocGrid.appendChild(asocColumn);
  asocColumnsArray.push(asocColumn);
  for (let i = 0; i < columnNames.length; i++) {
    let cell = createCell(`${char}${i + 1}`);
    clickCellsArray.push(cell);
    asocColumn.appendChild(cell);
  }
  let guessCell = createCell(char);
  guessCell.setAttribute('id', index);
  asocColumn.appendChild(guessCell);
  guessCellsArray.push(guessCell);
};

const createCell = (text, isSolutionCell) => {
  const cell = document.createElement('div');
  !isSolutionCell
    ? cell.classList.add('medium-cell')
    : cell.classList.add('solution-cell');
  cell.innerText = text;
  return cell;
};

createGrid();

const hideModal = () => modal.classList.add('hidden');

guessCellsArray.forEach((guessCell) => {
  guessCell.addEventListener('click', () => {
    previewInput(guessCell);
  });
});

clickCellsArray.forEach((clickCell, i) => {
  clickCell.addEventListener('click', () => {
    fillCell(clickCell, i);
  });
});

const modalFunctionalities = () => {
  btnX.addEventListener('click', () => {
    hideModal();
    returnModal.classList.remove('hidden');
    returnModal.addEventListener('click', () =>
      modal.classList.remove('hidden')
    );
  });
};
