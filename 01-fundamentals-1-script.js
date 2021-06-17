// alert('This is coming from an external script!');
console.log('This is coming from an external script!');

let myName = 'Damian';
console.log(myName);

// Testing var and let
let thisIsLet;
var thisIsVar;
const THISISCONST = 0; // Must be initialised when defined.
thisIsGlobal = ''; // Must be initialised when defined.
console.log(thisIsLet);
console.log(typeof thisIsLet);
console.log(thisIsVar);
console.log(typeof thisIsVar);
console.log(THISISCONST);
console.log(typeof THISISCONST);
console.log(thisIsGlobal);
console.log(typeof thisIsGlobal);

console.log(typeof null);

// String template literals (ES6)
const myName2 = 'Damian';
const age = 40;
const job = 'programmer';

console.log(`My name is ${myName2} and 
I'm a ${age} years old ${job}!`);

//