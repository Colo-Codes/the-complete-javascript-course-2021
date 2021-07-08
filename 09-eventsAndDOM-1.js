'use strict';

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');

///////////////////////////////////////
// Modal window

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

///////////////////////////////////////
// Button scrolling

btnScrollTo.addEventListener('click', function (e) {
  // Smooth scrolling
  // ES6
  section1.scrollIntoView({ behavior: 'smooth' });
});

///////////////////////////////////////
// Page (smooth) navigation

// document.querySelectorAll('.nav__link').forEach(function (element) {
//   element.addEventListener('click', function (event2) {
//     event2.preventDefault(); // To prevent the HTML scroll to anchored section
//     const id = this.getAttribute('href'); // this === event2
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// Event delegation (to prevent repeating the listener function for each element)
// 1. Add event listener to common parent element
// 2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) { // 1.
  e.preventDefault();

  // Matching strategy (2.)
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

///////////////////////////////////////
// Tabbed component

// Avoiding creating an event listener for each of the tab buttons by using event delegation
tabsContainer.addEventListener('click', function (event) {
  // Matching strategy
  const clicked = event.target.closest('.operations__tab');

  // Guard clause
  if (!clicked) return;

  // Remove active classes
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // Active tab
  clicked.classList.add('operations__tab--active');

  // Activate content area
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
});

///////////////////////////////////////
// Tabbed component

const handleHover = function (event) {
  if (event.target.classList.contains('nav__link')) {
    const link = event.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(s => {
      if (s !== link) s.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// Using the 'bind' method to call a function with 'this' keyword equal to the opacity that we want.
nav.addEventListener('mouseover', handleHover.bind(0.5)); // 'Bind' returns a function, which has an event parameter, which is used with the 'event' argument provided by the 'addEventListener'.
nav.addEventListener('mouseout', handleHover.bind(1));

///////////////////////////////////////
// Sticky navigation

// This approach is not efficient and should be avoided (produces output each time we scroll)
// const initialCoords = section1.getBoundingClientRect();
// window.addEventListener('scroll', function () {
//   console.log(window.scrollY);
//   if (window.scrollY >= initialCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

// Using Intersection Observer API

// Example (start)
// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   })
// }

// const obsOptions = {
//   root: null,
//   threshold: 0.1
// }

// const observer = new IntersectionObserver(obsCallback, obsOptions);

// observer.observe(section1);
// Example (end)

const header = document.querySelector('.header');
const navHight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  entry.isIntersecting ? nav.classList.remove('sticky') : nav.classList.add('sticky');
}

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null, // Entire viewport
  threshold: 0,
  rootMargin: `-${navHight}px`
});

headerObserver.observe(header);

///////////////////////////////////////
// Reveal section

const sections = document.querySelectorAll('.section');

const revealSection = function (entries) {
  const [entry] = entries;
  // console.log(entry);
  // Guard clause
  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  sectionObserver.unobserve(entry.target); // Remove the observer on the section that is already showing so it stops triggering unnecessarily
};

const options = {
  root: null,
  threshold: 0.15,
};

const sectionObserver = new IntersectionObserver(revealSection, options);

sections.forEach(sec => {
  sec.classList.add('section--hidden');
  sectionObserver.observe(sec);
});

///////////////////////////////////////
// Lazy image loading

const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  // Replace img
  entry.target.src = entry.target.dataset.src;

  // Removing blur filter after the high resolution image is loaded
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img'); // Blur filter
  });

  observer.unobserve(entry.target); // Remove the observer

}

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px' // To load images before the user reaches them
});

imgTargets.forEach(img => imgObserver.observe(img));

///////////////////////////////////////
// Slider

const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  let currentSlide = 0;
  const maxSlide = slides.length - 1;
  const dotContainer = document.querySelector('.dots');


  const goToSlide = function (slide) {
    slides.forEach((s, i) => s.style.transform = `translateX(${100 * (i - slide)}%)`);
  }

  const nextSlide = function () {
    currentSlide === maxSlide ? currentSlide = 0 : currentSlide++;
    goToSlide(currentSlide);
    activateDot(currentSlide);
  };

  const prevSlide = function () {
    currentSlide === 0 ? currentSlide = maxSlide : currentSlide--;
    goToSlide(currentSlide);
    activateDot(currentSlide);
  };

  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"></button>`);
    });
  };

  const activateDot = function (slide) {
    document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));
    document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
  };

  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  }

  // Initial positions
  init();

  // Next and previous slides
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  // Arrows on keyboard
  document.addEventListener('keydown', function (e) {
    console.log(e);
    (e.key === 'ArrowLeft') && prevSlide();
    (e.key === 'ArrowRight') && nextSlide();
  });

  // Dots pagination

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      // const slide = e.target.dataset.slide;
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};

slider();

