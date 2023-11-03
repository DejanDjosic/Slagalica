'use strict';
const matchingCellsElement = document.querySelector('.matching-cells-grid');
const timer = document.getElementById('timer');
const modal = document.querySelector('.modal');
const giveUp = document.querySelector('.giveup');
const hiddenInput = document.querySelector('.hiddenInput');
const btnX = document.querySelector('.button-x');
const returnModal = document.querySelector('.return-modal');

const allCells = [];
const nameCellsArray = [];
const roleCellsArray = [];
const chosenCells = [];
const doneCellsArray = [];

let shuffeledNames = [];
let shuffeledRoles = [];

let score = 0;

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

const startGame = () => {
  createGrid();
  const shuffeledNames = shuffleArray(nameCellsArray);
  const shuffeledRoles = shuffleArray(roleCellsArray);
  addColumns(shuffeledNames, shuffeledRoles);
};

const createGrid = () => {
  for (let i = 0; i < actorsArray.length; i++) {
    const nameCell = document.createElement('div');
    nameCell.setAttribute('name', actorsArray[i].name);
    createCells(nameCell, actorsArray[i].name, i);

    const roleCell = document.createElement('div');
    createCells(roleCell, actorsArray[i].role, i);
  }
};
const createCells = (cellType, attribute, index) => {
  cellType.classList.add('medium-cell');
  cellType.innerText = attribute;
  cellType.setAttribute('id', index);
  allCells.push(cellType);
  cellType.getAttribute('name') !== null
    ? nameCellsArray.push(cellType)
    : roleCellsArray.push(cellType);
  cellType.addEventListener('click', (e) => {
    selectCell(e);
  });
};

const shuffleArray = (array) => array.sort(() => 0.5 - Math.random());

const addColumns = (names, roles) => {
  let namesIndex = 0;
  let rolesIndex = 0;
  for (let i = 0; i < allCells.length; i++) {
    if (i % 2 === 0) {
      matchingCellsElement.appendChild(names[namesIndex]);
      namesIndex++;
    } else {
      matchingCellsElement.appendChild(roles[rolesIndex]);
      rolesIndex++;
    }
  }
};

const selectCell = (e) => {
  const chosenCell = e.target;
  disableChosenColumn(chosenCell);
  chosenCell.classList.add('selected');
  chosenCells.push(chosenCell);
  chosenCells.length === 2 && checkCells();
};

const checkCells = () => {
  if (!isSameCellChosen()) {
    if (cellsMatch()) {
      correctAnswer();
      score += 3;
    } else wrongAnswer();
    doneCellsArray.push(chosenCells[0]);
  } else {
    chosenCells.forEach((element) => {
      element.classList.remove('selected');
    });
  }
  isGameOver();
  chosenCells.length = 0;
};

const endGame = () => {
  stopCountdown();
  showModal();
  correctBoard();
};

const showModal = () => {
  modal.classList.remove('hidden');
  giveUp.classList.add('hidden');
  console.log(score);
  const heading = document.querySelector('.heading');
  heading.innerHTML = `Osvojili ste ${score} poena! `;
  hiddenInput.value = score;
  modalFunctionalities();
};

const disableChosenColumn = (chosenCell) => {
  if (chosenCell.getAttribute('name') !== null) {
    nameCellsArray.forEach((nameCell) => {
      nameCell.classList.add('zero-pointer');
    });
  }
  if (chosenCell.getAttribute('name') === null) {
    roleCellsArray.forEach((roleCell) => {
      roleCell.classList.add('zero-pointer');
    });
  }
  chosenCell.classList.remove('zero-pointer');
};

const correctBoard = () => {
  while (matchingCellsElement.firstChild) {
    matchingCellsElement.removeChild(matchingCellsElement.firstChild);
  }
  addColumns(sortArrayById(nameCellsArray), sortArrayById(roleCellsArray));
  allCells.forEach((element) => {
    fillEmptyCellWhenOver(element);
    element.classList.add('zero-pointer-normal');
  });
};

const fillEmptyCellWhenOver = (cell) => {
  if (
    !cell.classList.contains('wrong') &&
    !cell.classList.contains('correct')
  ) {
    cell.classList.add('wrong');
  }
};

const hideModal = () => modal.classList.add('hidden');

const correctAnswer = () =>
  chosenCells.forEach((cell) => {
    cell.classList.remove('selected');
    cell.classList.add('correct');
    cell.classList.add('zero-pointer-normal');
  });

const wrongAnswer = () => {
  chosenCells[0].classList.add('wrong');
  chosenCells[1].classList.remove('selected');
};

const isSameCellChosen = () =>
  chosenCells[0].innerHTML === chosenCells[1].innerHTML;

const cellsMatch = () => chosenCells[0].id === chosenCells[1].id;

const sortArrayById = (array) => array.sort((a, b) => a.id - b.id);

const isGameOver = () =>
  doneCellsArray.length === actorsArray.length ? endGame() : enableCells();

const enableCells = () => {
  allCells.forEach((element) => element.classList.remove('zero-pointer'));
  doneCellsArray.forEach((element) => element.classList.add('zero-pointer'));
};

const actorsArray = [
  {
    name: 'Nebojša Glogovac',
    role: 'Živac',
  },
  {
    name: 'Sergej Trifunović',
    role: 'Braca',
  },
  {
    name: 'Marija Karan',
    role: 'Iris',
  },
  {
    name: 'Mladen Andrejević',
    role: 'Cile',
  },
  {
    name: 'Ana Marković',
    role: 'Ljubica',
  },
  {
    name: 'Nikola Đuričko',
    role: 'Kengur',
  },
  {
    name: 'Nikola Vujović',
    role: 'Duje',
  },
  {
    name: 'Gordan Kičić',
    role: 'Sumpor',
  },
];

const modalFunctionalities = () => {
  btnX.addEventListener('click', () => {
    hideModal();
    returnModal.classList.remove('hidden');
    returnModal.addEventListener('click', () =>
      modal.classList.remove('hidden')
    );
  });
};

startGame();
