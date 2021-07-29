// SECTION Modules: import and export

// Importing module
console.log('Importing module');
import { addToCart, totalPrice as price, tq } from './13-modules-shoppingCart.js';

// NOTE Importing everything as an object
import * as ShoppingCart from './13-modules-shoppingCart.js';

addToCart('bread', 5);

console.log(price, tq);
console.log(ShoppingCart);

ShoppingCart.addToCart('lettuce', 2);

// import add, { addToCart, totalPrice as price, tq } from './13-modules-shoppingCart.js'; // Mixing named and default exports on imports is not a good practice
import add from './13-modules-shoppingCart.js';
import { cart } from './13-modules-shoppingCart.js'; // Initially, the cart is empty

add('apple', 5); // The cart gets updated due to the 'live connection' between exports and imports
add('peanuts', 15);
add('cake', 1);
console.log(cart);
/* ->
(5) [{…}, {…}, {…}, {…}, {…}]
    0: {product: "bread", quantity: 5}
    1: {product: "lettuce", quantity: 2}
    2: {product: "apple", quantity: 5}
    3: {product: "peanuts", quantity: 15}
    4: {product: "cake", quantity: 1}
*/

// SECTION Modules: module pattern (using IIFE functions)

// // Used before ES6 and in some special cases after ES6

// // Using an IIFE
// const ShoppingCart2 = (function () {
//     const cart = [];
//     const shippingCost = 10;
//     const totalPrice = 237;
//     const totalQuantity = 23;

//     const addToCart = function (product, quantity) {
//         cart.push({ product, quantity });
//         console.log(`${quantity} ${product} was added to cart, shipping cost is ${shippingCost}`); // NOTE Thanks to closures, the addToCart method of the ShoppingCart2 object will have access to the shippingCost variable.
//     };

//     const orderStock = function (product, quantity) {
//         console.log(`${quantity} ${product} ordered from supplier`);
//     };

//     // This is the 'public API'
//     return {
//         addToCart,
//         cart,
//         totalPrice,
//         totalQuantity
//     }
// })();

// ShoppingCart2.addToCart('apple', 4);
// ShoppingCart2.addToCart('egg', 5);
// /* ->
// 4 apple was added to cart
// 5 egg was added to cart
// */
// console.log(ShoppingCart2);
// /* ->
// {cart: Array(2), totalPrice: 237, totalQuantity: 23, addToCart: ƒ}
//     addToCart: ƒ (product, quantity)
//     cart: (2) [{…}, {…}]
//     totalPrice: 237
//     totalQuantity: 23
// */
// console.log(ShoppingCart2.shippingCost); // NOTE What wasn't exported is not accessible
// // -> undefined
// console.log(ShoppingCart2.totalPrice);
// // -> 237

// SECTION CommonJS Modules

// // Export (it will not work on the browser, but it will work on NodeJS)
// export.addToCart = function (product, quantity) {
//     cart.push({ product, quantity });
//     console.log(`${quantity} ${product} was added to cart, shipping cost is ${shippingCost}`);
// };

// // Import (it will not work on the browser, but it will work on NodeJS)
// const { addToCart } = require('./13-modules-shoppingCart.js');

// SECTION Working with lodash modules and npm

import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
// import cloneDeep from 'lodash-es'; // If we are using Parcel, we could import like this (and it can also install new CommonJS modules on the fly) (WARNING This doesn't work as of 28/07/2021)

const state = {
    cart: [
        { product: 'bread', quantity: 5 },
        { product: 'apple', quantity: 4 }
    ],
    user: { loggedIn: true }
}

const stateClone = Object.assign({}, state);
state.user.loggedIn = false;
console.log(stateClone.user.loggedIn);
// -> false // Because 'stateClone' is not an actual copy, just a reference to the original object 'state'

state.user.loggedIn = true; // Back to initial state
const stateDeepClone = cloneDeep(state);
state.user.loggedIn = false;
console.log(stateDeepClone.user.loggedIn);
// -> true // Now 'stateDeepClone' is an actual copy of the 'state' object

if (module.hot) {
    module.hot.accept();
}

let i = 0;
i++
console.log(i);

class Person {
    #greeting = 'Hey';
    constructor(name) {
        this.name = name;
        console.log(`${this.#greeting}, ${this.name}`);
    }
}

const Damian = new Person('Damian');

// SECTION Polyfill

// Import everything
import 'core-js/stable';

// Import just one module
import 'core-js/stable/array/concat';

// Polyfilling async functions
import 'regenerator-runtime/runtime';
