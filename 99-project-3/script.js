'use strict';

// Selecting elements
const score0Element = document.querySelector('#score--0');
const score1Element = document.getElementById('score--1');
const currentScore0Element = document.getElementById('current--0');
const currentScore1Element = document.getElementById('current--1');
const diceElement = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');

// Starting conditions
const scores = [];
let currentScore;
let activePlayer;
let playing;

// Functions
const newGame = () => {
    score0Element.textContent = 0;
    score1Element.textContent = 0;
    scores[0] = scores[1] = 0;
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    player0Element.classList.remove('player--winner');
    player1Element.classList.remove('player--winner');
    player0Element.classList.add('player--active');
    player1Element.classList.remove('player--active');
    currentScore0Element.textContent = 0;
    currentScore1Element.textContent = 0;

    diceElement.classList.add('hidden');
}

newGame();

const switchPlayer = () => {
    // Switch to next player
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    activePlayer = activePlayer === 0 ? 1 : 0;
    // Highlight player
    player0Element.classList.toggle('player--active');
    player1Element.classList.toggle('player--active');
}


// Rolling dice functionality
btnRoll.addEventListener('click', function () {
    if (playing) {
        // 1. Generate random roll
        const dice = Math.trunc((Math.random() * 6) + 1);
        console.log(dice);

        // 2. Display dice
        diceElement.classList.remove('hidden');
        diceElement.src = `dice-${dice}.png`;

        // 3. Check for rolled 1: if true, switch to next player
        if (dice !== 1) {
            // Add dice to current score
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        }
        else {
            // Switch to next player
            switchPlayer();
        }
    }
});

btnHold.addEventListener('click', function () {
    if (playing) {
        // 1. Add current score to active player's score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];


        // 2. Check if score is >= 100
        if (scores[activePlayer] >= 100) {
            //  Finish game
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            diceElement.classList.add('hidden');
        }
        else {
            // Switch to next player
            switchPlayer();
        }
    }
});

btnNew.addEventListener('click', newGame);