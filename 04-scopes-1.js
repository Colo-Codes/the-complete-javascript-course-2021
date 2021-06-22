// Remember, we're gonna use strict mode in all scripts now!
'use strict';

function calcAge(birthYear) {
    const age = 2021 - birthYear;

    function printAge() {
        let output = `${firstName} is ${age}-years old, born in ${birthYear}`;
        console.log(output);

        if (birthYear >= 1981 && birthYear <= 1996) {
            var millennial = true; // Not block scoped, but function scoped
            // Redefining outer scope's variable
            const firstName = 'Celeste';
            // Reassigning outer scope's variable
            output = 'New output!';
            const str = `Oh, and you are a millennial, ${firstName}`;
            console.log(str);

            function add(a, b) {
                return a + b;
            }

        }
        // console.log(str); // Will not work: ReferenceError: str is not defined
        console.log(millennial);
        // add(2, 3); // Will not work: ReferenceError: add is not defined (when using 'strict mode' -otherwise it works-)
        console.log(output);
    }

    printAge();
    return age;
}

const firstName = 'Damian';

calcAge(1981);

// printAge(); // Will not work: ReferenceError: printAge is not defined