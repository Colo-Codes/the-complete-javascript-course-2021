/*
Asynchronous JavaScript

Coding Challenge #1

In this challenge you will build a function 'whereAmI' which renders a country
only based on GPS coordinates. For that, you will use a second API to geocode
coordinates. So in this challenge, you’ll use an API on your own for the first time �

Your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value ('lat')
and a longitude value ('lng') (these are GPS coordinates, examples are in test
data below).
2. Do “reverse geocoding” of the provided coordinates. Reverse geocoding means
to convert coordinates to a meaningful location, like a city and country name.
Use this API to do reverse geocoding: https://geocode.xyz/api. The AJAX call
will be done to a URL with this format:
https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and
promises to get the data. Do not use the 'getJSON' function we created, that
is cheating �
3. Once you have the data, take a look at it in the console to see all the attributes
that you received about the provided location. Then, using this data, log a
message like this to the console: “You are in Berlin, Germany”
4. Chain a .catch method to the end of the promise chain and log errors to the
console
5. This API allows you to make only 3 requests per second. If you reload fast, you
will get this error with code 403. This is an error with the request. Remember,
fetch() does not reject the promise in this case. So create an error to reject
the promise yourself, with a meaningful error message

PART 2
6. Now it's time to use the received data to render a country. So take the relevant
attribute from the geocoding API result, and plug it into the countries API that
we have been using.
7. Render the country and catch any errors, just like we have done in the last
lecture (you can even copy this code, no need to type the same code)

Test data:
§ Coordinates 1: 52.508, 13.381 (Latitude, Longitude)
§ Coordinates 2: 19.037, 72.873
§ Coordinates 3: -33.933, 18.474

GOOD LUCK

 */

'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const callError = function (errorMsg) {
  throw new Error(errorMsg);
};

const displayError = function (errorMsg) {
  countriesContainer.style.opacity = '1';
  countriesContainer.innerHTML = `
  <p>🙀 Error caught! ${errorMsg}</p>
  `;
  return console.error(`🙀 Error caught! ${errorMsg}`);
};

const spinner = function (toggleShow) {
  countriesContainer.style.opacity = `${toggleShow}`;
  if (toggleShow) {
    countriesContainer.innerHTML = `
    <img src=>
    `;

  }
}

// 1.

const whereAmI = function (lat, lng) {
  // 2.
  // Use for testing errors:
  // fetch(`https://geocode.xyz/-34.9247781,8888.5978623?geoit=json`)
  fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
    .then(response => {
      // console.log(response);
      return response.json();
    }, reject => callError(`(2) (${reject})`)) //5.
    .then(data => {
      // console.log(data);
      if (data.error) {
        callError(`(3) (${data.error.code}) ${data.error.message || data.error.description}`); //5.
      } else {
        // 3.
        // console.log(data);
        console.log(`You are in ${data.city}, ${data.country}`);
        getCountryData(data.country);
      }
    })
    .catch(err => displayError(err)); // 4.
}

// Use for testing errors:
// let i = 0;
// setInterval(() => {
//   if (i < 10)
//     whereAmI();
//   i++;
// }, 100);

// whereAmI();

// 6. & 7.

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = '1';
};

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url)
    .then(response => {
      if (!response.ok)
        throw new Error(`${errorMsg} (${response.status})`);
      return response.json();
    });
};

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
  // countriesContainer.style.opacity = '1';
};

const getCountryData = function (country) {
  // Country 1
  getJSON(`https://restcountries.eu/rest/v2/name/${country}`, 'Country not found')
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];
      // const neighbour = 'asdasd';

      if (!neighbour) throw new Error('The country has no neighbours');

      // Country 2
      // Whatever we return from a promise (fetch), it will become the fulfilment value of that promise. This allow us to chain promises.
      return getJSON(`https://restcountries.eu/rest/v2/alpha/${neighbour}`, 'Country not found');
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.error(`${err} 💥💥💥`);
      renderError(`Something went wrong: ${err.message}`);
    })
    .finally(() => countriesContainer.style.opacity = '1');
};

// Calling the functions
btn.addEventListener('click', function () {
  // whereAmI(-34.9247781, 138.5978623);
  whereAmI(52.508, 13.381);
  // whereAmI(19.037, 72.873);
  // whereAmI(-33.933, 18.474);
});

