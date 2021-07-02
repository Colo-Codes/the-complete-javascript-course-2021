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

const displayMovements = function (movements, sort = false) {
  // Clean the content of the movements container
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements; // We use the slice() to create a copy of the array so the original one is not mutated

  movs.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
      <div class="movements__value">${mov}€</div>
    </div>
    `;
    // Add new elements to the movements container
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// displayMovements(account1.movements);

const calcDisplayBalance = (acc) => {
  acc.balance = acc.movements.reduce((accum, mov) => accum + mov);
  labelBalance.textContent = `${acc.balance}€`;

  return balance;
}

// calcDisplayBalance(account1.movements);

const calcDisplaySummary = (currentAccount) => {
  const setSummary = (option) => currentAccount.movements.filter(mov => option === 'in' ? mov >= 0 : mov < 0).reduce((accum, mov) => accum + mov);

  labelSumIn.textContent = `${setSummary('in')}€`;
  labelSumOut.textContent = `${Math.abs(setSummary('out'))}€`;

  // Interest paid on each deposit (if it's grater than 1€)
  const interest = currentAccount.movements.filter(mov => mov >= 0).map(deposit => deposit * currentAccount.interestRate / 100).filter(interest => interest >= 1).reduce((accum, deposit) => accum + deposit);

  labelSumInterest.textContent = `${interest}€`;
}

// calcDisplaySummary(account1.movements);


const createUsernames = function (accs) {
  accs.forEach(acc => {
    acc.username = acc.owner.toLowerCase().split(' ').map(name => name[0]).join('');
    console.log(acc.username);
  });
};

createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);
  // Display balance
  calcDisplayBalance(acc);
  // Display summary
  calcDisplaySummary(acc);
};

// SECTION *** Event handlers ***

let currentAccount;

// User login

btnLogin.addEventListener('click', function (event) {
  // Prevent form from submitting
  event.preventDefault();

  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Clean login form
    inputLoginUsername.value = inputLoginPin.value = '';
    // Remove focus on login form inputs
    inputLoginUsername.blur();
    inputLoginPin.blur();
    // Display UI and welcome message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;

    // Update UI
    updateUI(currentAccount);

    containerApp.style.opacity = 100;
  }
  else {
    console.log('Wrong user or PIN');
  }
});

// Transfers

btnTransfer.addEventListener('click', function (event) {
  // Prevent form from submitting
  event.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value);
  console.log(receiverAcc, amount);

  if (amount > 0 && currentAccount.balance >= amount && receiverAcc && currentAccount.username !== receiverAcc?.username) {
    // Transferring amounts
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    updateUI(currentAccount);

  }

  // Clean transfer form
  inputTransferAmount.value = inputTransferTo.value = '';
  inputTransferAmount.blur();
  inputTransferTo.blur();
});

// Loan

btnLoan.addEventListener('click', function (event) {
  // Prevent form from submitting
  event.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);

    updateUI(currentAccount);
  }

  // Clean close form
  inputLoanAmount.value = '';
  inputLoanAmount.blur();
})

// Close account

btnClose.addEventListener('click', function (event) {
  // Prevent form from submitting
  event.preventDefault();

  if (inputCloseUsername.value === currentAccount.username && Number(inputClosePin.value) === currentAccount.pin) {
    // Delete account
    const indexToDelete = accounts.findIndex(acc => acc.username === currentAccount.username);
    accounts.splice(indexToDelete, 1);

    // Hide UI
    containerApp.style.opacity = 0;

    console.log(accounts);
  }

  // Clean close form
  inputCloseUsername.value = inputClosePin.value = '';
  inputCloseUsername.blur();
  inputClosePin.blur();
});

// Sort movements

let sortedState = false;

btnSort.addEventListener('click', function (event) {
  event.preventDefault();

  displayMovements(currentAccount.movements, !sortedState);
  sortedState = !sortedState;
});

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

// Example

const owner = 'Steven Thomas Williams';

const username = owner.toLowerCase().split(' ').map(name => name[0]).join(''); // Using map()
console.log(username);
// -> stw

const username2 = owner.toLowerCase().split(' ').reduce((total, name) => total + name[0], ''); // Using reduce()
console.log(username2);
// -> stw

// SECTION *** The filter() method ***

const movements2 = [5000, 3400, -150, -790, -3210, -1000, 8500, -30];

const deposits = movements2.filter(mov => mov >= 0);
const withdrawals = movements2.filter(mov => mov < 0);

console.log(deposits);
// -> [5000, 3400, 8500]
console.log(withdrawals);
// -> [-150, -790, -3210, -1000, -30]

// SECTION *** The reduce() method ***

const movements3 = [5000, 3400, -150, -790, -3210, -1000, 8500, -30];

const balance = movements3.reduce((accumulator, current, i) => {
  console.log(`Iteration ${i}: ${accumulator}`);
  return accumulator + current;
}); // No initial value -> first element used as initial value
/* ->
Iteration 1: 5000
Iteration 2: 8400
Iteration 3: 8250
Iteration 4: 7460
Iteration 5: 4250
Iteration 6: 3250
Iteration 7: 11750
*/

console.log(balance);
// -> 11720

// Maximum value

const maximum = movements3.reduce((accum, curr) => accum < curr ? curr : accum);

console.log(maximum);

// SECTION *** Chaining methods ***

console.log(movements);

const totalDepositUDS = movements.filter(mov => mov >= 0).map(mov => mov * eurToUsd).reduce((accum, mov) => accum + mov);

// If we want to know the array value that each method is producing (for debugging purposes)
// const totalDepositUDS = movements.filter((mov, i, arr) => {
//   console.log(arr);
//   return mov >= 0
// }).map((mov, i, arr) => {
//   console.log(arr);
//   return mov * eurToUsd
// }).reduce((accum, mov, i, arr) => {
//   console.log(arr);
//   return accum + mov
// });

console.log(totalDepositUDS);

// SECTION *** The find() method ***

const firstWithdrawal = movements.find(mov => mov < 0);

console.log(firstWithdrawal);
// -> -400

// Use case: find an object inside an array

const account = accounts.find(acc => acc.owner === 'Jessica Davis');

console.log(account);
// -> {owner: "Jessica Davis", movements: Array(8), interestRate: 1.5, pin: 2222, username: "jd"}

// Equivalent for...of
for (const acc of accounts) {
  if (acc.owner === 'Jessica Davis') {
    console.log(acc);
    break;
  }
}

// SECTION *** The some() and every() methods ***

// *** some() ***

// Checks for equality
console.log(movements.includes(-130));
// -> true

// Checks for a condition
const areAnyDeposits = movements.some(mov => mov > 0);
console.log(areAnyDeposits);
// -> true

// *** every() ***

console.log(movements.every(mov => mov > 0));
// -> false
console.log(account4.movements.every(mov => mov > 0));
// -> true

// SECTION *** Separate callback ***

const deposit = mov => mov > 0;

console.log('With separate callback: ', movements.every(deposit));
// -> With separate callback:  false
console.log('With separate callback: ', movements.some(deposit));
// -> With separate callback:  true

// SECTION *** The flat() and flatMap() methods ***

// flat()

const arr_1 = [0, 1, 2, [3, 4]];

console.log(arr_1.flat());
// -> [0, 1, 2, 3, 4]

const arr_2 = [0, 1, 2, [3, 4, [5, 6, [7, 8[9, 10]]]]];

console.log(arr_2.flat());
// -> [0, 1, 2, 3, 4, [5, 6, [7, 8, [9, 10]]]]
console.log(arr_2.flat(1));
// -> [0, 1, 2, 3, 4, [5, 6, [7, 8, [9, 10]]]]
console.log(arr_2.flat(2));
// -> [0, 1, 2, 3, 4, 5, 6, [7, 8, [9, 10]]]
console.log(arr_2.flat(3));
// -> [0, 1, 2, 3, 4, 5, 6, 7, 8, [9, 10]]

// flatMap()

const accountMovements = accounts.map(acc => acc.movements);
console.log(accountMovements);
/* ->
[
  [200, 450, -400, 3000, -650, -130, 70, 1300],
  [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  [200, -200, 340, -300, -20, 50, 400, -460],
  [430, 1000, 700, 50, 90]
]
*/

const allMovements = accountMovements.flat();
console.log(allMovements);
// -> [200, 450, -400, 3000, -650, -130, 70, 1300, 5000, 3400, -150, -790, -3210, -1000, 8500, -30, 200, -200, 340, -300, -20, 50, 400, -460, 430, 1000, 700, 50, 90]

const overallBalance = allMovements.reduce((balance, mov) => balance + mov);
console.log(overallBalance);
// -> 17840

const overallBalance2 = accounts.map(acc => acc.movements).flat().reduce((balance, mov) => balance + mov);
console.log(overallBalance2);
// -> 17840

const overallBalance3 = accounts.flatMap(acc => acc.movements).reduce((balance, mov) => balance + mov);
console.log(overallBalance3);
// -> 17840

// SECTION *** Sort arrays ***

// sort() (!) WARNING: it mutates the original array

const myArr_1 = ['a', 'B', 'A', 'x', 'Y', 'z', 0, 543, 9, -1, -50, -1000];
console.log(myArr_1.sort());
// -> [-1, -1000, -50, 0, 543, 9, "A", "B", "Y", "a", "x", "z"] // It sorts the array as its items were strings.
console.log(myArr_1);
// -> [-1, -1000, -50, 0, 543, 9, "A", "B", "Y", "a", "x", "z"]

console.log(movements);
// -> [200, 450, -400, 3000, -650, -130, 70, 1300]
// console.log(movements.sort());
// -> [-130, -400, -650, 1300, 200, 3000, 450, 70]

// Compare A and B: returning a <= 0 means sort() should keep order: A, B
// Compare A and B: returning a > 0 means sort() should switch order: B, A
console.log(movements.sort((a, b) => {
  if (a > b)
    return 1;
  if (b > a)
    return -1;
}));
// -> [-650, -400, -130, 70, 200, 450, 1300, 3000]

// Is the same as:
console.log(movements.sort((a, b) => a - b));
// -> [-650, -400, -130, 70, 200, 450, 1300, 3000]

console.log(movements.sort((a, b) => b - a));
// -> [3000, 1300, 450, 200, 70, -130, -400, -650]

// SECTION *** More ways of creating and filling arrays ***

console.log([1, 2, 3, 4, 5, 6, 7]);
// -> [1, 2, 3, 4, 5, 6, 7]
console.log(new Array(1, 2, 3, 4, 5, 6, 7));
// -> [1, 2, 3, 4, 5, 6, 7]

// Empty array

const myArr_2 = new Array(7);
console.log(myArr_2);
// -> [empty × 7]

// fill() method

myArr_2.fill(1);
console.log(myArr_2);
// -> [1, 1, 1, 1, 1, 1, 1]

myArr_2.fill(2, 1, 6);
console.log(myArr_2);
// -> [1, 2, 2, 2, 2, 2, 1]

myArr_2.fill(3, 4);
console.log(myArr_2);
// -> [1, 2, 2, 2, 3, 3, 3]

// Array.from()

const myArr_3 = Array.from({ length: 7 }, () => 5);
console.log(myArr_3);
// -> [5, 5, 5, 5, 5, 5, 5]

const myArr_4 = Array.from({ length: 7 }, (current, i) => i + 1);
console.log(myArr_4);
// -> [1, 2, 3, 4, 5, 6, 7]

labelBalance.addEventListener('click', function () {
  // const movementsUI = Array.from(document.querySelectorAll('.movements__value')).map(element => Number(element.textContent.replace('€', '')));
  const movementsUI = Array.from(document.querySelectorAll('.movements__value'), element => Number(element.textContent.replace('€', '')));
  console.log(movementsUI);
  // for user 'js' -> [1300, 70, -130, -650, 3000, -400, 450, 200]

  const movementsUI2 = [...document.querySelectorAll('.movements__value')].map(element => Number(element.textContent.replace('€', '')));
  console.log(movementsUI2);
  // for user 'js' -> [1300, 70, -130, -650, 3000, -400, 450, 200]

})