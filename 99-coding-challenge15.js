/*
A Closer Look at Functions

Coding Challenge #2

This is more of a thinking challenge than a coding challenge �

Your tasks:
1. Take the IIFE below and at the end of the function, attach an event listener that
changes the color of the selected h1 element ('header') to blue, each time
the body element is clicked. Do not select the h1 element again!
2. And now explain to yourself (or someone around you) why this worked! Take all
the time you need. Think about when exactly the callback function is executed,
and what that means for the variables involved in this example.

GOOD LUCK

*/
'use strict';

(function () {
    const header = document.querySelector('h1');
    header.style.color = 'red';
    document.querySelector('body').addEventListener('click', function () {
        header.style.color === 'red' ? header.style.color = 'blue' : header.style.color = 'red';
        console.log(header.style.color);
        console.log('1) The IIEF function is defined and called.\n2) The event listener / handler function is then called.\n3) The IIEF function ends and its execution context disappears.\n4) The event listener / handler function is still waiting for the event, and it has a closure that includes the \'header\' variable.\n5) When the user clicks on the body element, the event listener / handler gets activated and performs its action on the \'header\' variable.\n6) The event listener / handler keeps waiting fot a new event, and the cycle starts again from step 4).');
    });
})();

/*
1) The IIEF function is defined and called.
2) The event listener/handler function is then called.
3) The IIEF function ends and its execution context disappears.
4) The event listener/handler function is still waiting for the event, and it has a closure that includes the 'header' variable.
5) When the user clicks on the body element, the event listener/handler gets activated and performs its action on the 'header' variable.
6) The event listener/handler keeps waiting fot a new event, and the cycle starts again from step 4).
*/

