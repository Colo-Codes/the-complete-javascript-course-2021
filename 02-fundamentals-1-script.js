'use strict'; // Needs to be before any code in the script

let hasDriversLicense = false;
const passTest = true;

// if (passTest) hasDriversLicens = true; // Error introduced to check the 'use strict' functionality (comment out 'use strict' and compare errors)
if (passTest) hasDriversLicense = true; // Error introduced to check the 'use strict' functionality (comment out 'use strict' and compare errors)
if (hasDriversLicense) console.log('I can drive! 🚗');

// Objects
const damianObject = {
    // Properties
    firstName: 'Damian',
    lastName: 'Demasi',
    birthYear: 1981, // 👴

    // Methods
    // age: function (currentYear) { return currentYear - damianObject.birthYear; }, // This is not DRY
    // age: function (currentYear) { return currentYear - this.birthYear; }, // Using the 'this' keyword
    age: function (currentYear) {
        this.myAge = currentYear - this.birthYear;
        return this.myAge;
    },
    fullName: (firstName, lastName) => `${firstName} ${lastName}`
}

console.log(damianObject.age(2021), '👴');
console.log(damianObject.myAge, '👴');
console.log(damianObject.myAge, '👴');
console.log(damianObject.myAge, '👴');
console.log(damianObject.myAge, '👴');