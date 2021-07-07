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

// SECTION *** Creating and inserting elements ***

// createElement()
const message = document.createElement('div'); // This is a DOM object (a node)
console.log(message);
// -> div (node) and <div></div>
message.classList.add('cookie-message');
console.log(message);
// -> div.cookie-message (node) and <div class="cookie-message"></div>
message.textContent = 'We use cookies for improved functionality and analytics.';
console.log(message);
// -> div.cookie-message (node) and <div class="cookie-message">We use cookies for improved functionality and analytics.</div>
message.innerHTML = 'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';
console.log(message);
// -> div.cookie-message (node) and <div class="cookie-message">We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button></div>

// prepend(), append(), before(), after()
const header = document.querySelector('header'); // Element
// header.prepend(message); // (!) IMPORTANT: Inserts or moves (if it already exists) the element
/*
<header class="header">
  <div class="cookie-message"> ... </div>
  ...
  </header>
*/
header.append(message); // (!) IMPORTANT: Inserts or moves (if it already exists) the element
/*
<header class="header">
  ...
  <div class="cookie-message"> ... </div>
  </header>
*/
// header.append(message.cloneNode(true)); // Creates a copy of the element and inserts it into the DOM
/*
<header class="header">
  ...
  <div class="cookie-message"> ... </div>
  <div class="cookie-message"> ... </div>
  </header>
*/
// header.before(message); // (!) IMPORTANT: Inserts or moves (if it already exists) the element
/*
<div class="cookie-message"> ... </div>
<header class="header">
  ...
  </header>
*/
// header.after(message); // (!) IMPORTANT: Inserts or moves (if it already exists) the element
/*
<header class="header">
...
</header>
<div class="cookie-message"> ... </div>
*/

// insertAdjacentElement()
console.log(document.getElementById('section--1').insertAdjacentElement('afterend', document.createElement('div')));
// -> <div></div> (after the element with id == 'section--1')

// SECTION *** Deleting elements ***

document.querySelector('.btn--close-cookie').addEventListener('click', function () {
  // message.parentElement.removeChild(message); // pre-ES6
  message.remove();
});

// SECTION *** Styles ***

// Set a style
message.style.backgroundColor = '#37383d'
message.style.width = '120%';

// Get a style.
console.log(message.style.color); // We can not get styles this way, other than the (inline) styles we have already set with message.style.<style>
// -> (empty)
console.log(message.style.backgroundColor);
// -> rgb(55, 56, 61)
console.log(getComputedStyle(message).color);
// -> rgb(187, 187, 187)
message.style.height = `${Number.parseFloat(getComputedStyle(message).height) + 30}px`;
// The hight gets modified

// Changing custom style properties (also valid for any other property)
// document.documentElement.style.setProperty('--color-primary', 'orangered');

// SECTION *** Attributes ***

// Get attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
// -> Bankist logo
console.log(logo.className);
// -> nav__logo
console.log(logo.src); // (!) IMPORTANT This will show the full URL
// -> http://127.0.0.1:8080/assets/img/logo.png (computed; absolute)
console.log(logo.getAttribute('src')); // (!) IMPORTANT This will show the actual value (relative path)
// -> ./assets/img/logo.png

// Get attributes that are not standard (such as the made up 'designer' attribute)
console.log(logo.designer);
// -> undefined
console.log(logo.getAttribute('designer'));
// -> Jonas

// Set attributes
logo.alt = "Small image with company name";
logo.setAttribute('company', 'Bankist');
// -> <img src="./assets/img/logo.png" alt="Small image with company name" class="nav__logo" id="logo" designer="Jonas" company="Bankist">

// Data attributes
console.log(logo.dataset.versionNumber);
// -> 3.0 (In HTML: <img ... id = "logo" designer = "Jonas" data-version-number="3.0"/>)

// SECTION *** Classes ***

logo.classList.add('class_name');
logo.classList.remove('class_name');
logo.classList.toggle('class_name');
logo.classList.contains('class_name');

// Don't use this, because it will override all the classes that are already present
logo.className = 'I_will_override_all';

// SECTION *** Getting information about viewport scrolling and position ***

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  const s1Coordinates = section1.getBoundingClientRect();
  console.log(s1Coordinates);
  // -> DOMRect {x: 0, y: 1346.666748046875, width: 1118.666748046875, height: 1395.666748046875, top: 1346.666748046875, …}

  console.log(e.target.getBoundingClientRect());
  // -> DOMRect {x: 30, y: 760.9791870117188, width: 112.45833587646484, height: 27.33333396911621, top: 760.9791870117188, …}

  console.log('Current scroll X/Y:', window.pageXOffset, window.pageYOffset);
  // -> Current scroll X/Y: 0 744

  console.log('Viewport height/width', document.documentElement.clientHeight, document.documentElement.clientWidth);
  // -> Viewport height/width 1327 1119

  // Smooth scrolling

  // ES5
  // window.scrollTo(s1Coordinates.left + window.pageXOffset, s1Coordinates.top + window.pageYOffset);
  window.scrollTo({
    left: s1Coordinates.left + window.pageXOffset,
    top: s1Coordinates.top + window.pageYOffset,
    behavior: 'smooth'
  });
  // ES6
  // section1.scrollIntoView({behavior: 'smooth'});
});