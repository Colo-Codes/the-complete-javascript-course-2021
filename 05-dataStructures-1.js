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

// *** Short-circuiting operators

// The || operator will return the first truthy value of all operands, or the last falsy value if all operands are falsy.
// The && operator will return the first falsy value of all operands, or the last truthy value is all operands are truthy.

// The short-circuiting is based in truthy or falsy values
console.log(10 || 'string');        // -> 10
console.log(false || 'string');     // -> string
console.log('' || 'string');        // -> string
console.log(true || 0);             // -> true
console.log(undefined || null);     // -> null

console.log(undefined || 0 || '' || 'string' || 40 || null);     // -> string

const object1 = {
    key1: 'value1'
}
// Using conditional
console.log(object1.key1 ? object1.key1 : 10);  // -> value1
// Using short-circuit
console.log(object1.key1 || 10);                // -> value1

console.log(10 && 'string');        // -> string
console.log(false && 'string');     // -> false
console.log('' && 'string');        // -> (empty)
console.log(true && 0);             // -> 0
console.log(undefined && null);     // -> undefined

console.log(undefined && 0 && '' && 'string' && 40 && null);     // -> undefined

const object2 = {
    method1: function () { console.log('I\'m method 1!') }
}
// Using conditional
if (object2.method1) {
    object2.method1();                  // -> I'm method 1!
}
// Using short-circuit
object2.method1 && object2.method1();   // -> I'm method 1!

// *** Nullish coalescing operator and optional chaining ***

// Object elements

const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

for (const day of days) {
    const open = restaurant.openingHours[day]?.open ?? 'sorry, closed';
    console.log(`On ${day}, we are open at: ${open}`);
}

// Methods

console.log(restaurant.order?.(0, 1) ?? 'Method does not exist');
// -> [ 'Focaccia', 'Pasta' ]
console.log(restaurant.nonExistentMethod?.(0, 1) ?? 'Method does not exist');
// -> Method does not exist

// Arrays

const users = [{ name: 'Damian', age: 40 }];

console.log(users[0]?.name ?? 'User array empty');
// -> Damian
console.log(users[1]?.name ?? 'User array empty');
// -> User array empty

// *** Looping Objects ***

// Looping property names

const properties = Object.keys(openingHours);
console.log(properties);
// -> [ 'thu', 'fri', 'sat' ]

let openStr = `We are open on ${properties.length} days: `;
for (const day of properties) {
    openStr += `${day}, `
}
console.log(openStr);
// -> We are open on 3 days: thu, fri, sat,

// Looping values

const values = Object.values(openingHours);
console.log(values);
/*
->
[
  { open: 12, close: 22 },
  { open: 11, close: 23 },
  { open: 0, close: 24 }
]
*/
let hoursStr = '';
for (const hours of values) {
    hoursStr += `${hours.open} - `
}
console.log(hoursStr);
// -> 12 - 11 - 0 -

// Entries: key-values

const entries = Object.entries(openingHours);
console.log(values);
/*
->
[
  { open: 12, close: 22 },
  { open: 11, close: 23 },
  { open: 0, close: 24 }
]
*/

for (const x of entries) {
    console.log(x);
}
/*
->
[ 'thu', { open: 12, close: 22 } ]
[ 'fri', { open: 11, close: 23 } ]
[ 'sat', { open: 0, close: 24 } ]
*/

for (const [key, { open, close }] of entries) {
    console.log(`On ${key} we open at ${open} and close at ${close}`);
}
/*
->
On thu we open at 12 and close at 22
On fri we open at 11 and close at 23
On sat we open at 0 and close at 24
*/

// *** Sets ***

const ordersSet = new Set(['Pasta', 'Pizza', 'Pizza', 'Risotto', 'Pizza', 'Pasta']); // The argument of Set must be iterable
console.log(ordersSet);
// -> Set(3) { 'Pasta', 'Pizza', 'Risotto' }

