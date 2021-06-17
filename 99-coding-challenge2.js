/*
Coding Challenge #2
Use the BMI example from Challenge #1, and the code you already wrote, and improve it.

Your tasks:
1. Print a nice output to the console, saying who has the higher BMI.The message is either "Mark's BMI is higher than John's!" or "John's BMI is higher than Mark's!"
2. Use a template literal to include the BMI values in the outputs.Example: "Mark's BMI (28.3) is higher than John's (23.9)!"

Hint: Use an if/else statement 😉 GOOD LUCK 😀
*/

let mass, height;

const markMass1 = 78;
const markHeight1 = 1.69;
const johnMass1 = 92;
const johnHeight1 = 1.95;

const markMass2 = 95;
const markHeight2 = 1.88;
const johnMass2 = 85;
const johnHeight2 = 1.76;


// Data set 1 - Mark's
mass = markMass1;
height = markHeight1;
let markBMI = mass / height ** 2;
// Data set 1 - John's
mass = johnMass1;
height = johnHeight1;
let johnBMI = mass / height ** 2;

if (markBMI > johnBMI) {
    console.log(`Data set 1: Mark's BMI (${Math.round(markBMI * 10) / 10}) is higher than John's (${Math.round(johnBMI * 10) / 10})!`);
}
else {
    console.log(`Data set 1: John's BMI (${Math.round(johnBMI * 10) / 10}) is higher than Marks's (${Math.round(markBMI * 10) / 10})!`);
}

// Data set 2 - Mark's
mass = markMass2;
height = markHeight2;
markBMI = mass / height ** 2;
// Data set 2 - John's
mass = johnMass2;
height = johnHeight2;
johnBMI = mass / height ** 2;

if (markBMI > johnBMI) {
    console.log(`Data set 2: Mark's BMI (${Math.round(markBMI * 10) / 10}) is higher than John's (${Math.round(johnBMI * 10) / 10})!`);
}
else {
    console.log(`Data set 2: John's BMI (${Math.round(johnBMI * 10) / 10}) is higher than Marks's (${Math.round(markBMI * 10) / 10})!`);
}
