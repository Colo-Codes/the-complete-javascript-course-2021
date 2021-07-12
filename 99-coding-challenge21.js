/*
Object Oriented Programming (OOP)

Coding Challenge #2

Your tasks:
1. Re-create Challenge #1, but this time using an ES6 class (call it 'CarCl')
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide
by 1.6)
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but
converts it to km/h before storing the value, by multiplying the input by 1.6)
4. Create a new car and experiment with the 'accelerate' and 'brake'
methods, and with the getter and setter.

Test data:
§ Data car 1: 'Ford' going at 120 km/h

GOOD LUCK
 */
'use strict';

// 1.
class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    return console.log(`${this.make} going to ${this.speed += 10} Km/h`);
  }

  brake() {
    return console.log(`${this.make} going to ${this.speed -= 5} Km/h`);
  }

  // 2.
  get speedUS() {
    return this.speed / 1.6;
  }

  // 3.
  set speedUS(speedMph) {
    this.speed = speedMph * 1.6;
  }
}

const car1 = new CarCl('Ford', 100);

console.log(car1);
// -> CarCl { make: 'Ford', speed: 100 }

car1.accelerate();
// -> Ford going to 110 Km/h
car1.accelerate();
// -> Ford going to 120 Km/h
car1.accelerate();
// -> Ford going to 130 Km/h
car1.brake();
// -> Ford going to 125 Km/h
car1.brake();
// -> Ford going to 120 Km/h

console.log(car1);
// -> CarCl { make: 'Ford', speed: 120 }

car1.speedUS = 100;
console.log(car1);
// -> CarCl { make: 'Ford', speed: 160 }
console.log(car1.speedUS);
// -> 100
console.log(car1.speed);
// -> 160

