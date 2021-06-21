'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsOpenModal = document.querySelectorAll('.show-modal');

console.log(btnsOpenModal);

const closeModal = () => {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}

const openModal = () => {
    modal.classList.remove('hidden'); // Do not use the dot here
    overlay.classList.remove('hidden'); // Do not use the dot here
}

for (let i = 0; i < btnsOpenModal.length; i++)
    btnsOpenModal[i].addEventListener('click', openModal); // Do not use parenthesis (call the function) because we need the actual function, not its value

btnCloseModal.addEventListener('click', closeModal); // Do not use parenthesis (call the function) because we need the actual function, not its value

overlay.addEventListener('click', closeModal); // Do not use parenthesis (call the function) because we need the actual function, not its value