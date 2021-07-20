'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

// SECTION XMLHttpRequest (old school)

// const getCountryData = function (country) {
//     const request = new XMLHttpRequest();
//     request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
//     request.send();

//     // Waiting for the response ('load')
//     request.addEventListener('load', function () {
//         console.log(this.responseText);

//         const [data] = JSON.parse(this.responseText);
//         console.log(data);

//         const html = `
//             <article class="country">
//               <img class="country__img" src="${data.flag}" />
//               <div class="country__data">
//                 <h3 class="country__name">${data.name}</h3>
//                 <h4 class="country__region">${data.region}</h4>
//                 <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)} million people</p>
//                 <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//                 <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
//               </div>
//             </article>`;

//         countriesContainer.insertAdjacentHTML('beforeend', html);
//         countriesContainer.style.opacity = '1';
//     });

// }

// getCountryData('australia');
// getCountryData('new zealand');
// getCountryData('argentina');

///////////////////////////

const renderCountry = function (data, className = '') {
    const html = `
            <article class="country ${className}">
              <img class="country__img" src="${data.flag}" />
              <div class="country__data">
                <h3 class="country__name">${data.name}</h3>
                <h4 class="country__region">${data.region}</h4>
                <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)} million people</p>
                <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
                <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
              </div>
            </article>`;

    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = '1';
};

// SECTION Callback hell

// const getCountryAndNeighbour = function (country) {

//     // AJAX call country 1
//     const request = new XMLHttpRequest();
//     request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
//     request.send();

//     // Waiting for the response ('load')
//     request.addEventListener('load', function () {
//         console.log(this.responseText);

//         const [data] = JSON.parse(this.responseText);
//         console.log(data);

//         // Render country 1
//         renderCountry(data);

//         // Get neighbour country (2)
//         const [neighbour] = data.borders;

//         if (!neighbour) return;

//         // AJAX call country 2
//         const request2 = new XMLHttpRequest();
//         request2.open('GET', `https://restcountries.eu/rest/v2/alpha/${neighbour}`);
//         request2.send();

//         request2.addEventListener('load', function () {

//             const data2 = JSON.parse(this.responseText);
//             console.log(data2);

//             // Render country 1
//             renderCountry(data2, 'neighbour');
//         });
//     });
// }

// getCountryAndNeighbour('argentina');

// SECTION Avoiding callback hell by using Promises

// // const getCountryData = function (country) {
// //     // Calling 'fetch' will immediately return a 'promise' (which is still pending). Then we call the 'then' method on the 'promise', which is going to receive the fulfilled value of the promise.
// //     fetch(`https://restcountries.eu/rest/v2/name/${country}`).then(function (response) {
// //         console.log(response);
// //         return response.json(); // This 'json' method (which is also a new promise, by the way it's implemented) is available in all the response objects coming from the 'fetch' function (all of the 'resolve' values).
// //     }).then(function (data) { // Final step to return the asynchronous data from the 'json' method.
// //         console.log(data);
// //         renderCountry(data[0]);
// //     });
// // };

// const getCountryData100 = function (country) {
//     fetch(`https://restcountries.eu/rest/v2/name/${country}`).then(response => response.json()).then(data => renderCountry(data[0]));
// };

// // getCountryData100('australia');

// // The 'fetch' returns a promise
// // That promise is handled by the first 'then'
// // To actually read the data from the response, we need to call the 'json' method
// // The 'json' method also returns a promise
// // Which is handled by the second 'then' method and its callback

// SECTION Chaining Promises and handling Promise rejections (errors)

const renderError = function (msg) {
    countriesContainer.insertAdjacentText('beforeend', msg);
    // countriesContainer.style.opacity = '1';
};

// const getJSON = function (url, errorMsg = 'Something went wrong') {
//     return fetch(url)
//         .then(response => {
//             if (!response.ok)
//                 throw new Error(`${errorMsg} (${response.status})`);
//             return response.json();
//         });
// };

// const getCountryData = function (country) {
//     // Country 1
//     fetch(`https://restcountries.eu/rest/v2/name/${country}`)
//         .then(response => {
//             console.log(response);

