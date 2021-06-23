'use strict';

// Just 'this' by itself

console.log(typeof this, this); // Empty object (NodeJS) or Window object (in Browser)

// Regular functions (definition and expression)

const calcAge = function (birthYear) {
    console.log(2021 - birthYear);
    console.log(this); // undefined (in 'strict mode') (*1)
}
calcAge(1981);

function calcAge2(birthYear) {
    console.log(2021 - birthYear);
    console.log(this); // undefined (in 'strict mode') (*1)
}
calcAge2(1981);

// Arrow function (using the lexical 'this' keyword)

const calcAge3 = (birthYear) => {
    console.log(2021 - birthYear);
    console.log(this); // Empty object (NodeJS) or Window object (in Browser)
}
calcAge3(1981);

// Method

console.log('-------------');

const damian = {
    birthYear: 1981,
    age: function (currentYear) {
        console.log(this);  // The object calling the method (damian), not the object in which we wrote the method
        return currentYear - this.birthYear;
    }
}
console.log(damian.age(2021));

const celeste = {
    birthYear: 1986
}
celeste.age = damian.age;
console.log(celeste.age(2021)); // The 'this' keyword now point to the 'celeste' object

const f = damian.age; // copy the function to the 'f' variable
// f(); // The 'this' keyword is undefined (in 'strict mode')  (*1)


// Method with arrow function

console.log(this.inexistentVariable);

var firstName = 'Celeste';

const person = {
    firstName: 'Damian',
    birthYear: 1981,
    calcAge: function () {
        console.log(this);
        console.log(2021 - this.birthYear);
    },
    greet: () => console.log(`Hey, ${this.firstName}!!`) // The 'this' is undefined (for Node) or 'Celeste' (for browser), because is attached to the global scope (empty on NodeJS or Window on browser), and the variable firstName is undefined (in node) or 'Celeste' (in browser)
}
person.greet();

// Method with a function inside it

//      Before ES6
const person2 = {
    firstName: 'Damian',
    birthYear: 1981,
    calcAge: function () {
        console.log(this);
        console.log(2021 - this.birthYear);

        const self = this; // The 'self' or 'that' variable will get the value of 'this' so 'this' can be used in the internal function
        const isMillennial = function () {
            // console.log(this); // undefined (in 'strict mode') (*1)
            // console.log(this.birthYear >= 1981 && this.birthYear <= 1996);
            console.log(self);
            console.log(self.birthYear >= 1981 && self.birthYear <= 1996);
        };
        isMillennial();
    },
}
person2.calcAge();

//      After ES6 (use the arrow function behaviour of the 'this' keyword)
const person3 = {
    firstName: 'Damian',
    birthYear: 1981,
    calcAge: function () {
        console.log(this);
        console.log(2021 - this.birthYear);

        const isMillennial = () => {
            console.log(this); // On arrow functions, 'this' is inherited from the parent's scope
            console.log(this.birthYear >= 1981 && this.birthYear <= 1996);
        };
        isMillennial();
    },
}
person3.calcAge();