console.log(new Set('Damian'));
// -> Set(5) { 'D', 'a', 'm', 'i', 'n' }

// Check the size of a Set
console.log(ordersSet.size);
// -> 3

// Check if contains a value
console.log(ordersSet.has('Pasta'));
// -> true
console.log(ordersSet.has('Bread'));
// -> false

// Add element to the set
ordersSet.add('Garlic bread');
ordersSet.add('Garlic bread');
console.log(ordersSet);
// -> Set(4) { 'Pasta', 'Pizza', 'Risotto', 'Garlic bread' }

// Delete an element from a set
ordersSet.delete('Risotto');
console.log(ordersSet);
// -> Set(3) { 'Pasta', 'Pizza', 'Garlic bread' }

// Delete all elements from a set
// ordersSet.clear();
// console.log(ordersSet);
// -> Set(0) {}

// Looping on a Set
for (const order of ordersSet)
    console.log(order);
/* ->
Pasta
Pizza
Garlic bread
*/

// Set use case: remove duplicates on arrays

const staff = ['Chef', 'Waiter', 'Manager', 'Waiter', 'Chef', 'Waiter'];
const positions = new Set(staff);
console.log(positions);
// -> Set(3) { 'Chef', 'Waiter', 'Manager' }
const positionsArr = [...new Set(staff)];
console.log(positionsArr);
// -> [ 'Chef', 'Waiter', 'Manager' ]

// Counting how many unique positions are
console.log(new Set(staff).size);
// -> 3

// *** Maps ***

const rest = new Map();
rest.set('name', 'Classico Italiano');
rest.set(1, 'Firenze, Italy');
console.log(rest.set(2, 'Lisbon, Portugal'));
/* ->
Map(3) {
  'name' => 'Classico Italiano',
  1 => 'Firenze, Italy',
  2 => 'Lisbon, Portugal'
}
*/
// We can chain multiple set's, because each one creates a map as a result
rest.set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic']).set('open', 11).set('close', 23).set(true, 'We are open :D').set(false, 'We are closed :(');
console.log(rest.get('name'));
// -> Classico Italiano
console.log(rest.get(true));
// -> We are open :D
console.log(rest.get(1));
// -> Firenze, Italy

// Cool use case
const currentTime = 21;
console.log(rest.get(rest.get('open') <= currentTime && rest.get('close') >= currentTime));
// -> We are open :D

// Check if a map has a key
console.log(rest.has('categories'));
// -> true

// Delete a key-value pair
console.log(rest.delete(2));
// -> true
console.log(rest);
/* ->
Map(7) {
  'name' => 'Classico Italiano',
  1 => 'Firenze, Italy',
  'categories' => [ 'Italian', 'Pizzeria', 'Vegetarian', 'Organic' ],
  'open' => 11,
  'close' => 23,
  true => 'We are open :D',
  false => 'We are closed :('
}
*/

// Get the size of a map
console.log(rest.size);
// -> 7

// Delete a whole map
// rest.clear();
// console.log(rest);
// -> Map(0) {}

// Using arrays as keys

rest.set([1, 2], 'Test');
console.log(rest);
/* ->
Map(8) {
  'name' => 'Classico Italiano',
  1 => 'Firenze, Italy',
  'categories' => [ 'Italian', 'Pizzeria', 'Vegetarian', 'Organic' ],
  'open' => 11,
  'close' => 23,
  true => 'We are open :D',
  false => 'We are closed :(',
  [ 1, 2 ] => 'Test'
}
*/

// But this will not work, because the array [1,2] we are using to retrieve the key is different from the [1,2] that was used to create it; they are in different locations of the heap:
console.log(rest.get([1, 2]));
// -> undefined

// In order to solve this, we need to use the same array, and this is accomplished by using a variable:
const arr2 = [1, 2];
rest.set(arr2, 'Test2');
console.log(rest.get(arr2));
// -> Test2
console.log(rest);
/* ->
Map(9) {
  'name' => 'Classico Italiano',
  1 => 'Firenze, Italy',
  'categories' => [ 'Italian', 'Pizzeria', 'Vegetarian', 'Organic' ],
  'open' => 11,
  'close' => 23,
  true => 'We are open :D',
  false => 'We are closed :(',
  [ 1, 2 ] => 'Test',
  [ 1, 2 ] => 'Test2'
}
*/

// Creating a Map with arrays

const question = new Map([
    ['question', 'What is the best programming language in the world?'],
    [1, 'C'],
    [2, 'Java'],
    [3, 'JavaScript'],
    ['correct', 3],
    [true, 'Correct! 🎉'],
    [false, 'Incorrect... 😢']
]);

console.log(question);
/* ->
Map(7) {
  'question' => 'What is the best programming language in the world?',
  1 => 'C',
  2 => 'Java',
  3 => 'JavaScript',
  'correct' => 3,
  true => 'Correct! 🎉',
  false => 'Incorrect... 😢'
}
*/

// Convert an object to a map

console.log(Object.entries(openingHours)); // This returns an array of arrays
const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap);
/* ->
Map(3) {
  'thu' => { open: 12, close: 22 },
  'fri' => { open: 11, close: 23 },
  'sat' => { open: 0, close: 24 }
}
*/