/////////////////////////////////////////////////////////
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
const header2 = document.querySelector('header'); // Element
// header2.prepend(message); // (!) IMPORTANT: Inserts or moves (if it already exists) the element
/*
<header class="header">
  <div class="cookie-message"> ... </div>
  ...
  </header>
*/
header2.append(message); // (!) IMPORTANT: Inserts or moves (if it already exists) the element
/*
<header class="header">
  ...
  <div class="cookie-message"> ... </div>
  </header>
*/
// header2.append(message.cloneNode(true)); // Creates a copy of the element and inserts it into the DOM
/*
<header class="header">
  ...
  <div class="cookie-message"> ... </div>
  <div class="cookie-message"> ... </div>
  </header>
*/
// header2.before(message); // (!) IMPORTANT: Inserts or moves (if it already exists) the element
/*
<div class="cookie-message"> ... </div>
<header class="header">
  ...
  </header>
*/
// header2.after(message); // (!) IMPORTANT: Inserts or moves (if it already exists) the element
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
/*
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
  // window.scrollTo({
  //   left: s1Coordinates.left + window.pageXOffset,
  //   top: s1Coordinates.top + window.pageYOffset,
  //   behavior: 'smooth'
  // });
  // ES6
  section1.scrollIntoView({ behavior: 'smooth' });
});
*/
// SECTION *** Types of events and event handlers ***

// Add and remove event listeners

// Add event listeners

// Advantages of addEventListener over the 'on'events:
// - It allows to define multiple listeners/handlers on the same Element, and all of them will work. If we do the same with the 'on'events, the only valid one will be the last one.
// - We can remove an event listener/handler if we don't need it any more.

const h1 = document.querySelector('h1');
/*

h1.addEventListener('mouseenter', function () {
  console.log('addEventListener: reading h1!!');
});

h1.onmouseenter = function () {
  console.log('onmouseenter: reading h1!!');
};
*/

// Listen for an event once (create and remove an event)

/*
const alertH1 = function (e) {
  console.log('addEventListener: reading h1!!');

  h1.removeEventListener('mouseenter', alertH1);
};

h1.addEventListener('mouseenter', alertH1);
*/

// Remove event after certain time has passed

const alertH1 = function (e) {
  console.log('addEventListener: reading h1!!');
};

h1.addEventListener('mouseenter', alertH1);

setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

// Adding event listeners to HTML (do not do this, use it just as a reference)

// <h1 onclick="alert('Clicked on HTML h1')">

// SECTION *** Event propagation: bubbling and capturing ***
/*
const randomInt = (min, max) => Math.floor(Math.random() * (max - min) + 1 + min);

const randomColor = () => `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
console.log(randomColor);

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('LINK', e.target, e.currentTarget);
  // -> <a class="nav__link" href="#" style="background-color: rgb(228, 238, 113);">Features</a>
  // -> <a class="nav__link" href="#" style="background-color: rgb(228, 238, 113);">Features</a>
  console.log(this === e.currentTarget);
  // -> true

  // Stop event propagation
  // e.stopPropagation();
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('LINKS', e.target, e.currentTarget);
  // -> <a class="nav__link" href="#" style="background-color: rgb(228, 238, 113);">Features</a>
  // -> <ul class="nav__links" style="background-color: rgb(28, 135, 232);">...</ul >
  console.log(this === e.currentTarget);
  // -> true
});

document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('NAV', e.target, e.currentTarget);
  // -> <a class="nav__link" href="#" style="background-color: rgb(228, 238, 113);">Features</a>
  // -> <nav class="nav" style="background-color: rgb(191, 69, 49);">...</nav>
  console.log(this === e.currentTarget);
  // -> true

  // The 'target' is where the event happens; not where the event listener is attached to.
  // The 'currentTarget' is the current event in the capturing/bubbling step.

  // If we want to listen for an event in the capture phase, we have to set the third argument of the addEventListener method to true:
  // - element`.addEventListener('click', function(){...}, **true**)`
}, false);
*/

// SECTION *** Event delegation ***

// lines 45 - 71

// SECTION *** DOM traversing ***

const myH1 = document.querySelector('h1');
// <h1>When <span class="highlight">banking</span>meets <br/> <span class="highlight">minimalist</span> </h1>

// Going down (children)

console.log(myH1.querySelectorAll('.highlight')); // It will select the child elements no matter how deep they are
// -> NodeList(2) [span.highlight, span.highlight]
console.log(myH1.childNodes); // Only direct children
// -> NodeList(9) [text, comment, text, span.highlight, text, br, text, span.highlight, text]...
console.log(myH1.children); // Only direct children. A live collection (updated on the fly)
// -> HTMLCollection(3) [span.highlight, br, span.highlight]...
console.log(myH1.firstElementChild);
// -> <span class="highlight">banking</span>
console.log(myH1.lastElementChild);
// -> <span class="highlight">minimalist</span>

// Going up (parents)

console.log(myH1.parentNode); // Direct parent
// -> <div class="header__title">...</div>
console.log(myH1.parentElement); // Direct parent
// -> <div class="header__title">...</div>
console.log(myH1.closest('.header'));
// -> <header class="header">...</header>

// Going sideways (siblings)

console.log(myH1.previousElementSibling);
// -> null
console.log(myH1.nextElementSibling);
// -> <h4>A simpler banking experience for a simpler life.</h4>
console.log(myH1.parentElement.children);
// -> HTMLCollection(4) [h1, h4, button.btn--text.btn--scroll-to, img.header__img]

// [...myH1.parentElement.children].forEach(function (el) {
//   if (el !== myH1) el.style.transform = 'scale(0.5)';
// });

// SECTION *** Lifecycle DOM events ***

document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parsed and DOM tree built!', e);
});

window.addEventListener('load', function (e) {
  console.log('HTML parsed, CSS parsed, images loaded, and DOM tree built!', e);
});

/*
window.addEventListener('beforeunload', function (e) {
  e.preventDefault();
  console.log(e);
  e.returnValue = '';
});
*/

// SECTION ***   ***
