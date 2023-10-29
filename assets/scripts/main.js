'use strict';
const closeModalBtn = document.querySelector('.button-x');
const modal = document.querySelector('.modal');
const loginBtn = document.querySelector('#login');

const closingModal=()=> modal.classList.add('hidden');
const openingModal=()=> modal.classList.remove('hidden');

closeModalBtn.addEventListener('click', closingModal);

loginBtn.addEventListener('click', openingModal);


