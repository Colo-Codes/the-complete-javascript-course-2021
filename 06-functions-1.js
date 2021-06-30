'use strict';

// SECTION *** Default values ***

const bookings = [];

const createBooking = function (flightNum, numPassengers = 1, price = 199 * numPassengers) { // ES6

    // ES5 default values
    // numPassengers = numPassengers || 1;
    // price = price || 199;

    const booking = {
        flightNum,      // Enhanced Object Literals
        numPassengers,  // Enhanced Object Literals
        price           // Enhanced Object Literals
    };
    console.log(booking);
    bookings.push(booking);
}

createBooking('LH123');
createBooking('LH123', 2, 800);
createBooking('LH123', 2);
createBooking('LH123', 5);
createBooking('LH123', undefined, 1000); // Skipping an argument (ES6)

// SECTION *** Passing arguments: value vs reference ***

const flight = 'LH456';
const damian = {
    fullName: 'Damian Demasi',
    passport: 123456789
};

const checkIn = function (flightNum, passenger) {
    flightNum = 'LH999'; // Flight was reassigned by external source
    passenger.name = 'Mr. ' + damian.fullName; // Mutable: a modification in the copy of an object will have impact in the original object

    if (passenger.passport === 123456789) { // Passport number from external source
        // alert('Checked in!');  // uncomment this
    } else {
        // alert('Wrong passport!');  // uncomment this
    }
};

checkIn(flight, damian);
console.log(flight, damian); // flight stays the same, whilst damian gets updated

const newPassport = function (person) {
    person.passport = 100000000 + Math.trunc(Math.random() * 100000000);
}

newPassport(damian); // WARNING: in this case, the same object is being modified by two functions, something that should be avoided
// When we pass an object to a function as an argument, it looks like we are passing a reference, but actually is a value (is the memory address of the object in the Heap, which looks like a reference).
checkIn(flight, damian);
console.log(flight, damian);

// SECTION *** First-Class and Higher-Order Functions ***

// First-class functions
const oneWord = function (str) {
    return str.replace(/ /g, '').toLowerCase();
}

const upperFirstWord = function (str) {
    const [first, ...others] = str.split(' ');
    return [first.toUpperCase(), ...others].join(' ');
}

// Higher-order function
const transformer = function (str, fn) {
    console.log(`Original string:    ${str}`);
    console.log(`Transformed string: ${fn(str)}`);
    console.log(`Transformed by: ${fn.name}`); // Function property (because they are objects)
}

transformer('JavaScript is the best!', upperFirstWord);
/* ->
Original string:    JavaScript is the best!
Transformed string: JAVASCRIPT is the best!
Transformed by: upperFirstWord
*/

transformer('JavaScript is the best!', oneWord);
/* ->
Original string:    JavaScript is the best!
Transformed string: javascriptisthebest!
Transformed by: oneWord
*/

const high5 = function () {
    // alert('🖐'); // uncomment this
}

// document.body.addEventListener('click', high5); // Uncomment this // The higher-order function (addEventListener) calls the event handler callback function (high5)

// Higher-order returning a function

const greet = function (greeting) {
    return function (name) {
        console.log(`${greeting} ${name}`);
    }
}

const greetHey = greet("Hey");
console.log(greetHey);
/* ->
ƒ (name) {
    console.log(`${greeting} ${name}`);
}
*/
greetHey('Damian');
// -> Hey Damian
greetHey('Celeste');
// -> Hey Celeste

greet('Hello')('John'); // Calling both functions in a sible statement
// -> Hello John

// Another example (using arrow functions)

const myCombo = adjective => noun => console.log(`This is a ${adjective} ${noun}`);

myCombo('green')('dog');
// -> This is a green dog
myCombo('beautiful')('code');
// -> This is a beautiful code

// SECTION *** The call and apply methods ***

const lufthansa = {
    airline: 'Lufthansa',
    iataCode: 'LH',
    bookings: [],
    book(flightNum, name) { // Enhanced Object Literals
        console.log(`${name} booked a seat on ${this.airline}, flight ${this.iataCode}${flightNum}`);
        this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
    }
};

lufthansa.book(123, 'Damian Demasi');
// -> Damian Demasi booked a seat on Lufthansa, flight LH123
lufthansa.book(456, 'John Doe');
// -> John Doe booked a seat on Lufthansa, flight LH456

const europeWings = {
    airline: 'EuropeWings',
    iataCode: 'EW',
    bookings: []
}

const book = lufthansa.book;

// We need to define where does the 'this' keyword points to:

// Using 'call' method (the first argument is the object to which the 'this' keyword points to)

