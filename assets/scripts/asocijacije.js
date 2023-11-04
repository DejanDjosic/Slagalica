'use strict';
const asocElement = document.querySelector('.asoc-grid');

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

const outOfTime = () => {
  stopCountdown();
  alert('ponestalo je vremena');
  endGame();
};

const timeInterval = setInterval(countdown, 1000);

const stopCountdown = () => clearInterval(timeInterval);

const checkAnswer = (e, guessAnswer, guessCell) => {
  if (e.code === 'Enter') {
    let answerIndex = guessCell.getAttribute('id');
    guessAnswer = guessAnswer.toUpperCase();
    guessCell.innerHTML = guessAnswer;
    if (answersMatch(guessAnswer, columnAnswers[answerIndex])) {
      correctAnswer(guessAnswer, guessCell, answerIndex);
    } else wrongAnswer(guessCell, answerIndex);
  }
};

const fillColumn = (selectedColumn, index) => {
  let selectedColumnCells = Array.from(selectedColumn.children);
  index *= columnNames.length; //get correct index to parse to function

  selectedColumnCells.forEach((element) => {
    element.classList.add('correct');
    fillCell(element, index);
    index++;
  });
};

const correctAnswer = (guessAnswer, guessCell, answerIndex) => {
  if (guessAnswer !== finalSolution()) {
    const selectedColumn = asocColumnsArray[answerIndex];
    fillColumn(selectedColumn, answerIndex);
    score += 5;
    console.log('SCORE: ' + score);
    guessAnswer = guessAnswer.toUpperCase();
    guessCell.innerHTML = guessAnswer;
  } else {
    gameWon(guessCell);
  }
};

const wrongAnswer = (guessCell, answerIndex) => {
  guessCell.classList.add('wrong');
  disableClick(guessCell);
  setTimeout(() => {
    enableClick(guessCell);
    clearGuessCell(guessCell, answerIndex);
  }, 2000);
};

const finalSolution = () => columnAnswers[columnAnswers.length - 1];

const gameWon = (solutionCell) => {
  stopCountdown();
  score = 30;
  console.log('SCORE: ' + score);
  guessCellsArray.forEach((element, i) => {
    element.innerHTML = columnAnswers[i];
    element.classList.add('correct');
  });
  asocColumnsArray.forEach((element, i) => {
    fillColumn(element, i);
  });
  solutionCell.classList.add('correct');
};

const disableClick = (element) => {
  element.classList.add('zero-pointer-normal');
};
const enableClick = (element) => {
  element.classList.remove('zero-pointer-normal');
};

const clearGuessCell = (guessCell, answerIndex) => {
  let columnName = columnNames[answerIndex];
  guessCell.innerHTML = columnName;
  guessCell.classList.remove('wrong');
};

const answersMatch = (guessAnswer, computerAnswer) =>
  guessAnswer === computerAnswer ? true : false;

const previewInput = (guessCell) => {
  guessCell.innerHTML = '';
  const input = document.createElement('input');
  input.setAttribute('type', 'text');

  stylingInput(input);
  guessCell.appendChild(input);
  input.addEventListener('keydown', (e) => {
    checkAnswer(e, input.value, guessCell);
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
  asocElement.appendChild(solutionCell);
  solutionCell.setAttribute('id', columnAnswers.length - 1);
  guessCellsArray.push(solutionCell);
};

const addColumn = (char, columnNames, index) => {
  const asocColumn = document.createElement('div');
  asocColumn.classList.add('asoc-column');
  asocElement.appendChild(asocColumn);
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

const endGame = () => {};

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
