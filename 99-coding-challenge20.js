/*
Object Oriented Programming (OOP)

Coding Challenge #1

Your tasks:
1. Use a constructor function to implement a 'Car'. A car has a 'make' and a
'speed' property. The 'speed' property is the current speed of the car in
km/h
2. Implement an 'accelerate' method that will increase the car's speed by 10,
and log the new speed to the console
3. Implement a 'brake' method that will decrease the car's speed by 5, and log
the new speed to the console
4. Create 2 'Car' objects and experiment with calling 'accelerate' and
'brake' multiple times on each of them

Test data:
§ Data car 1: 'BMW' going at 120 km/h
§ Data car 2: 'Mercedes' going at 95 km/h

GOOD LUCK
 */
'use strict';

// 1. 

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

// 2.

Car.prototype.accelerate = function () {
  return console.log(`${this.make} going to ${this.speed += 10} Km/h`);
};

// 3.

Car.prototype.brake = function () {
  console.log(`${this.make} going to ${this.speed -= 5} Km/h`);
};

// 4.

const car1 = new Car('BMW', 100);
const car2 = new Car('Mercedes', 110);

console.log(car1);
// -> Car { make: 'BMW', speed: 100 }
console.log(car2);
// -> Car { make: 'Mercedes', speed: 110 }

car1.accelerate();
// -> BMW going to 110 Km/h
car1.accelerate();
// -> BMW going to 120 Km/h
console.log(car1);
// -> Car { make: 'BMW', speed: 120 }

car2.brake();
// -> Mercedes going to 105 Km/h
car2.brake();
// -> Mercedes going to 100 Km/h
car2.brake();
// -> Mercedes going to 95 Km/h
console.log(car2);
// -> Car { make: 'Mercedes', speed: 95 }