//             if (!response.ok)
//                 throw new Error(`Country not found (${response.status})`);
//             return response.json();
//         })
//         .then(data => {
//             renderCountry(data[0]);
//             const neighbour = data[0].borders[0];

//             if (!neighbour) return;

//             // Country 2
//             // Whatever we return from a promise (fetch), it will become the fulfilment value of that promise. This allow us to chain promises.
//             return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
//         })
//         .then(response => response.json())
//         .then(data => {
//             renderCountry(data, 'neighbour');
//             const neighbour = data.borders[0];
//             if (!neighbour) return;
//             // Country 3
//             return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
//         })
//         .then(response => response.json())
//         .then(data => renderCountry(data, 'neighbour'))
//         .catch(err => {
//             console.error(`${err} 💥💥💥`);
//             renderError(`Something went wrong: ${err.message}`);
//         })
//         .finally(() => countriesContainer.style.opacity = '1');
// };

// const getCountryData2 = function (country) {
//     // Country 1
//     getJSON(`https://restcountries.eu/rest/v2/name/${country}`, 'Country not found')
//         .then(data => {
//             renderCountry(data[0]);
//             const neighbour = data[0].borders[0];
//             // const neighbour = 'asdasd';

//             if (!neighbour) throw new Error('The country has no neighbours');

//             // Country 2
//             // Whatever we return from a promise (fetch), it will become the fulfilment value of that promise. This allow us to chain promises.
//             return getJSON(`https://restcountries.eu/rest/v2/alpha/${neighbour}`, 'Country not found');
//         })
//         .then(data => renderCountry(data, 'neighbour'))
//         .catch(err => {
//             console.error(`${err} 💥💥💥`);
//             renderError(`Something went wrong: ${err.message}`);
//         })
//         .finally(() => countriesContainer.style.opacity = '1');
// };

// // fetch().then().then( return fetch() ).then().then( return fetch() ).then().then()

// // btn.addEventListener('click', function () {
// //     getCountryData('italy');
// // });

// /*
// btn.addEventListener('click', function () {
//     // getCountryData2('italy');
//     // getCountryData2('germany');
//     getCountryData2('australia');
// });
// */

// // getCountryData('atlantis'); // Error triggering call

// // SECTION Async Javascript

// console.log('Test start'); // Synchronous code
// setTimeout(() => console.log('0 sec timer'), 0); // On the callback queue
// Promise.resolve('Resolved promise 1').then(res => console.log(res)); // On the microtasks queue (higher priority than callback queue)
// // The problem with microtasks is that, once resolved, they can slow down the callback calls (the time to wait in the setTimeout is not guaranteed):
// // Promise.resolve('Resolve promise 2').then(res => {
// //     for (let i = 0; i < 1000; i++) {
// //         console.log(res);
// //     }
// // });
// console.log('Test end'); // Synchronous code
// /* ->
// Test start
// Test end
// Resolved promise 1
// (1000) Resolve promise 2 // Took a long time
// 0 sec timer
// */

// SECTION Building promises

// const lotteryPromise = new Promise(function (resolve, reject) {
//     console.log('Lottery draw is happening 🔮');
//     setTimeout(function () {
//         if (Math.random() >= .5) {
//             // Fulfilling the Promise
//             resolve('You WIN 💰!');
//         } else {
//             // Rejecting the Promise
//             reject(new Error('You lost your money 💩...'));
//         }
//     }, 2000);
// });

// lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));
// /* ->
// Lottery draw is happening 🔮
// ...
// Error: You lost your money 💩...
// */

// // Promisifying setTimeout
// const wait = function (seconds) {
//     return new Promise(function (resolve) {
//         setTimeout(resolve, seconds * 1000);
//     });
// };

// wait(5).then(() => {
//     console.log('I waited for 5 seconds');
//     return wait(3);
// }).then(() => {
//     console.log('I waited for 3 seconds');
// });
// /* ->
// ...
// I waited for 5 seconds
// ...
// I waited for 3 seconds
// */

// // Resolving a Promise immediately
// Promise.resolve('abc').then(x => console.log(x));
// // -> abc
// Promise.reject('def').catch(x => console.error(x));
// // -> def

