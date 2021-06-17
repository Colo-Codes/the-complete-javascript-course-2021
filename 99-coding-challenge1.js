/*
Coding Challenge #1
Mark and John are trying to compare their BMI (Body Mass Index), which is calculated using the formula:
BMI = mass / height ** 2 = mass / (height * height) (mass in kg and height in meter).

Your tasks:
1. Store Mark's and John's mass and height in variables
2. Calculate both their BMIs using the formula (you can even implement both
versions)
3. Create a Boolean variable 'markHigherBMI' containing information about
whether Mark has a higher BMI than John.

Test data:
§ Data 1: Marks weights 78 kg and is 1.69 m tall. John weights 92 kg and is 1.95 m tall.
§ Data 2: Marks weights 95 kg and is 1.88 m tall. John weights 85 kg and is 1.76 m tall.

GOOD LUCK 😀
*/

let mass, height;
let markHigherBMI;

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
console.log("Data set 1: Mark's BMI:", markBMI);
// Data set 1 - John's
mass = johnMass1;
height = johnHeight1;
let johnBMI = mass / height ** 2;
console.log("Data set 1: John's BMI:", johnBMI);

markHigherBMI = markBMI > johnBMI;
console.log("Is Mark's BMI higher?", markHigherBMI);

// Data set 2 - Mark's
mass = markMass2;
height = markHeight2;
markBMI = mass / height ** 2;
console.log("Data set 2: Mark's BMI:", markBMI);
// Data set 2 - John's
mass = johnMass2;
height = johnHeight2;
johnBMI = mass / height ** 2;
console.log("Data set 2: John's BMI:", johnBMI);

markHigherBMI = markBMI > johnBMI;
console.log("Is Mark's BMI higher?", markHigherBMI);