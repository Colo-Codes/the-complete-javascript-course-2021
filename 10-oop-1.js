'use strict';

// SECTION *** Constructors ***

// Define a constructor function (starting with capital letter as convention). Don't use arrow functions because they handle the 'this' keyword differently.
const Person = function (firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;

    // Never do this
    // this.calcAge = function () {
    //     console.log(2021 - this.birthYear);
    // };
}

// Create an 'instance' of the constructor
const damian = new Person('Damian', 1981);
console.log(typeof damian);
// -> object
console.log(damian);
// -> Person { firstName: 'Damian', birthYear: 1981 }
console.log(Person.prototype);
// -> {constructor: ƒ}
console.log(Person.prototype.constructor);
/* ->
ƒ (firstName, birthYear) {
this.firstName = firstName;
this.birthYear = birthYear;
}
*/
console.log(damian instanceof Person);
// -> true

// The 'new' keyword triggers the call of a function in constructor mode:
// 1. A new empty object is created: {}
// 2. The constructor function is called, and 'this' is the empty object {}
// 3. The empty object {} is linked to the prototype
// 4. The function automatically returns the object (populated)

// SECTION *** Prototypes ***

// All objects in JavaScript have a prototype property. As functions are objects, they also have a prototype property.

console.log(Person.prototype); // This is not the prototype of Person, but the prototype that is going to be applied to instances of Person
// -> {constructor: ƒ}

Person.prototype.calcAge = function () {
    console.log(2021 - this.birthYear);
};

console.log(Person.prototype);
// -> {calcAge: ƒ, constructor: ƒ}

// All the Person objects, like 'damian', will have access to the 'calcAge()' method because it's defined in the prototype. This is called prototyped inheritance. If it were defined in the constructor, all the objects would have a copy of the method, wasting memory and resources.

damian.calcAge();
// -> 40

// To get the prototype of an instanced constructor ('damian' in this case):
console.log(damian.__proto__);
// -> {calcAge: ƒ, constructor: ƒ} // Actually, this is the Person.prototype

// The prototype of the 'damian' object is the prototype property of the constructor Person.
console.log(damian.__proto__ === Person.prototype);
// -> true

// 'Person.prototype' is not the prototype of Person. 'Person.prototype' is the prototype that is going to be used on instances of Person.
console.log(Person.prototype.isPrototypeOf(damian));
// -> true
console.log(Person.prototype.isPrototypeOf(Person));
// -> false

// Person.prototype should be called Person.prototypeOfLinkedObjects, to avoid confusion, but we are stuck with the first name.

// We can also assign properties to prototypes, but they will be common to all instances of the constructor.
Person.prototype.species = 'Homo Sapiens';
console.log(damian.__proto__);
// -> {species: "Homo Sapiens", calcAge: ƒ, constructor: ƒ} // Actually, this is the Person.prototype
console.log(damian.species);
// -> Homo Sapiens

// Properties and methods defined in the prototype are properties and method inherited to the instance of the constructor (the final object).
console.log(damian.hasOwnProperty('firstName'));
// -> true
console.log(damian.hasOwnProperty('species'));
// -> false