// SECTION Promesifying geolocation

// const getPosition = function () {
//     return new Promise(function (resolve, reject) {
//         // navigator.geolocation.getCurrentPosition(
//         //     position => resolve(position),
//         //     err => reject(err)
//         // );
//         navigator.geolocation.getCurrentPosition(resolve, reject);
//     });
// };

// getPosition().then(pos => console.log(pos));
// // -> ... GeolocationPosition {coords: GeolocationCoordinates, timestamp: 1626654385784}

// const whereAmI = function (lat, lng) {
//     getPosition()
//         .then(pos => {
//             const { latitude: lat, longitude: lng } = pos.coords;

//             return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
//         })
//         .then(response => {
//             return response.json();
//         }, reject => callError(`(2) (${reject})`)) //5.
//         .then(data => {
//             // console.log(data);
//             if (data.error) {
//                 callError(`(3) Main reason: ${compoundError} - (${data.error.code}) ${data.error.message || data.error.description}`); //5.
//             } else {
//                 // 3.
//                 // console.log(data);
//                 console.log(`You are in ${data.city}, ${data.country}`);
//                 getCountryData2(data.country);
//             }
//         })
//         .catch(err => displayError(err)); // 4.
// }

// btn.addEventListener('click', whereAmI);

// SECTION Async & Await

// const getPositionNew = function () {
//     return new Promise(function (resolve, reject) {
//         navigator.geolocation.getCurrentPosition(resolve, reject);
//     });
// };

// // // Old way
// // const whereAmI1 = function (country) {
// //     return fetch(`https://restcountries.eu/rest/v2/name/${country}`)
// //         .then(res => res.json());
// // };

// // whereAmI1('australia').then(res => console.log(`1 ---> ${JSON.stringify(res[0])}`));

// // New way (including other await examples)
// const whereAmI2 = async function () {
//     // Geolocation
//     const pos = await getPositionNew();
//     const { latitude: lat, longitude: lng } = pos.coords;
//     // Reverse geocoding
//     const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//     // if (!resGeo.ok) throw new Error('Problem getting location data');
//     const dataGeo = await resGeo.json();
//     console.log('1 -', resGeo);
//     console.log('2 -', dataGeo);

//     // Country data
//     const res = await fetch(`https://restcountries.eu/rest/v2/name/${dataGeo.country}`);
//     // if (!res.ok) throw new Error('Problem getting country');
//     const data = await res.json();
//     console.log('--->', data[0].name);
//     renderCountry(data[0]);
// };

// whereAmI2();
// console.log('---> FIRST');
// /* ->
// ---> FIRST
// ---> Response {type: "cors", url: "https://restcountries.eu/rest/v2/name/australia", redirected: false, status: 200, ok: true, …}
// */

// SECTION try...catch

// try {
//     const x = 1;
//     x++
// } catch (err) {
//     console.log(`There was an error: ${err.message}`);
// }
// // -> There was an error: Assignment to constant variable.


// const getPositionNew = function () {
//     return new Promise(function (resolve, reject) {
//         navigator.geolocation.getCurrentPosition(resolve, reject);
//     });
// };

// const whereAmI2 = async function () {
//     try {
//         // Geolocation
//         const pos = await getPositionNew();
//         const { latitude: lat, longitude: lng } = pos.coords;
//         // Reverse geocoding
//         const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//         if (!resGeo.ok) throw new Error('Problem getting location data'); // For the 'catch' part
//         const dataGeo = await resGeo.json();
//         console.log('1 -', resGeo);
//         console.log('2 -', dataGeo);

//         // Country data
//         const res = await fetch(`https://restcountries.eu/rest/v2/name/${dataGeo.country}`);
//         if (!res.ok) throw new Error('Problem getting country'); // For the 'catch' part
//         const data = await res.json();
//         console.log('--->', data[0].name);
//         renderCountry(data[0]);
//     } catch (err) {
//         console.log(`There was an ERROR on the whereAmI async function: ${err.message}`);
//         renderError(`Something went wrong! :( ${err.message}`);
//     }
// };

