'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements) {
  // Clean the content of the movements container
  containerMovements.innerHTML = '';
  movements.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
      <div class="movements__value">${mov}</div>
    </div>
    `;
    // Add new elements to the movements container
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

displayMovements(account1.movements);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// SECTION *** Array methods ***

let arr = ['a', 'b', 'c', 'd', 'e'];

// slice(). Returns a new array; does not mutate the original array.

console.log(arr.slice(1, 3));
// -> ["b", "c"]
console.log(arr.slice(1));
// -> ["b", "c", "d", "e"]
console.log(arr.slice(-2));
// -> ["d", "e"]
console.log(arr.slice(1, -1));
// -> ["b", "c", "d"]
console.log(arr.slice()); // Shallow copy of an array
// -> ["a", "b", "c", "d", "e"]
console.log([...arr]); // Shallow copy of an array
// -> ["a", "b", "c", "d", "e"]

// splice(). Mutates the original array (removes a slice of the original array, into a new array).
console.log(arr.splice(1, 3)); // The last argument is how many elements are going to be deleted.
// -> ["b", "c", "d"]
console.log(arr);
// -> ["a", "e"]
//Use case: remove the last element from an array:
console.log(arr);
// -> ["a", "e"]
console.log(arr.splice(-1));
// -> ["e"]
console.log(arr);
// -> ["a"]

// reverse(). Mutates the original array.
let arr2 = ['a', 'b', 'c', 'd', 'e'];

console.log(arr2.reverse());
// -> ["e", "d", "c", "b", "a"]
console.log(arr2);
// -> ["e", "d", "c", "b", "a"]

// concat(). Does not mutates the original array.
let arr3 = ['a', 'b', 'c', 'd', 'e'];
let arr4 = ['x', 'y', 'z'];

console.log(arr3.concat(arr4));
// -> ["a", "b", "c", "d", "e", "x", "y", "z"]
console.log([...arr3, ...arr4]);
// -> ["a", "b", "c", "d", "e", "x", "y", "z"]

// join(). Does not mutates the original array
console.log(arr3.join('-'));
// -> a-b-c-d-e
console.log(arr3);
// -> ["a", "b", "c", "d", "e"]

// SECTION *** Array loops ***

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

console.log('--- For ---');
for (let i = 0; i < movements.length; i++) {
  if (movements[i] > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movements[i]}`);
  }
  else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movements[i])}`);
  }
};
/* ->
--- For ---
Movement 1: You deposited 200
Movement 2: You deposited 450
Movement 3: You withdrew 400
Movement 4: You deposited 3000
Movement 5: You withdrew 650
Movement 6: You withdrew 130
Movement 7: You deposited 70
Movement 8: You deposited 1300
*/

console.log('--- For...of ---');
// for (const movement of movements) {
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  }
  else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
  }
};
/* ->
--- For...of ---
Movement 1: You deposited 200
Movement 2: You deposited 450
Movement 3: You withdrew 400
Movement 4: You deposited 3000
Movement 5: You withdrew 650
Movement 6: You withdrew 130
Movement 7: You deposited 70
Movement 8: You deposited 1300
*/

console.log('--- forEach ---');
movements.forEach((movement, i, arr) => { // function(item, index, array)
  // (!) Break and continue statements do not work in the forEach() method.
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  }
  else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
  }
});
/* ->
--- forEach ---
Movement 1: You deposited 200
Movement 2: You deposited 450
Movement 3: You withdrew 400
Movement 4: You deposited 3000
Movement 5: You withdrew 650
Movement 6: You withdrew 130
Movement 7: You deposited 70
Movement 8: You deposited 1300
*/

// SECTION *** forEach on Maps and Sets ***

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach((value, key, map) => {
  console.log(`${key}: ${value}`);
});
/* ->
USD: United States dollar
EUR: Euro
GBP: Pound sterling
*/

const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);

currenciesUnique.forEach(function (value, key, set) { // The value and the key are the same because sets don't have keys or indexes
  console.log(`${key}: ${value}`);
});
/* ->
USD: USD
GBP: GBP
EUR: EUR
*/

// SECTION *** The map() method ***

// const movements2 = [200, 450, -400, 3000, -650, -130, 70, 1300];

const eurToUsd = 1.1;

// const movementsUSD = movements.map(function (mov) {
//   return Math.trunc(mov * eurToUsd);
// });

const movementsUSD = movements.map(mov => Math.trunc(mov * eurToUsd));

console.log(movements);
console.log(movementsUSD);

const movementsDescriptions = movements.map((mov, i) => `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(mov)}`);
console.log(movementsDescriptions);