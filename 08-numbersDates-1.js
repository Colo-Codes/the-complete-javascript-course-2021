'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2021-07-03T23:36:17.929Z',
    '2021-07-04T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2021-06-30T18:49:59.371Z',
    '2021-07-04T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
// Functions

const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) => Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);
  console.log(daysPassed);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  else {
    // const day = `${date.getDate()}`.padStart(2, 0);
    // const month = `${date.getMonth() + 1}`.padStart(2, 0);
    // const year = date.getFullYear();
    // return `${day}/${month}/${year}`;
    return new Intl.DateTimeFormat(locale).format(date);
  }
}

const formatCurrency = (value, locale, currencyCode) => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1
      } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formatCurrency(mov, acc.locale, acc.currency)}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

  // labelBalance.textContent = `${acc.balance.toFixed(2)}€`;
  labelBalance.textContent = formatCurrency(acc.balance, acc.locale, acc.currency);
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  // labelSumIn.textContent = `${incomes.toFixed(2)}€`;
  labelSumIn.textContent = formatCurrency(incomes, acc.locale, acc.currency);

  const out = Math.abs(acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0));
  // labelSumOut.textContent = `${Math.abs(out).toFixed(2)}€`;
  labelSumOut.textContent = formatCurrency(out, acc.locale, acc.currency);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  // labelSumInterest.textContent = `${interest.toFixed(2)}€`;
  labelSumInterest.textContent = formatCurrency(interest, acc.locale, acc.currency);
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
// Event handlers
let currentAccount;

// FIXME Fake always logged in
currentAccount = account1;
updateUI(currentAccount);
containerApp.style.opacity = 100;
// FIXME Fake always logged in

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]
      }`;
    containerApp.style.opacity = 100;

    // Current date
    const now = new Date();
    // labelDate.textContent = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, 0)}/${now.getFullYear()}, ${String(now.getHours()).padStart(2, 0)}:${String(now.getMinutes()).padStart(2, 0)}`; // day/month/year, hour:minutes
    const options = { // Mon, 5 July 2021, 01:38 pm
      hour: '2-digit',
      minute: '2-digit',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      // weekday: 'short',
    }
    // const locale = navigator.language;
    const locale = currentAccount.locale;
    labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(now);

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Add transfer date
    const transferDate = new Date();
    currentAccount.movementsDates.push(transferDate.toISOString());
    receiverAcc.movementsDates.push(transferDate.toISOString());

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);

    // Add transfer date
    const transferDate = new Date();
    currentAccount.movementsDates.push(transferDate.toISOString());

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// SECTION *** Numbers ***

console.log(23 === 23.0);
// -> true (JavaScript numbers are always stored as double precision floating point numbers)

console.log(0.1 + 0.2);
// -> 0.30000000000000004 (due to binary number representation rounding errors)

// Converting strings to numbers

console.log(Number('49'));
// -> 49

console.log(+'49');
// -> 49

// Parsing a string to number

console.log(Number.parseInt('30px', 10));
// -> 30

console.log(Number.parseInt('ee30', 10));
// -> NaN

console.log(Number.parseFloat('2.5rem'));
// -> 2.5

console.log(Number.parseInt('2.5rem'));
// -> 2

// Check for NaN and numbers

console.log(Number.isNaN(20));
// -> false
console.log(Number.isNaN('20'));
// -> false (it is just a value)
console.log(Number.isNaN(+'20x'));
// -> true
console.log(Number.isNaN(10 / 0));
// -> false (infinity) (this could be a problem, so we should use the Number.isFinite() method instead)

console.log(Number.isFinite(20));
// -> true
console.log(Number.isFinite('20'));
// -> false (it is just a value)
console.log(Number.isFinite(+'20x'));
// -> false
console.log(Number.isFinite(10 / 0));
// -> false

console.log(Number.isInteger(39));
// -> true
console.log(Number.isInteger(39.0));
// -> true
console.log(Number.isInteger('39'));
// -> false
console.log(Number.isInteger(39.99));
// -> false

// Mathematical operations (other than +, -, *, /, **)

console.log(Math.sqrt(25));
// -> 5
console.log(25 ** (1 / 2));
// -> 5
console.log(25 ** (1 / 3));
// -> 2.924017738212866
console.log(8 ** (1 / 3));
// -> 2

console.log(Math.max(3, 5, 9, 10, 39, 5));
// -> 39
console.log(Math.max(3, 5, 9, '10', 39, 5));
// -> 39
console.log(Math.max(3, 5, 9, '10px', 39, 5));
// -> NaN

console.log(Math.min(3, 5, 9, 10, 39, 5));
// -> 3

console.log(Math.PI);
// -> 3.141592653589793

// Random numbers

console.log(Math.random());
// -> 0.002104932715161212 (between 0 and 1 (not inclusive))

const randomInt = (min, max) => Math.floor(Math.random() * (max - min) + 1) + min;
console.log(randomInt(10, 20));
// -> 19 (between 10 and 20 inclusive)

// Rounding integers

console.log(Math.trunc(39.99));
// -> 39

console.log(Math.round(39.99));
// -> 40
console.log(Math.round(39.11));
// -> 39

console.log(Math.ceil(39.99));
// -> 40
console.log(Math.ceil(39.11));
// -> 40

console.log(Math.floor(39.99));
// -> 39
console.log(Math.floor(39.11));
// -> 39

console.log(Math.trunc(-39.99));
// -> -39
console.log(Math.floor(-39.99)); // This one is better
// -> -40

// Rounding decimals (floats)

