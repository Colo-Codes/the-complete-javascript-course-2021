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

// SECTION *** Prototypal inheritance/delegation ***

// 1. We start by creating a constructor (just a regular function until it's called with the 'new' operator), based on some set of properties that we need. 

const PersonConstructor = function (firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
}

// That constructor (it's actually a function and, hence an object in JavaScript) will have a prototype (all objects in JavaScript have prototypes) which is an object that contains the constructor (that contains an object that contains the constructor, ad infinitum). So, the prototype defines the constructor. Every function in JavaScript has the 'prototype' property.

console.log(PersonConstructor.prototype);
// -> {}
console.log(PersonConstructor.prototype.constructor);
// -> [Function: PersonConstructor]
console.log(PersonConstructor.prototype.constructor.prototype);
// -> {}...

// 2. We can define methods (and properties) on the prototype of the constructor, and those methods (and properties) will be inherited (delegated) to the constructor instances that were/will be created with the 'new' operator. At this point, the constructor has properties directly defined in it, and also methods defined in its prototype (which, in time, has also a constructor (with properties) that has a prototype, ad infinitum).

PersonConstructor.prototype.fullName = function () {
    return this.firstName + ' ' + this.lastName;
}

console.log(PersonConstructor.prototype);
// -> { fullName: [Function (anonymous)] }

// 3. We can create an instance of the constructor that will inherit its properties from it and the methods and properties defined in its prototype. The properties defined in the constructor are directly accessible on the instance, and the methods defined in the prototype are also directly accessible, even though these last ones are defined on the __proto__ property of the instance, which is actually how the prototype is called in an instance and is actually a link to the methods defined in the prototype property of the constructor.

const myPerson = new PersonConstructor('John', 'Doe');
console.log(myPerson);
// -> PersonConstructor { firstName: 'John', lastName: 'Doe' }
console.log(myPerson.__proto__);
// -> { fullName: [Function(anonymous)] }
console.log(myPerson.fullName());
// -> John Doe

// The __proto__ property exists on the instance, even though we haven't defined it, because all objects in JavaScript have a prototype (our instance of the constructor is an object as well). Here, __proto__ is an object built from the 'prototype' object defined on the constructor.

// What relation has the 'prototype' property of the constructor and the '__proto__' property of the instance? __proto__ is the actual object that is used in the lookup chain to resolve methods, etc., whilst prototype is the object that is used to build __proto__ when you create an object with 'new'. So prototype is not available on the instances themselves (or other objects), but only on the constructor functions. (https://stackoverflow.com/questions/9959727/proto-vs-prototype-in-javascript)

console.log(myPerson.__proto__ === PersonConstructor.prototype);
// -> true // __proto__ = PersonConstructor.prototype

// SECTION *** Prototype chain ***

console.log(damian.__proto__);
// -> { calcAge: [Function (anonymous)], species: 'Homo Sapiens' } // This is the PersonConstructor.prototype
console.log(damian.__proto__.__proto__);
// -> [Object: null prototype] {} // This is damian.__proto__.__proto__ = PersonConstructor.__proto__ = Object.prototype
console.log(damian.__proto__.__proto__.__proto__);
// -> null // This is the Object.__proto__ = null

// Analysing arrays

const arr = [1, 2, 3, 3, 2, 1, 9]; // new Array === [...]
console.log(arr.__proto__);
// -> Object(0)[]

console.log(arr.__proto__ === Array.prototype);
// -> true

console.log(arr.__proto__.__proto__);
// -> [Object: null prototype] {}

console.log(arr.__proto__.__proto__.__proto__);
// -> null

Array.prototype.unique = function () { // Don't do this on production code
    return [...new Set(this)];
};

console.log(arr.unique());
// -> [ 1, 2, 3, 9 ]

// Analysing an h1

const h1 = document.querySelector('h1');

console.dir(h1);
// On the browser: h1 -> __proto__: HTMLHeadingElement -> __proto__: HTMLElement -> __proto__: Element -> __proto__: Node -> __proto__: EventTarget -> __proto__: Object -> null

// Analysing a function

console.dir(x => x + 1);
// On the browser: anonymous() -> __proto__: ƒ() -> __proto__: Object -> null

// SECTION *** Classes ***

// Class expression

const PersonClEx = class {
    // Body of the class
}

// Class declaration

class PersonClDe {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    // Methods will be added to the .prototype property of the constructor
    fullName() {
        console.log(this.firstName + ' ' + this.lastName);
    }

    greet() {
        console.log(`Hey ${this.firstName}!`);
    }
}

const jessica = new PersonClDe('Jessica', 'Pearson');

console.log(jessica);
// -> PersonClDe {firstName: "Jessica", lastName: "Pearson"}
jessica.fullName();
// -> Jessica Pearson
console.log(jessica.__proto__);
// -> {constructor: ƒ, fullName: ƒ}

PersonClDe.prototype.greet2 = function () {
    console.log(`Bye ${this.firstName}!`);
}
jessica.greet();
// -> Hey Jessica!
jessica.greet2();
// -> Bye Jessica!

// 1. Classes are not hoisted (we can't use them before they are declared)
// 2. Classes are first-class citizens  (we can pass them to functions and return them from functions)
// 3. Body of classes is always executed in strict mode

// SECTION *** Getters and Setters ***

const account = {
    owner: 'Jonas',
    movements: [200, 333, 555, 777],

    get latest() {
        return this.movements.slice(-1).pop();
    },

    set latest(mov) {
        this.movements.push(mov);
    }
}

console.log(account.latest);
// -> 777

account.latest = 123;
console.log(account.movements);
// -> [200, 333, 555, 777, 123]

// Using getters and setters on classes

class Person2 {
    constructor(fullName, birthYear) {
        this.fullName = fullName;
        this.birthYear = birthYear;
    }

    // Methods will be added to the .prototype property of the constructor
    age() {
        console.log(2021 - this.birthYear);
    }

    get age() {
        return 2021 - this.birthYear;
    }

    // Set (and get) a property that already exists
    set fullName(name) {
        if (name.includes(' '))
            this._fullName = name; // Can't set the value to the same variable that is being used in the constructor (stack overflow), so we define a new variable (with underscore at the start as convention, and the same name)
        else
            alert(`${name} is not a full name!`);
    }

    get fullName() {
        return this._fullName; // In the end, this works as if it were an object property
    }
}

const damian2 = new Person2('Damian Demasi', 1981);

console.log(damian2.age);
// -> 40

console.log(damian2.fullName); // Calling the getter, not the property
// -> Damian Demasi

// SECTION *** Static methods ***

// The 'from' method is a method attached to the Array constructor. We can't use that method on an array object. This is a static method.
console.log(Array.from(document.querySelectorAll('h1')));
// -> [h1]
// [1, 2, 3].from();
// -> Uncaught TypeError: [1,2,3].from is not a function

// The same happens with the 'parseInt' method
console.log(Number.parseInt('123abc;'));
// -> 123

// *** Creating a static method on a constructor

const Person3 = function (firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
}

Person3.staticHey = function () {
    console.log('Hey there!');
}

const damian3 = new Person3('Damian', 1981);

Person3.staticHey();
// -> Hey there!

// damian3.staticHey();
// -> Uncaught TypeError: damian3.staticHey is not a function

// *** Creating a static method on a class

class Person4 {
    constructor(fullName, birthYear) {
        this.fullName = fullName;
        this.birthYear = birthYear;
    }

    // Methods will be added to the .prototype property of the constructor
    age() {
        console.log(2021 - this.birthYear);
    }

    static staticHey() {
        console.log('Hey there!');
    }
}

Person4.staticHey();
// -> Hey there!