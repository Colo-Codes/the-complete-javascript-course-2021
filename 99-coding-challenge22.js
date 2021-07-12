/*
Object Oriented Programming (OOP)

Coding Challenge #3

Your tasks:
1. Use a constructor function to implement an Electric Car (called 'EV') as a child
"class" of 'Car'. Besides a make and current speed, the 'EV' also has the
current battery charge in % ('charge' property)
2. Implement a 'chargeBattery' method which takes an argument
'chargeTo' and sets the battery charge to 'chargeTo'
3. Implement an 'accelerate' method that will increase the car's speed by 20,
and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140
km/h, with a charge of 22%'
4. Create an electric car object and experiment with calling 'accelerate',
'brake' and 'chargeBattery' (charge to 90%). Notice what happens when
you 'accelerate'! Hint: Review the definiton of polymorphism �

Test data:
§ Data car 1: 'Tesla' going at 120 km/h, with a charge of 23%

GOOD LUCK
 */

'use strict';

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  return console.log(`${this.make} going to ${this.speed += 10} Km/h`);
};

Car.prototype.brake = function () {
  return console.log(`${this.make} going to ${this.speed -= 5} Km/h`);
};

// 1.
const EV = function (make, speed, charge = 0) {
  Car.call(this, make, speed);
  this.charge = charge;
}

EV.prototype = Object.create(Car.prototype); // Linking prototypes

// 2.
EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

// 3.
EV.prototype.accelerate = function () { // Polymorphism (overwriting an inherited method)
  this.speed += 20;
  this.charge--;
  return console.log(`${this.make} is going to ${this.speed} Km/h, with a charge of ${this.charge}%`);
};

// 4.
const car1 = new EV('Tesla', 100, 55);

console.log(car1);
// -> Car { make: 'Tesla', speed: 100, charge: 55 }
car1.accelerate();
// -> Tesla is going to 120 Km/h, with a charge of 54%
car1.accelerate();
// -> Tesla is going to 140 Km/h, with a charge of 53%
car1.accelerate();
// -> Tesla is going to 160 Km/h, with a charge of 52%
car1.brake(); // Goes up though the prototype chain until finds the 'brake()' method.
// -> Tesla going to 155 Km/h
car1.brake();
// -> Tesla going to 150 Km/h
car1.chargeBattery(90);
console.log(car1);
// -> Car { make: 'Tesla', speed: 150, charge: 90 }

console.log(car1.__proto__); // Proto of instance
// -> Car { chargeTo: [Function (anonymous)], accelerate: [Function (anonymous)] }
console.log(car1.__proto__.__proto__); // Proto of EV constructor
// -> { accelerate: [Function (anonymous)], brake: [Function (anonymous)] }
console.log(car1.__proto__.__proto__.__proto__); // Proto of Car constructor
// -> [Object: null prototype] {}
console.log(car1.__proto__.__proto__.__proto__.__proto__); // Proto of Object
// -> null