// Quiz app
console.log(question.get('question'));
for (const [key, value] of question) { // Just like with Object.entries(), but in this case the map is already an iterable
    if (typeof key === 'number') console.log(`Answer ${key}: ${value}`);
}
// --- Asking user input
// const answer = Number(prompt('Your answer:')) // Check on browser
// --- End of input
// console.log(question.get((answer === question.get('correct'))));
/* ->
What is the best programming language in the world?
Answer 1: C
Answer 2: Java
Answer 3: JavaScript
Correct! 🎉
*/

// Convert a map to array
console.log([...question]);
/* ->
[
  [ 'question', 'What is the best programming language in the world?' ],
  [ 1, 'C' ],
  [ 2, 'Java' ],
  [ 3, 'JavaScript' ],
  [ 'correct', 3 ],
  [ true, 'Correct! 🎉' ],
  [ false, 'Incorrect... 😢' ]
]
*/

// Entries, keys, and values of maps
console.log(question.entries());
/* ->
[Map Entries] {
  [ 'question', 'What is the best programming language in the world?' ],
  [ 1, 'C' ],
  [ 2, 'Java' ],
  [ 3, 'JavaScript' ],
  [ 'correct', 3 ],
  [ true, 'Correct! 🎉' ],
  [ false, 'Incorrect... 😢' ]
}
*/
console.log(question.keys());
// -> [Map Iterator] { 'question', 1, 2, 3, 'correct', true, false }
console.log(question.values());
/* ->
[Map Iterator] {
  'What is the best programming language in the world?',
  'C',
  'Java',
  'JavaScript',
  3,
  'Correct! 🎉',
  'Incorrect... 😢'
}
*/

console.log([...question.entries()]); // same as [...question]
/* ->
[
  [ 'question', 'What is the best programming language in the world?' ],
  [ 1, 'C' ],
  [ 2, 'Java' ],
  [ 3, 'JavaScript' ],
  [ 'correct', 3 ],
  [ true, 'Correct! 🎉' ],
  [ false, 'Incorrect... 😢' ]
]
*/
console.log([...question.keys()]);
// -> [ 'question', 1, 2, 3, 'correct', true, false ]
console.log([...question.values()]);
/* ->
[
  'What is the best programming language in the world?',
  'C',
  'Java',
  'JavaScript',
  3,
  'Correct! 🎉',
  'Incorrect... 😢'
]
*/

// *** Strings ***

