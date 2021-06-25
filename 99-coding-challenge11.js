/*
Data Structures, Modern Operators and Strings

Coding Challenge #2

Let's continue with our football betting app! Keep using the 'game' variable from
before.

Your tasks:
1. Loop over the game.scored array and print each player name to the console,
along with the goal number (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console (We already
studied how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exactly like this:
Odd of victory Bayern Munich: 1.33
Odd of draw: 3.25
Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them
(except for "draw"). Hint: Note how the odds and the game objects have the
same property names �
4. Bonus: Create an object called 'scorers' which contains the names of the
players who scored as properties, and the number of goals as the value. In this
game, it will look like this:
{
 Gnarby: 1,
 Hummels: 1,
 Lewandowski: 2
}

GOOD LUCK
*/

const game = {
    team1: 'Bayern Munich',
    team2: 'Borrussia Dortmund',
    players: [
        [
            'Neuer',
            'Pavard',
            'Martinez',
            'Alaba',
            'Davies',
            'Kimmich',
            'Goretzka',
            'Coman',
            'Muller',
            'Gnarby',
            'Lewandowski',
        ],
        [
            'Burki',
            'Schulz',
            'Hummels',
            'Akanji',
            'Hakimi',
            'Weigl',
            'Witsel',
            'Hazard',
            'Brandt',
            'Sancho',
            'Gotze',
        ],
    ],
    score: '4:0',
    scored: ['Lewandowski', 'Gnarby', 'Lewandowski',
        'Hummels'],
    date: 'Nov 9th, 2037',
    odds: {
        team1: 1.33,
        x: 3.25,
        team2: 6.5,
    },
};

// 1. 

// const scoringPlayers = Object.entries(game.scored);
// console.log(scoringPlayers);

for (const [key, player] of game.scored.entries()) // game.scored.entries() is an array
    console.log(`Goal ${key + 1}: ${player}`);

// 2.

// const totalOdds = Object.values(game.odds);
// console.log(totalOdds);

const calcAvgOdds = (...odds) => {
    let sum = 0;
    for (let i = 0; i < odds.length; i++)
        sum += odds[i];
    return Math.round(sum / odds.length * 100) / 100;
}

console.log(`The average odd is: ${calcAvgOdds(...Object.values(game.odds))}`);  // Object.values(game.odds) is an object

// Another solution:

let average = 0;
for (const odd of Object.values(game.odds))
    average += odd;
average /= Object.values(game.odds).length;
console.log(average);

// 3.

// const teams = ['team1', 'x', 'team2'];
// const teams = Object.keys(game.odds);

for (const team of Object.keys(game.odds))
    console.log(`Odd of ${game?.[team] ? 'victory ' + game?.[team] : 'draw'}: ${game.odds[team]}`);

// 4.

const scorers = {};

for (const scorer of game.scored) {
    // scorers[scorer]++ || (scorers[scorer] = 1);
    scorers?.[scorer] ?? (scorers[scorer] = 0);
    scorers[scorer]++;
}

console.log(scorers);

// const scorers = {};
// for (const player of game.scored) {
//     scorers[player] ? scorers[player]++ : (scorers[player] = 1);
// }