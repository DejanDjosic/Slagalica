let display = document.querySelector('.display');
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

let displayArray = [];

const bigNumber = [25, 50, 75, 100];
const midNumber = [10, 15, 20];

let timer = document.getElementById('timer');


const countdown=()=> {
  timer.innerHTML -= '1';
  if (timer.innerHTML === '0') outOfTime();
}

const outOfTime=()=> {
    clearInterval(myInterval);
    alert('ponestalo je vremena');
    submit();
    endGame();
  }

const myInterval = setInterval(countdown, 1000);


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
    if (target.closest('.operators') === null)
      target.classList.add('zero-pointer');
    //forbid typing the same number again
  }


buttons.map((button) => {
  button.addEventListener('click', (e) => {
    if (e.target.hasAttribute('id')) {
      newNumber = e.target.innerText;
      if (lastAdded === '') {
        lastAdded = newNumber;
        typing(e.target);
      }
    } else {
      newOperant = e.target;
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
    try {
      userSolution = eval(display.innerText);
      if (userSolution) {
        giveUp.classList.add('hidden');
        makeModal(userSolution, compareToSolution(userSolution));
      }

      displayArray = [];
      lastAdded = '';
      clearInterval(myInterval);
      endGame();
    } catch (error) {
      alert('Molimo unesite validan izraz.');
      display.innerText = '';
      displayArray = [];
      lastAdded = '';
    }
  }
}

btnSubmit.addEventListener('click', () => {
    submit();
  });

const makeModal=(userSolution, score)=> {
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
      console.log('Tacno gari');
      break;

    case difference <= 5:
      score += 25;
      console.log('manje od 5');
      break;

    case difference <= 10:
      score += 15;
      console.log('manje od 10');
      break;

    case difference <= 15:
      score += 10;
      console.log('manje od 15');
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
  link.classList.remove('hidden');
}