console.log((2.7).toFixed(0));
// -> 3 (string)
console.log((2.7).toFixed(3));
// -> 2.700 (string)
console.log((2.345).toFixed(2));
// -> 2.35 (string)
console.log(+(2.345).toFixed(2));
// -> 2.35 (number)
console.log(Number((2.345).toFixed(2)));
// -> 2.35 (number)

// Reminder operator

console.log(5 % 2);
// -> 1 (5 = 2 * 2 + 1)
console.log(5 / 2);
// -> 2.5

const isEven = n => n % 2 === 0;
console.log(isEven(8));
// -> true
console.log(isEven(9));
// -> false

// SECTION *** Dates and time ***

// Create date

const now2 = new Date();
console.log(now2);
// -> Mon Jul 05 2021 11:13:33 GMT+0930 (Australian Central Standard Time)

console.log(new Date('Jul 11 2021 11:11:11'));
// -> Sun Jul 11 2021 11:11:11 GMT+0930 (Australian Central Standard Time)
console.log(new Date(account1.movementsDates[0])); // '2019-11-18T21:31:17.178Z'
// -> Tue Nov 19 2019 08:01:17 GMT+1030 (Australian Central Daylight Time)
console.log(new Date(2022, 0, 24, 4, 30, 59));
// -> Mon Jan 24 2022 04:30:59 GMT+1030 (Australian Central Daylight Time)
console.log(new Date(2022, 0, 32)); // Auto-correction 
// -> Tue Feb 01 2022 00:00:00 GMT+1030 (Australian Central Daylight Time)

console.log(new Date(0));
// -> Thu Jan 01 1970 09:30:00 GMT+0930 (Australian Central Standard Time)
console.log(new Date(3 * 24 * 60 * 60 * 1000)); // 3 days -> 3 * 24 * 60 * 60 * 1000 = 259200000 (timestamp)
// -> Sun Jan 04 1970 09:30:00 GMT+0930 (Australian Central Standard Time)
console.log(new Date(1625450173000)); // Epoch * 1000 milliseconds
// -> Mon Jul 05 2021 11:26:13 GMT+0930 (Australian Central Standard Time)

console.log('--- ---');

// Working with dates

// Get date methods
const future = new Date(2023, 11, 30, 12, 12);
console.log(future);
//-> Sat Dec 30 2023 12:12:00 GMT+1030 (Australian Central Daylight Time)
console.log(future.getFullYear()); // Don't use getYear()
// -> 2023
console.log(future.getYear()); // Do not use this one
// -> 123 (2023 = 1900 + 123)
console.log(future.getMonth()); // Zero based
// -> 11 (December, because it's zero based)
console.log(future.getDate()); // Day of month
// -> 30
console.log(future.getDay()); // Day of week (zero based)
// -> 6 (Saturday)
console.log(future.getHours());
// -> 12
console.log(future.getMinutes());
// -> 12
console.log(future.getSeconds());
// -> 0
console.log(future.toISOString());
// -> 2023-12-30T01:42:00.000Z
console.log(future.toDateString());
// -> Sat Dec 30 2023
console.log(future.toLocaleDateString());
// -> 30/12/2023
console.log(future.toLocaleString());
// -> 30/12/2023, 12:12:00
console.log(future.toLocaleTimeString());
// -> 12:12:00

// Get timestamp
console.log(future.getTime()); // Timestamp (Epoch * 1000 milliseconds)
// -> 1703900520000
console.log(Date.now()); // Timestamp (Epoch * 1000 milliseconds)
// -> 1625451005656

// Set date methods (one for each of the above)
console.log(future.setFullYear(2039));
// -> 2208822120000
console.log(future);
// -> Fri Dec 30 2039 12:12:00 GMT+1030 (Australian Central Daylight Time)

console.log('--- ---');

// Operations with dates

const future2 = new Date(2023, 11, 30, 12, 12);
console.log(+future2);
// -> 1703900520000
console.log(Number(future2));
// -> 1703900520000

const calcDaysPassed = (date1, date2) => Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);
console.log(calcDaysPassed(new Date(2023, 10, 30), new Date(2023, 11, 2)));
// -> 2
console.log(calcDaysPassed(new Date(2023, 10, 30), new Date(2023, 11, 2, 10, 30)));
// -> 2.4375

// SECTION *** Date API (Intl) ***

const now3 = new Date();
const options = { // Mon, 5 July 2021, 01:38 pm
  hour: '2-digit',
  minute: '2-digit',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  weekday: 'short',
}
// Manual definition
// labelDate.textContent = new Intl.DateTimeFormat('es-AR', options).format(now3); // http://www.lingoes.net/en/translator/langcode.htm
// -> lun, 5 de julio de 2021 13:42

// Definition from user's browser
const locale = navigator.language;
console.log(locale);
// -> en-AU
// labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(now3);
// -> Mon, 5 July 2021, 01:42 pm

// SECTION *** Number API (Intl) ***

const num = 1234567.89;

const options2 = {
  // style: 'unit',
  // style: 'percent',
  style: 'currency',
  // unit: 'kilometer-per-hour',
  // unit: 'celsius',
  currency: 'AUD',
  // useGrouping: false,
}

console.log('US:        ', new Intl.NumberFormat('en-US', options2).format(num));
// -> US:         A$1,234,567.89
console.log('Germany:   ', new Intl.NumberFormat('de-DE', options2).format(num));
// -> Germany:    1.234.567,89 AU$
console.log('Australia: ', new Intl.NumberFormat('en-AU', options2).format(num));
// -> Australia:  $1,234,567.89


