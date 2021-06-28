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