book.call(europeWings, 32, 'Sarah Connor');
// -> Sarah Connor booked a seat on EuropeWings, flight EW32
console.log(europeWings);
/* ->
{
  airline: 'EuropeWings',
  iataCode: 'EW',
  bookings: [ { flight: 'EW32', name: 'Sarah Connor' } ]
}
*/
book.call(lufthansa, 123, 'T1000');
// -> T1000 booked a seat on Lufthansa, flight LH123
console.log(lufthansa);
/* ->
{
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [
    { flight: 'LH123', name: 'Damian Demasi' },
    { flight: 'LH456', name: 'John Doe' },
    { flight: 'LH123', name: 'T1000' }
  ],
  book: [Function: book]
}
*/

// Using 'apply' method

const swiss = {
    airline: 'Swiss Air Line',
    iataCode: 'LX',
    bookings: []
}

const flightData = [123, 'Marty McFly']; // The 'apply' method uses an array as arguments

book.apply(swiss, flightData);
// -> Marty McFly booked a seat on Swiss Air Line, flight LX123
console.log(swiss);
/* ->
{
  airline: 'Swiss Air Line',
  iataCode: 'LX',
  bookings: [ { flight: 'LX123', name: 'Marty McFly' } ]
}
*/

// Using 'call' method with an array

book.call(swiss, ...flightData);
// -> Marty McFly booked a seat on Swiss Air Line, flight LX123

// Using 'bind' method

const bookEW = book.bind(europeWings); // 'this' is bound to the 'europeWings' object
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);

bookEW(999, 'Dr. Emmet Brown');
// -> Dr. Emmet Brown booked a seat on EuropeWings, flight EW999

const bookEX777 = book.bind(europeWings, 777); // Both, the 'this' keyword and the first argument, are bound
bookEX777('Han Solo');
// -> Han Solo booked a seat on EuropeWings, flight EW777
bookEX777('Chewbacca');
// -> Chewbacca booked a seat on EuropeWings, flight EW777

// Using event listeners

lufthansa.planes = 300;
lufthansa.buyPlane = function () {
    console.log(this);
    this.planes++;
    console.log(this.planes);
}

document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane.bind(lufthansa)); // We don't use 'call' because that method will return a value, and we actually need a function to use as callback.

// Using bind to implement partial application (without setting the 'this' keyword)

const addTax = (rate, value) => value + value * rate;

console.log(addTax(0.1, 200));
// -> 220

const addTaxVAT = addTax.bind(null, .21); // As the function has no 'this' keyword, we bind the 'null' value in its place

console.log(addTaxVAT(100));
// -> 121

// Challenge

const addTaxVAT2 = rate => value => value + value * rate;
console.log(addTaxVAT2(.21)(100));

// SECTION *** Immediately Invoked Function Expressions (IIFE) ***

(function () {
    console.log('This will never run again!');
})();

(() => console.log('This will (also) never run again!'))();

// SECTION *** Closure ***

const secureBooking = function () {
    let passengerCount = 0;

    return function () {
        passengerCount++;
        console.log(`${passengerCount} passengers`);
    };
};

const booker = secureBooking();

booker();
// -> 1 passengers
booker();
// -> 2 passengers
booker();
// -> 3 passengers

console.dir(booker); // Print the closure
/* ->
ƒ anonymous()
    ...
    [[Scopes]]: Scopes[3] // This is an internal property that we cannot access with our code
    0: Closure (secureBooking) {passengerCount: 3}
    1: Script {…}
    2: Global {…}
*/

// Another example (1)

let f;

const g = function () {
    const a = 20;
    f = function () {
        console.log(a * 2);
    };
};

const h = function () {
    const b = 100;
    f = function () {
        console.log(b * 2);
    };
};

g();
f();
// -> 40
console.dir(f);
// -> Closure (g) {a: 20}

h();
f();
// -> 200
console.dir(f);
// -> Closure (h) {b: 100}

// Another example (2)

const boardPassengers = function (n, wait) {
    const PerGroup = n / 3;

    setTimeout(function () {
        console.log(`We are now boarding all ${n} passengers`);
        console.log(`There are 3 groups, each with ${PerGroup} passengers`);
    }, wait * 1000);

    console.log(`Will start boarding in ${wait} seconds`);
};

const perGroup = 1000; // The function inside the setTimeout function is not using this variable, but the one in the closure.

boardPassengers(180, 3);
/* ->
Will start boarding in 3 seconds
We are now boarding all 180 passengers
There are 3 groups, each with 60 passengers
*/