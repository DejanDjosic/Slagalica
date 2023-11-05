'use strict';
const display = document.querySelector('.display');
const buttons = Array.from(document.querySelectorAll('.allInputs .numbercell'));
const randoms = Array.from(document.querySelectorAll('.game-number'));
const btnBigNumber = document.querySelector('.big-game-number');
const btnMidNumber = document.querySelector('.mid-game-number');
const btnSubmit = document.querySelector('.cell');
const test = document.querySelector('.test');
let lastAdded = '';

const btnBackSpace = document.querySelector('.btnBackspace');
const link = document.querySelector('.link');
const giveUp = document.querySelector('.giveup');

const modal = document.querySelector('.modal');

const hiddenInput = document.querySelector('.hiddenInput');


let score = 0;
let userSolution = 0;

const displayArray = [];

const bigNumber = [25, 50, 75, 100];
const midNumber = [10, 15, 20];

const timer = document.getElementById('timer');


const countdown=()=> {
  timer.innerHTML -= '1';
  if (timer.innerHTML === '0') outOfTime();
}

const outOfTime=()=> {
stopCountdown();
    alert('ponestalo je vremena');
    submit();
    endGame();
  }

const timeInterval = setInterval(countdown, 1000);

const stopCountdown=()=>clearInterval(timeInterval);

const generateNumberFromArray=(ar)=> {
  let randomNumber = 0;
  for (let i = 0; i < ar.length; i++) {
    let randomIndex = Math.floor(Math.random() * ar.length);
    randomNumber = ar[randomIndex];
  }
  return randomNumber;
}

const generateRandomNumber=()=> {
  return Math.floor(Math.random() * 9) + 1;
}

const addID=()=> {
  btnBigNumber.innerText = generateNumberFromArray(bigNumber);
  btnBigNumber.setAttribute('id', btnBigNumber.innerText);

  btnMidNumber.innerText = generateNumberFromArray(midNumber);
  btnMidNumber.setAttribute('id', btnMidNumber.innerText);

  randoms.forEach((element) => {
    element.innerText = generateRandomNumber();
    element.setAttribute('id', element.innerText);
  });
}

addID();

const generateSolution=()=> {
  let solution =
    randoms[0].innerText * 100 +
    randoms[1].innerText * 10 +
    randoms[2].innerText * 1;
  return solution;
}

generateSolution();

const typing=(target)=> {
    displayArray.push(target.innerText);
    display.innerHTML += target.innerText;
    if (target.closest('.operators') === null)      //forbid typing the same number again
      target.classList.add('zero-pointer');
  }


buttons.map((button) => {
  button.addEventListener('click', (e) => {
    if (e.target.hasAttribute('id')) {
      let newNumber = e.target.innerText;
      if (lastAdded === '') {     //only if lastAdded is an operant or '' the user is able to type another number
        lastAdded = newNumber;
        typing(e.target);
      }
    } else {
      typing(e.target);
      lastAdded = '';
    }
  });
});


const backspace=()=> {
  if (display.innerHTML) {
    lastAdded = '';
   let removed = displayArray.pop();
    for (let i = 0; i < buttons.length; i++) {
      if (buttons[i].id === removed) {
        buttons[i].classList.remove('zero-pointer');
      }
    }
    display.innerHTML = '';
    displayArray.forEach((element) => {
      display.innerHTML += element;
    });
  }
}

btnBackSpace.addEventListener('click', backspace);



const submit=()=> {
  if (display.innerHTML) {
    lastAdded = '';
    try {
      userSolution = eval(display.innerText);
      if (userSolution) {
        giveUp.classList.add('hidden');
        showModal(userSolution, compareToSolution(userSolution));
      }
      clearInterval(timeInterval);
      displayArray.length = 0;
      endGame();
    } catch (error) {
      alert('Molimo unesite validan izraz.');
      console.log(displayArray);
    }
  }
}

btnSubmit.addEventListener('click', () => {
    submit();
  });

const showModal=(userSolution, score)=> {
  modal.classList.remove('hidden');
  let headings = document.querySelector('.headings');
  let headingSolution = document.createElement('h1');
  headingSolution.innerHTML = `Vaš rezultat je ${userSolution} <br> Osvojili ste ${score} poena! `;
  hiddenInput.value = score;
  headings.appendChild(headingSolution);
}

const absValue=(number)=> {
  if (number < 0) {
    return -number;
  } else {
    return number;
  }
}

const compareToSolution=(userSolution)=> {
  let difference = absValue(generateSolution() - userSolution);
  switch (true) {
    case difference === 0:
      score += 30;
      break;

    case difference <= 5:
      score += 25;
      break;

    case difference <= 10:
      score += 15;
      break;

    case difference <= 15:
      score += 10;
      break;

    default:
        score=0; 
  }
  return score;
}

const endGame=()=> {
  buttons.forEach((element) => {
    element.classList.add('zero-pointer');
  });
  btnBackSpace.classList.add('zero-pointer');
  btnSubmit.classList.add('zero-pointer');
}

