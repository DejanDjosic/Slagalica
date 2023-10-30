const modal=document.querySelector('.modal');
const btnEnd=document.querySelector('.btnEnd');
const btnNo=document.querySelector('.btnNo');

const switchModal=()=>modal.classList.contains('hidden')?modal.classList.remove('hidden'):modal.classList.add('hidden');


btnNo.addEventListener('click',switchModal);
btnEnd.addEventListener('click',switchModal);