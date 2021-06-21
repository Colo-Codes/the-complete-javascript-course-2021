'use strict';

// Basic concepts:
// console.log(document.querySelector('.message').textContent);
// document.querySelector('.message').textContent = '🎉 Correct Number!'
// console.log(document.querySelector('.number').textContent);
// console.log(document.querySelector('.score').textContent);
// console.log(document.querySelector('.guess').value);
// document.querySelector('.guess').value = 10;
// console.log(document.querySelector('.guess').value);

// Random number
const randomNumber = Math.trunc(Math.random() * 20) + 1;

// Score
let score = 20;

// Event listener (input number)
document.querySelector('.check').addEventListener('click', function () {
    // The function is the event handler
    const guess = Number(document.querySelector('.guess').value);
    console.log(guess);

    // If no input
    if (!guess) {
        document.querySelector('.message').textContent = '🚫 No Number!'
        // If player wins
    } else if (guess === randomNumber) {
        document.querySelector('.message').textContent = '🎉 Correct Number!'
        document.querySelector('body').style.backgroundColor = '#60b347';
        document.querySelector('.number').style.width = '60rem';
        document.querySelector('.number').textContent = randomNumber;
        // If guess is higher than secret number
    } else if (guess > randomNumber) {
        if (score > 1) {
            document.querySelector('.message').textContent = '⬆️ Guess is too high!'
            score--;
            document.querySelector('.score').textContent = score;
        }
        else {
            document.querySelector('.message').textContent = '😢 GAME OVER!'
            document.querySelector('.score').textContent = 0;
        }
        // If guess is lower than secret number
    } else {
        if (score > 1) {
            document.querySelector('.message').textContent = '⬇️ Guess is too low!'
            score--;
            document.querySelector('.score').textContent = score;
        }
        else {
            document.querySelector('.message').textContent = '😢 GAME OVER!'
            document.querySelector('.score').textContent = 0;
        }
    }

});

// Event listener (reset button)
document.querySelector('.again').addEventListener('click', function () {
    document.querySelector('.message').textContent = 'Start guessing...'
    document.querySelector('body').style.backgroundColor = '#222';
    document.querySelector('.number').style.width = '15rem';
    document.querySelector('.number').textContent = '?';
    document.querySelector('.guess').value = '';
    score = 20;
    document.querySelector('.score').textContent = score;

    randomNumber = Math.trunc(Math.random() * 20) + 1;
});