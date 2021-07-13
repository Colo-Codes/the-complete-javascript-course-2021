/*
Object Oriented Programming (OOP)

Coding Challenge #4

Your tasks:
1. Re-create Challenge #3, but this time using ES6 classes: create an 'EVCl'
child class of the 'CarCl' class
2. Make the 'charge' property private
3. Implement the ability to chain the 'accelerate' and 'chargeBattery'
methods of this class, and also update the 'brake' method in the 'CarCl'
class. Then experiment with chaining!

Test data:
§ Data car 1: 'Rivian' going at 120 km/h, with a charge of 23%

GOOD LUCK
 */

'use strict';

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    return console.log(`${this.make} going to ${this.speed += 10} Km/h`);
  };

  brake() {
    return console.log(`${this.make} going to ${this.speed -= 5} Km/h`);
  };

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speedMph) {
    this.speed = speedMph * 1.6;
  }
}

// 1.
class EVCl extends CarCl {
  #charge; // 2.
  constructor(make, speed, charge = 0) {
    super(make, speed);
    this.#charge = charge;
  }

  getCharge() {
    return this.#charge;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this; // 4.
  }

  accelerate() { // Polymorphism (overwriting an inherited method)
    this.speed += 20;
    this.#charge--;
    console.log(`${this.make} is going to ${this.speed} Km/h, with a charge of ${this.getCharge()}%`);
    return this; // 4.
  }
}


// Test
const car1 = new EVCl('Rivian', 120, 23);

console.log(car1);
// -> EVCl { make: 'Rivian', speed: 120 }
console.log(car1.getCharge());
// -> 23
car1.accelerate();
// -> Rivian is going to 140 Km/h, with a charge of 22%
car1.accelerate();
// -> Rivian is going to 160 Km/h, with a charge of 21%
car1.accelerate();
// -> Rivian is going to 180 Km/h, with a charge of 20%
car1.brake();
// -> Rivian going to 175 Km/h
car1.brake();
// -> Rivian going to 170 Km/h
car1.chargeBattery(90);
console.log(car1.getCharge());
// -> 90
console.log(car1.accelerate().chargeBattery(50).accelerate().chargeBattery(60));
/* ->
  Rivian is going to 190 Km/h, with a charge of 89%
  Rivian is going to 210 Km/h, with a charge of 49%
  EVCl { make: 'Rivian', speed: 210 }
*/
console.log(car1.getCharge());
// -> 60

// console.log(car1.#charge);
// -> SyntaxError: Private field '#charge' must be declared in an enclosing class