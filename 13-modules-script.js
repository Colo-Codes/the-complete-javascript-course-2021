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