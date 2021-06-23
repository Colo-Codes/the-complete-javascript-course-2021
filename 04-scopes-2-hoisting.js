// Start of Temporal Dead Zone for 'let' and 'const'
'use strict';

// SECTION *** Variables ***

console.log(me);        // undefined (hoisted)
// console.log(job);    // ReferenceError: Cannot access 'job' before initialization (not hoisted)
// console.log(year);   // ReferenceError: Cannot access 'year' before initialization (not hoisted)


var me = 'Damian';
// End of Temporal Dead Zone for 'let' and 'const'
let job = 'web developer';
const year = 1981;

// SECTION *** Functions ***

console.log(addDecl(1, 2));
// console.log(addExpr(1, 2));      // ReferenceError: Cannot access 'addExpr' before initialization
// console.log(addArrow(1, 2));     // ReferenceError: Cannot access 'addArrow' before initialization
// console.log(addExpr2(1, 2));      // TypeError: addExpr2 is not a function (it's like calling: undefined(1,2))
console.log(addExpr2);      // undefined
console.log(addArrow2);     // undefined

function addDecl(a, b) {
    return a + b;
}

const addExpr = function (a, b) {
    return a + b;
}

const addArrow = (a, b) => a + b;

var addExpr2 = function (a, b) {
    return a + b;
}

var addArrow2 = (a, b) => a + b;

// SECTION *** Common mistakes ***

console.log('--- Common mistakes ---');

console.log(numProducts); // -> undefined (falsy)

if (!numProducts) { // If the cart is empty (if it's 0, which is falsy)
    deleteShoppingCart();
}

var numProducts = 10;

function deleteShoppingCart() {
    console.log('All products deleted!!!');
}