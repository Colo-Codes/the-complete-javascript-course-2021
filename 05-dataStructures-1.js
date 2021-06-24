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

    orderDelivery: function ({ starterIndex, mainIndex, time, address }) { // Deconstructing a single object (as parameter)
        console.log(
            `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
        );
    },

    orderPasta: function (ing1, ing2, ing3) {
        console.log(`Your pasta order is ready! Deliciously made with ${ing1}, ${ing2} and ${ing3}`);
    },

    orderPizza: function (mainIngredient, ...otherIngredients) {
        console.log('Main ingredient:', mainIngredient);
        console.log('Other ingredients:', otherIngredients);
    }
};

// *** Array destructuring ***

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

// *** Object destructuring ***

// We need to use variable names that exactly match the property names in the object (the order is not important because an object is not iterative)
const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);

// Using variables with different names:
const { name: restaurantName, openingHours: restaurantHours, categories: restaurantCategories } = restaurant;
console.log(restaurantName, restaurantHours, restaurantCategories);

// Using variables with different names and default values:
const { menuNotPresent: menuX = ['noMenu'], starterMenu: starters = ['noStarters'] } = restaurant;
console.log(menuX, starters);

// Mutating variables
let a1 = 0;
let b1 = 0;
const obj = { a1: 10, b1: 20, c1: 30 };
({ a1, b1 } = obj); // We need to include parenthesis because otherwise the '{' and '}' will be interpreted as code blocks.
console.log(a1, b1);

// Nested objects
const { fri: { open, close } } = openingHours;
console.log(open, close);

// Deconstructing an object inside a method
restaurant.orderDelivery({
    time: '22:30',
    address: 'Via del Sole, 21',
    mainIndex: 1,
    starterIndex: 3
});

// *** Spread operator ***

const array = [7, 8, 9];
const newBadArray = [1, 2, 7, 8, 9];
console.log(newBadArray);
const newGoodArray = [1, 2, ...array]; // The '...' operator outputs the elements of the array
console.log(newGoodArray);
console.log(...newGoodArray);

const newMenu = [...restaurant.mainMenu, 'Gnocci']; // This is a new array, not an alteration of the original one
console.log(restaurant.mainMenu);
console.log(newMenu);

// Making a shallow copy of an array
const mainMenuCopy = [...restaurant.mainMenu];
console.log(restaurant.mainMenu);
console.log(mainMenuCopy);

// Join arrays
const newJoinedArray = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(newJoinedArray);

// Spread operator on iterables (strings, arrays, maps, sets (objects are not iterable, but they allow working with spread operator)
const myName = 'Damian';
const myNameLetters = [...myName, ' ', 'D.'];
console.log(myNameLetters);

// Spread on function parameters
const ingredients = [
    // prompt('Let\'s make pasta! Ingredient 1?'), prompt('Ingredient 2?'), prompt('Ingredient 3?')
];
console.log('Ingredients:', ingredients);
restaurant.orderPasta(...ingredients);

// Spread operator on objects
const newRestaurant = { founder: 'Damian', ...restaurant, foundedIn: 2021 };
console.log(newRestaurant);

// Spread operator on an object to copy it (behaves like Object.assign({}, object))
const restaurantCopy = { ...restaurant };
restaurantCopy.name = 'Crazy Ravioli';
console.log(restaurantCopy.name);
console.log(restaurant.name);

// *** Rest operator ***

// The '...' operator, when used to the right of the '=' operator, is the 'spread' operator
const arrX = [1, 2, ...[3, 4]];
console.log(arrX);
// The '...' operator, when used to the left of the '=' operator, is the 'rest' operator
const [e, f, ...others] = [1, 2, 3, 4, 5];
console.log(e, f, others);

// Combining spread and rest
const [pizza, , risotto, ...otherFood] = [...restaurant.mainMenu, ...restaurant.starterMenu]; // The rest element must be the last element
console.log(pizza, risotto, otherFood);

// Objects
const { sat, ...weekDays } = restaurant.openingHours;
console.log(sat, weekDays);

// Function (using rest arguments)
const add = function (...numbers) { // Rest arguments
    let sum = 0;
    for (let i = 0; i < numbers.length; i++) {
        sum += numbers[i]
    }
    return sum;
}
console.log(add(1, 2, 3, 4, 5));
console.log(add(1, 2, 3, 4, 5, 10, 20, 30));

const v = [6, 6, 6];
console.log(add(...v));

// Method
restaurant.orderPizza('cheese', 'mushrooms', 'onion', 'olives');