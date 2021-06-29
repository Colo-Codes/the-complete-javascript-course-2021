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
        alert('Checked in!');
    } else {
        alert('Wrong passport!');
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
    alert('🖐');
}

document.body.addEventListener('click', high5); // The higher-order function (addEventListener) calls the event handler callback function (high5)