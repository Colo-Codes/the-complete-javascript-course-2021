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

// const getCountryData = function (country) {
//     // Calling 'fetch' will immediately return a 'promise' (which is still pending). Then we call the 'then' method on the 'promise', which is going to receive the fulfilled value of the promise.
//     fetch(`https://restcountries.eu/rest/v2/name/${country}`).then(function (response) {
//         console.log(response);
//         return response.json(); // This 'json' method (which is also a new promise, by the way it's implemented) is available in all the response objects coming from the 'fetch' function (all of the 'resolve' values).
//     }).then(function (data) { // Final step to return the asynchronous data from the 'json' method.
//         console.log(data);
//         renderCountry(data[0]);
//     });
// };

const getCountryData = function (country) {
    fetch(`https://restcountries.eu/rest/v2/name/${country}`).then(response => response.json()).then(data => renderCountry(data[0]));
};

getCountryData('australia');

// The 'fetch' returns a promise
// That promise is handled by the first 'then'
// To actually read the data from the response, we need to call the 'json' method
// The 'json' method also returns a promise
// Which is handled by the second 'then' method and its callback