const airline = 'Qantas Australia';
const plane = 'A320';
const newPlane = 'A320neo';
const passengerName = 'dAmiAn';
const passengerLastName = '  Demasi  \n';
const passengerFullName = 'Damian Demasi';
const passengerEmail = 'damian.demasi.1@gmail.com';
const priceGB = '288,97£';
const announcement = 'All passengers come to boarding door 23. Boarding door 23!';
const shortMessage = 'Go to gate 23!';
const weatherMessage = 'Bad weather! All flights delayed...';

console.log(plane[0]);
// -> A

// Methods
console.log(plane.length);
// -> 4
console.log(airline.indexOf('alia'));
// -> 12
console.log(airline.lastIndexOf('a'));
// -> 15
console.log(airline.slice(airline.indexOf('A')));
// -> Australia
console.log(airline.slice(airline.indexOf('A'), airline.lastIndexOf('a') + 1));
// -> Australia
console.log(airline.slice(-6));
// -> tralia
console.log(airline.slice(3, -6));
// -> tas Aus
console.log(airline.toLowerCase());
// -> qantas australia
console.log(airline.toUpperCase());
// -> QANTAS AUSTRALIA
console.log(passengerLastName.trim());
// -> Demasi
console.log(priceGB.replace('£', '$').replace(',', '.'));
// -> 288.97$
// console.log(announcement.replace('door', 'gate')); // To replace all 'door' occurrences, we should use a regular expression
// -> All passengers come to boarding gate 23. Boarding door 23!
console.log(announcement.replace(/door/g, 'gate'));
// -> All passengers come to boarding gate 23. Boarding gate 23!
console.log(newPlane.includes('neo'));
// -> true
console.log(newPlane.startsWith('A3'));
// -> true
console.log(newPlane.endsWith('320'));
// -> false
console.log(passengerFullName.split(' '));
// -> [ 'Damian', 'Demasi' ]
const [first, last] = passengerFullName.split(' ');
console.log(first, last);
// -> Damian Demasi
console.log(['Mr.', first, last.toUpperCase()].join(' '));
// -> Mr. Damian DEMASI
console.log(shortMessage.padStart(30, '#'));
// -> ################Go to gate 23!
console.log(shortMessage.padEnd(30, '#'));
// -> Go to gate 23!################
console.log(weatherMessage.repeat(5));
// -> Bad weather! All flights delayed...Bad weather! All flights delayed...Bad weather! All flights delayed...Bad weather! All flights delayed...Bad weather! All flights delayed...


console.log(passengerName);
// -> dAmiAn
console.log(passengerName[0].toUpperCase() + passengerName.slice(1).toLowerCase());
// -> Damian

const checkMiddleSeat = function (seat) {
    let message;
    // B and E are middle seats
    seat = seat.slice(-1);
    (seat === 'B' || seat === 'E') ? message = 'Middle seat :(' : message = 'Not a middle seat!';
    console.log(message);
}

checkMiddleSeat('11B');
checkMiddleSeat('112C');
checkMiddleSeat('1E');

console.log(passengerEmail);
// -> damian.demasi.1@gmail.com
let loginEmail = '  Damian.Demasi.1@Gmail.Com  \n';
console.log(loginEmail === passengerEmail ? 'Login correct!' : 'Login failed...');
// -> Login failed...
let cleanLoginEmail = loginEmail.toLowerCase().trim();
console.log(cleanLoginEmail === passengerEmail ? 'Login correct!' : 'Login failed...');
// -> Login correct!

const capitalisator = function (name) {
    const nameArr = name.split(' ');
    const newNameArr = [];

    for (const item of nameArr) {
        newNameArr.push(item.replace(item[0], item[0].toUpperCase()));
    }

    const capitalisedName = newNameArr.join(' ');
    return capitalisedName;
}
const fullName = 'celeste maricel fiori';
console.log(capitalisator(fullName));
// -> Celeste Maricel Fiori

const maskCreditCardNumber = function (number) {
    const str = String(number);
    const newStr = str.slice(-4).padStart(str.length, '*');
    return newStr;
}

console.log(maskCreditCardNumber(1111222233334444));
// -> ************4444