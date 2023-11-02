'use strict';
const questionElement = document.querySelector('.question');
const answerButtonsElement = document.querySelector('.answer-buttons');
const hiddenInput = document.querySelector('.hiddenInput');
const giveup = document.querySelector('.giveup');
const questionContainer = document.querySelector('.question-container');
const btnSubmit=document.querySelector('.submit');
let score = 0;

const timer = document.getElementById('timer');
let timeInterval;

let shuffeledQuestions = [];
let currentQuestionIndex = 0;

const startGame = () => {
  shuffeledQuestions = questions.sort(() => Math.random() - 0.5);
  setNextQuestion();
};

const countdown = () => {
  timer.innerHTML -= '1';
  if (timer.innerHTML === '0') outOfTime();
};

const outOfTime = () => {
  stopCountdown();
  showCorrectAnswers();
  setTimeout(() => {
    setNextQuestion();
  }, 3000);
};

const setCountdown = () => (timeInterval = setInterval(countdown, 1000));

const stopCountdown = () => {
  clearInterval(timeInterval);
  timer.innerHTML = '20';
};

const selectAnswer = (e) => {
  stopCountdown();
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  correct ? (score += 5) : (score -= 2);
  console.log(score);
  showCorrectAnswers();
  setTimeout(() => {
    setNextQuestion();
  }, 3000);
  isEnabledClick(false);
};

const showCorrectAnswers = () =>
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });

const isEnabledClick = (bool) =>
  bool
    ? answerButtonsElement.classList.remove('zero-pointer')
    : answerButtonsElement.classList.add('zero-pointer');

const setNextQuestion = () => {
  isEnabledClick(true);
  clearQuestion();
  currentQuestionIndex > shuffeledQuestions.length - 1
    ? endGame()
    : showQuestion(shuffeledQuestions[currentQuestionIndex]);
};

const showQuestion = (question) => {
  setCountdown();
  currentQuestionIndex++;
  questionElement.innerText = currentQuestionIndex + '. ' + question.question;

  question.answers.forEach((answer) => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('large-cell');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    answerButtonsElement.appendChild(button);
    button.addEventListener('click', selectAnswer);
  });
  const btnSkip = document.createElement('button');
  btnSkip.innerText = 'Ne znam';
  btnSkip.classList.add('cell');
  answerButtonsElement.appendChild(btnSkip);
  btnSkip.addEventListener('click', skipQuestion);
};

const skipQuestion = () => {
  stopCountdown();
  showCorrectAnswers();
  setTimeout(() => {
    setNextQuestion();
  }, 3000);
};

const clearQuestion = () => {
  stopCountdown();
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
};

const setStatusClass = (element, correct) => {
  correct ? element.classList.add('correct') : element.classList.add('wrong');
};

const endGame = () => {
  stopCountdown();
  timer.innerHTML = '';
  questionElement.innerHTML = 'Osvojili ste ' + score + ' poena!';
  giveup.classList.add('hidden');
  btnSubmit.classList.remove('hidden');
  hiddenInput.value = score;
};

const questions = [
  {
    question: 'Ko je smislio programski jezik C?',
    answers: [
      { text: 'Denis Riči', correct: true },
      { text: 'Bil Gejts', correct: false },
      { text: 'Džejms Gozling', correct: false },
      { text: 'Stiv Džobs', correct: false },
    ],
  },
  {
    question: 'Koje godine je izmišljen Fejsbuk?',
    answers: [
      { text: '2006', correct: false },
      { text: '2008', correct: false },
      { text: '2005', correct: false },
      { text: '2004', correct: true },
    ],
  },
  {
    question: 'Koje od navedenih tipova podataka je vrednosni?',
    answers: [
      { text: 'strukture', correct: true },
      { text: 'interfejsi', correct: false },
      { text: 'nizovi', correct: false },
      { text: 'klase', correct: false },
    ],
  },
  {
    question: 'Koji od navedenih NIJE javascript framework?',
    answers: [
      { text: 'Angular', correct: false },
      { text: '.NET', correct: true },
      { text: 'Node', correct: false },
      { text: 'React', correct: false },
    ],
  },
  {
    question: 'Za šta se koristi ključna reč "this"?',
    answers: [
      { text: 'Trenutni objekat u metodi ili konstruktoru', correct: true },
      { text: 'Referenca na trenutnu metodu', correct: false },
      { text: 'Referenca na pregaženu metodu trenutnom', correct: false },
      { text: 'Referenca na parent klasu od trenutne', correct: false },
    ],
  },

  {
    question: 'Za koju boju važi heksadecimalni kod #0000FF?',
    answers: [
      { text: 'crvena', correct: false },
      { text: 'plava', correct: true },
      { text: 'žuta', correct: false },
      { text: 'zelena', correct: false },
    ],
  },
  {
    question: 'Koja od ponuđenih je tačna sintaksa za for petlju?',
    answers: [
      { text: 'for(inkrement; inicijalizacija; provera)', correct: false },
      { text: 'for(inicijalizacija; provera; inkrement)', correct: true },
      { text: 'for(inicijalizacija; provera),inkrement', correct: false },
      { text: 'for(provera; inicijalizacija; inkrement)', correct: false },
    ],
  },
  {
    question: 'Koja je od ponuđenih osnovna klasa izuzetka?',
    answers: [
      { text: 'Try', correct: false },
      { text: 'Catch', correct: false },
      { text: 'Exception', correct: true },
      { text: 'Finally', correct: false },
    ],
  },
  {
    question: 'Po čemu se razlikuju echo i print u PHP-u?',
    answers: [
      { text: 'Nema razlike', correct: false },
      {
        text: 'Print može primiti više parametara dok echo ne može',
        correct: false,
      },
      { text: 'Print je funkcija dok echo nije', correct: false },
      {
        text: 'Echo može primiti više parametara dok print ne može',
        correct: true,
      },
    ],
  },
  {
    question: 'Koja je tačna sintaksa za deklarisanje u Javi?',
    answers: [
      { text: 'String text="text"', correct: false },
      { text: 'String "Text;', correct: false },
      { text: 'String text="text";', correct: true },
      { text: "String text='text'", correct: false },
    ],
  },
];

startGame();
