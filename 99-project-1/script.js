'use strict';

// Basic concepts:
// console.log(document.querySelector('.message').textContent);
// document.querySelector('.message').textContent = '🎉 Correct Number!'
// console.log(document.querySelector('.number').textContent);
// console.log(document.querySelector('.score').textContent);
// console.log(document.querySelector('.guess').value);
// document.querySelector('.guess').value = 10;
// console.log(document.querySelector('.guess').value);

// Functions
const setMessage = (message) => {
    document.querySelector('.message').textContent = message;
}

// Random number
let randomNumber = Math.trunc(Math.random() * 20) + 1;

// Score
let score = 20;
let highScore = 0;

// Event listener (input number)
document.querySelector('.check').addEventListener('click', function () {
    // The function is the event handler
    const guess = Number(document.querySelector('.guess').value);

    // If no input
    if (!guess) {
        setMessage('🚫 No Number!');
        // If player wins
    } else if (guess === randomNumber) {
        setMessage('🎉 Correct Number!');
        document.querySelector('body').style.backgroundColor = '#60b347';
        document.querySelector('.number').style.width = '60rem';
        document.querySelector('.number').textContent = randomNumber;
        if (score > highScore) {
            highScore = score;
            document.querySelector('.highscore').textContent = highScore;
        }
        // If guess is higher/lower than secret number
    } else if (guess !== randomNumber) {
        if (score > 1) {
            setMessage(guess > randomNumber ? '⬆️ Guess is too high!' : '⬇️ Guess is too low!');
            score--;
            document.querySelector('.score').textContent = score;
        }
        else {
            setMessage('😢 GAME OVER!');
            document.querySelector('.score').textContent = 0;
        }
    }
});

// Event listener (reset button)
document.querySelector('.again').addEventListener('click', function () {
    setMessage('Start guessing...');
    document.querySelector('body').style.backgroundColor = '#222';
    document.querySelector('.number').style.width = '15rem';
    document.querySelector('.number').textContent = '?';
    document.querySelector('.guess').value = '';
    score = 20;
    document.querySelector('.score').textContent = score;

    randomNumber = Math.trunc(Math.random() * 20) + 1;
});