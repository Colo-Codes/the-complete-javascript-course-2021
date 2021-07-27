// Exporting module
console.log('Exporting module');

// In modules, variables defined at top level scope are local to the module, not global (can't be used on other modules importing this module).
const shippingCost = 10;
export const cart = [];

// NOTE Exports need to be at top level scope, otherwise they won't work.
// NOTE This is a 'named export' (This is the 'Public API')
export const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} was added to cart`);
};

const totalPrice = 237;
const totalQuantity = 23;

export { totalPrice, totalQuantity as tq };

export default function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} was added to cart`);
};