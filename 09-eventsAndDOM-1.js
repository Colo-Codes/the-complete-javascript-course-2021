'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// SECTION *** Selecting elements ***

// Select the whole HTML document (no need to use spacial selectors for this element)
console.log(document.documentElement);

// Select specific elements
console.log(document.head); // (no need to use spacial selectors for this element)
// -> <head> ... </head>
console.log(document.body); // (no need to use spacial selectors for this element)
// -> <body> ... </body>
console.log(document.querySelector('header')); // Element
// -> <header> ... </header>
console.log(document.querySelector('#logo')); // Id
// -> <img src="./assets/img/logo.png" alt="Bankist logo" class="nav__logo" id="logo">
console.log(document.querySelectorAll('section')); // Element
/* ->
NodeList(4) [section#section--1.section, section#section--2.section, section#section--3.section, section.section.section--sign-up]
0: section#section--1.section
1: section#section--2.section
2: section#section--3.section
3: section.section.section--sign-up
*/
console.log(document.querySelectorAll('.section')); // Class
/* ->
NodeList(4) [section#section--1.section, section#section--2.section, section#section--3.section, section.section.section--sign-up]
0: section#section--1.section
1: section#section--2.section
2: section#section--3.section
3: section.section.section--sign-up
*/
console.log(document.getElementById('section--1'));
// -> <section class="section" id="section--1"> ... </section>
console.log(document.getElementsByTagName('button')); // (!) IMPORTANT: Updated automatically as the DOM changes
/* ->
HTMLCollection(9)
[ button.btn--text.btn--scroll-to,
button.btn.operations__tab.operations__tab--1.operations__tab--active,
button.btn.operations__tab.operations__tab--2,
button.btn.operations__tab.operations__tab--3,
button.slider__btn.slider__btn--left,
button.slider__btn.slider__btn--right,
button.btn.btn--show-modal,
button.btn--close-modal,
button.btn ]
*/
console.log(document.getElementsByClassName('section')); // (!) IMPORTANT: Updated automatically as the DOM changes
/* ->
HTMLCollection(4)
[ section#section--1.section,
section#section--2.section,
section#section--3.section,
section.section.section--sign-up,
section--1: section#section--1.section,
section--2: section#section--2.section,
section--3: section#section--3.section ]
*/