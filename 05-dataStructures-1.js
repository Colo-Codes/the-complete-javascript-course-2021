'use strict';

// Data needed for a later exercise
const flights =
    '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
    name: 'Classico Italiano',
    location: 'Via Angelo Tavanti 23, Firenze, Italy',
    categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
    starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
    mainMenu: ['Pizza', 'Pasta', 'Risotto'],

    order: function (starterIndex, mainIndex) {
        return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
    },

    openingHours: {
        thu: {
            open: 12,
            close: 22,
        },
        fri: {
            open: 11,
            close: 23,
        },
        sat: {
            open: 0, // Open 24 hours
            close: 24,
        },
    },
};

// Destructuring example

const arr = [1, 2, 3];
// Old way:
const a = arr[0];
const b = arr[1];
const c = arr[2];
console.log(a, b, c);
// New way, using destructuring:
const [x, y, z] = arr;
console.log(x, y, z);

// Working with destructuring

let [main, , secondary] = restaurant.categories;
console.log(main, secondary);
// Interchanging the values of the variables:
[main, secondary] = [secondary, main];
console.log(main, secondary);

// Receive 2 return values from a function and deconstruct them
const [starter, main2] = restaurant.order(1, 2);
console.log(starter, main2);

// Destructuring nested arrays
const nestedArr = [2, 4, [5, 6]];
const [i, , j] = nestedArr;
console.log(i, j);
const [k, l, [m, n]] = nestedArr;
console.log(k, l, m, n);

// Default destructuring values
const unknownArr = [9, 8];
const [p = 0, q = 0, r = 0, s = 0] = unknownArr; // Destructuring with default values
console.log(p, q, r, s);