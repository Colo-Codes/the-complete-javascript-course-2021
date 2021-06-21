/*
Coding Challenge #1

Given an array of forecasted maximum temperatures, the thermometer displays a
string with the given temperatures. Example: [17, 21, 23] will print "... 17ºC in 1
days ... 21ºC in 2 days ... 23ºC in 3 days ..."

Your tasks:
1. Create a function 'printForecast' which takes in an array 'arr' and logs a
string like the above to the console. Try it with both test datasets.
2. Use the problem-solving framework: Understand the problem and break it up
into sub-problems!

Test data:
§ Data 1: [17, 21, 23]
§ Data 2: [12, 5, -5, 0, 4]

GOOD LUCK
*/

/*
1) Problem: take an array of numbers and print output.
- Will the array length be fixed?
- Will the array contain only numbers?
- Will the output need to be formatted in a specific way?

2) Small problems:
- Make sure we are working only with numbers in the array
- Iterate the array
- Build the forecast for one day
- Build the forecast for as many days as the length of the array

3) Pseudo code:
Get the array
For each element of array
    If element == Number
        Create forecast string
        Concatenate element to forecast string
Concatenate the strings of all the elements of array
Return concatenated string
*/

const printForecast = (arr) => {
    let forecast = '';
    for (let i = 0; i < arr.length; i++) {
        if (typeof arr[i] != 'number') continue;
        forecast += `... ${arr[i]}ºC 🌡  in ${i + 1} days`;
    }
    forecast += '...';
    return console.log(forecast);
}

printForecast([17, 21, 23]);
printForecast([12, 5, -5, 0, 4]);
printForecast([12, 5, -5, 0, 4, 'error', 12, 'error']);