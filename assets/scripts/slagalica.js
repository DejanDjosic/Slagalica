'use strict';

const btnSubmit = document.querySelector('.cell');
const charCellsArray = Array.from(document.querySelectorAll('.charcell'));
const display = document.querySelector('.display');
const checkWordButton = document.querySelector('.check-word');
const btnBackSpace = document.querySelector('.backspace');
const giveUp = document.querySelector('.giveup');
const modal = document.querySelector('.modal');
const modalMessage = document.querySelector('.modal-message');
const hiddenInput = document.querySelector('.hiddenInput');
const displayArray = [];
let score = 0;
const charsArray = ['O', 'I', 'Š', 'V', 'A', 'T', 'A', 'O', 'V', 'U', 'P', 'T'];
const possibleWords = [
  'UOPŠTAVATI',
  'OTPUTOVA',
  'ŠAVOVI',
  'PUT',
  'UPAO',
  'ŠAV',
  'VAŠI',
  'PUŠTATI',
  'PIVO',
  'VATA',
  'VAŠ',
  'PUTA',
  'PIVA',
  'UTIŠAVA',
  'UTIŠAVAO',
  'UŠIVATI',
  'PATIO',
  'POŠTA',
  'POŠTU',
  'TAPŠI',
  'PUŠI',
  'TOPOVI',
  'TOP',
  'AUTO',
  'PUŠIO',
  'OVU',
  'POŠTOVATI',
  'TAŠI',
  'VOŠTI',
  'ATI',
  'AT',
  'TA',
  'ŠAPAT',
  'ŠIVATI',
  'TATA',
  'OVI',
  'OVO',
  'TIP',
  'ŠUT',
  'POŠAO',
  'AŠOV',
  'UŠI',
  'TUP',
  'OVA',
  'TAT',
  'TAŠTA',
  'PUŠTA',
  'OPUŠTA',
  'OTPUŠAVATI',
  'OTPUŠAVA',
  'OPUŠTATI',
  'OPUŠTAVA',
  'PIŠA',
  'TUŠ',
  'VOŠTATI',
  'PITA',
  'UPITAVA',
  'UPITA',
  'UPITAŠ',
  'OPAT',
  'UOPŠTAVA',
  'ŠUPA',
  'ŠTIT',
  'ŠTIVO',
  'UŠTIP',
  'ŠAPA',
  'UVATIO',
  'PAT',
  'UPIT',
  'ŠTAP',
  'TOPOT',
  'PAŠA',
  'ŠOU',
  'ŠIP',
  'UVO',
  'UPITAO',
  'VAŠA',
  'ŠAPUTATI',
  'POVATATI',
  'POVIŠAVA',
  'PUTOVATI',
  'ŠAPTAO',
  'ŠAPUTAO',
  'UŠIVAO',
  'VAT',
  'ŠAPTATI',
  'ŠTAPOVA',
  'ŠTAPOVI',
  'OPUŠTAO',
  'OTAPATI',
  'OTPUŠTA',
  'PIŠTAVO',
  'POŠTOVA',
  'PUTOVAO',
  'TAPŠATI',
  'TIPOVAO',
  'UPIŠAVA',
  'UPIŠAO',
  'UTAPAO',
  'UTAPA',
  'UTAPATI',
];

const computerWord = 'UOPŠTAVATI';

const timer = document.getElementById('timer');

const countdown = () => {
  timer.innerHTML -= '1';
  if (timer.innerHTML === '0') outOfTime();
};

const outOfTime = () => {
  clearInterval(timeInterval);
  alert('ponestalo je vremena');
  submit();
};
const timeInterval = setInterval(countdown, 1000);
const stopCountdown = () => clearInterval(timeInterval);

const addID = () =>
  charCellsArray.forEach((element, i) => {
    element.innerHTML = charsArray[i];
    element.setAttribute('id', element.innerHTML);
  });

addID();

charCellsArray.map((button) => {
  button.addEventListener('click', (e) => {
    typing(e.target);
  });
});

const typing = (target) => {
  displayArray.push(target.innerText);
  display.innerHTML += target.innerText;
  target.classList.add('zero-pointer');
  clearStatusClass();
};

const backspace = () => {
  if (display.innerHTML) {
    let removed = displayArray.pop();
    charCellsArray.forEach((element) => {
      if (element.id === removed) element.classList.remove('zero-pointer');
    });
    display.innerHTML = '';
    displayArray.forEach((element) => {
      display.innerHTML += element;
    });
  }
  clearStatusClass();
};

btnBackSpace.addEventListener('click', backspace);

const checkWord = () => {
  if (possibleWords.includes(display.innerHTML)) {
    checkWordButton.classList.add('correct');
    return true;
  } else {
    checkWordButton.classList.add('wrong');
    return false;
  }
};

checkWordButton.addEventListener('click', checkWord);

const makeModal=(bool)=>{
modal.classList.remove('hidden');
const title=document.createElement('h1');
if(bool)
{
    title.innerHTML=`Vaša reč je ${display.innerText}`;
    calculateScore();
}
else
title.innerHTML=`Ne prihvatamo reč ${display.innerText}`;
modalMessage.appendChild(title);
const subtitle=document.createElement('h2');
subtitle.innerHTML = ` Osvojili ste ${score} poena!. <br> Naša reč je "${computerWord}"`;
modalMessage.append(subtitle);
}

const calculateScore = () => score=displayArray.length * 2;

const submit = () => {
  if (display.innerHTML !== '') {
    checkWord()?makeModal(true):makeModal(false);
    endGame();
    giveUp.classList.add('hidden');
    hiddenInput.value = score;
  }
};

btnSubmit.addEventListener('click', submit);

const clearStatusClass = () => {
  checkWordButton.classList.remove('wrong');
  checkWordButton.classList.remove('correct');
};

const endGame = () => {
  stopCountdown();
  charCellsArray.forEach((element) => {
    element.classList.add('zero-pointer');
  });
  checkWordButton.classList.add('zero-pointer');
  btnBackSpace.classList.add('zero-pointer');
  btnSubmit.classList.add('zero-pointer');
};