// // Calling the function multiple times to generate an error
// whereAmI2();
// whereAmI2();
// whereAmI2();
// whereAmI2();
// console.log('---> FIRST');

// /* ->
// GET https://geocode.xyz/-35.003994299999995,138.5446135?geoit=json 403
// There was an ERROR on the whereAmI async function: Problem getting location data
// (But the program keeps working on the rest of the code.)
// */

// SECTION Returning values from an async function (try...catch throw)

// const getPositionNew = function () {
//     return new Promise(function (resolve, reject) {
//         navigator.geolocation.getCurrentPosition(resolve, reject);
//     });
// };

// const whereAmI2 = async function () {
//     try {
//         // Geolocation
//         const pos = await getPositionNew();
//         const { latitude: lat, longitude: lng } = pos.coords;
//         // Reverse geocoding
//         const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//         if (!resGeo.ok) throw new Error('Problem getting location data'); // For the 'catch' part
//         const dataGeo = await resGeo.json();

//         // Country data
//         const res = await fetch(`https://restcountries.eu/rest/v2/name/${dataGeo.country}`);
//         if (!res.ok) throw new Error('Problem getting country'); // For the 'catch' part
//         const data = await res.json();
//         renderCountry(data[0]);

//         // returning a value
//         return `You are in ${dataGeo.city}, ${dataGeo.country}`;
//     } catch (err) {
//         console.log(`There was an ERROR on the whereAmI async function: ${err.message}`);
//         renderError(`Something went wrong! :( ${err.message}`);

//         // Reject promise returned from async function so we can use a 'catch' later on
//         throw err;
//     }
// };

// console.log('1: Will get location');
// // // console.log(whereAmI2()); // Doing this, will return a promise (due to the nature of the async function)
// // // // -> Promise {<pending>}
// // whereAmI2()
// //     .then(city => console.log(`2: ${city}`))
// //     .catch(err => console.log(`2: ${err.message}`))
// //     .finally(() => console.log(`3: End of async function execution`));
// // console.log('4: Finished getting location?');
// // /* ->
// // 1: Will get location
// // 4: Finished getting location?
// // 2: You are in OAKLANDS PARK, Australia (or 2: Problem getting location data)
// // 3: End of async function execution
// // */

// // Using IIFE functions to create an async version of the above code
// (async function () {
//     try {
//         const location = await whereAmI2();
//         console.log(`2: ${location}`);
//     } catch (err) {
//         console.log(`2: ${err}`);
//         throw err;
//     }
//     console.log(`3: End of async function execution`);
// })();
// console.log('4: Finished getting location?');

// // If there is no error thrown on the 'catch' block, the async function will get fulfilled, even though there was an error in the 'try' block. This is why this 'catch' will be 'undefined': whereAmI2().then(city => console.log(city)).catch(err => console.error(${err})).

// SECTION Running Promises in parallel (Promise combinator)

const getJSON = function (url, errorMsg = 'Something went wrong') {
    return fetch(url)
        .then(response => {
            if (!response.ok)
                throw new Error(`${errorMsg} (${response.status})`);
            return response.json();
        });
};

// fetch(`https://restcountries.eu/rest/v2/name/${country}`);


const get3Countries = async function (c1, c2, c3) {
    try {
        // // These three awaits run one after the other, like a three steps waterfall
        // const [data1] = await getJSON(`https://restcountries.eu/rest/v2/name/${c1}`);
        // const [data2] = await getJSON(`https://restcountries.eu/rest/v2/name/${c2}`);
        // const [data3] = await getJSON(`https://restcountries.eu/rest/v2/name/${c3}`);
        // console.log([data1.capital, data2.capital, data3.capital]);
        // These ones run all in parallel (use the 'Network" tab to inspect)
        const data = await Promise.all([getJSON(`https://restcountries.eu/rest/v2/name/${c1}`), getJSON(`https://restcountries.eu/rest/v2/name/${c2}`), getJSON(`https://restcountries.eu/rest/v2/name/${c3}`)]);
        console.log(data.map(value => value[0].capital));



    } catch (err) {
        console.log(err);
    }
}

get3Countries('spain', 'canada', 'australia');
// -> (3) ["Madrid", "Ottawa", "Canberra"]