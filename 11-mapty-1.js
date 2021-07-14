'use strict';


class Workout {
    date = new Date();
    id = (Date.now() + '').slice(-10); // Ideally, this id should be obtained from a library

    constructor(coords, distance, duration) {
        // this.date = ...
        // this.id = ...
        this.coords = coords; // [lat, lng]
        this.distance = distance; // in Km/h
        this.duration = duration; // in minutes
    }

    _setDescription() {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        // console.log(this.date.getMonth());
        // console.log(this.type);
        this.description = `${this.type[0].toUpperCase() + this.type.slice(1)} on ${months[this.date.getMonth()]} ${this.date.getDate()}`;
    }
}

class Running extends Workout {
    type = 'running';

    constructor(coords, distance, duration, cadence) {
        super(coords, distance, duration);
        this.cadence = cadence;
        this.calcPace();
        this._setDescription();
    }

    calcPace() {
        // min/Km
        this.pace = this.duration / this.distance;
        return this.pace;
    }
}

class Cycling extends Workout {
    type = 'cycling';

    constructor(coords, distance, duration, elevationGain) {
        super(coords, distance, duration);
        this.elevationGain = elevationGain;
        this.calcSpeed();
        this._setDescription();
    }

    calcSpeed() {
        // Km/h
        this.speed = this.distance / (this.duration / 60);
        return this.speed;
    }
}

// // Testing
// const run1 = new Running([-35.0039, 138.5445], 5.2, 24, 178);
// const cycling1 = new Cycling([-35.1039, 138.6445], 27, 95, 523);
// console.log(run1, cycling1);

// SECTION Application architecture

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class App {
    #map;
    #mapEvent;
    #workouts = [];

    constructor() {
        this._getPosition(); // App initialisation

        form.addEventListener('submit', this._newWorkout.bind(this)); // Use bind because otherwise this callback function is called with the 'this' keyword set to the object on the DOM, which is the 'form' object in this case, so we need to bind the 'this' keyword to our app object
        inputType.addEventListener('change', this._toggleElevationField);
    }

    _getPosition() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), // Use bind because otherwise this callback function is called as a regular function instead of a method, and regular functions have the 'this' keyword set to 'undefined'
                function () {
                    alert('Could not get your position!');
                }
            )
        };
    }

    _loadMap(position) {
        // console.log(position);
        const { latitude } = position.coords;
        const { longitude } = position.coords;
        console.log(latitude, longitude);
        console.log(`Google Maps test: https://www.google.com/maps/@${latitude},${longitude},14z`);

        // Leaflet API
        // Displaying the map
        const coords = [latitude, longitude];
        this.#map = L.map('map').setView(coords, 13);
        L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.#map);

        // Event listener on map
        // console.log(this);
        // console.log(this.#map);
        this.#map.on('click', this._showForm.bind(this)); // Here the 'this.#map' object points to the map, but we need the app, so we bind the 'this' keyword
    }

    _showForm(mapE) {
        // console.log(this);
        this.#mapEvent = mapE;
        form.classList.remove('hidden');
        inputDistance.focus();
    }

    _hideForm() {
        // Empty inputs
        inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = '';
        // Hide form
        form.style.display = 'none';
        form.classList.add('hidden');
        setTimeout(() => form.style.display = 'grid', 1000);
    }

    _toggleElevationField() {
        inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
        inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    }

    _newWorkout(e) {
        const validInputs = (...inputs) => inputs.every(i => Number.isFinite(i) && i >= 0);

        e.preventDefault();

        // Get data from form
        const type = inputType.value;
        const distance = +inputDistance.value; // converted to number (+)
        const duration = +inputDuration.value;
        const { lat, lng } = this.#mapEvent.latlng;
        let workout;

        // If workout = running, create running object
        if (type === 'running') {
            const cadence = +inputCadence.value;
            // Check if data is valid
            // Safeguard clause
            // if (!Number.isFinite(distance) || !Number.isFinite(duration) || !Number.isFinite(cadence)) return alert('Inputs have to be positive numbers!');
            if (!validInputs(distance, duration, cadence)) return alert('Inputs have to be positive numbers!');
            workout = new Running([lat, lng], distance, duration, cadence);
        }

        // If workout = cycling, create cycling object
        if (type === 'cycling') {
            // Check if data is valid
            const elevation = +inputElevation.value;
            if (!validInputs(distance, duration, Math.abs(elevation))) return alert('Inputs have to be positive numbers!');
            workout = new Cycling([lat, lng], distance, duration, elevation);
        }

        // Add new object to the workout array
        this.#workouts.push(workout);
        console.log(this.#workouts);
        // Render workout on map as marker
        // console.log(mapEvent);
        this._renderWorkoutMarker(workout);

        // Render workout on workouts list
        this._renderWorkout(workout);

        // Hide form and clear input fields
        this._hideForm();
    }

    _renderWorkoutMarker(workout) {
        L.marker(workout.coords, { riseOnHover: true }).addTo(this.#map)
            .bindPopup(L.popup({
                maxWidth: 250,
                minWidth: 100,
                autoClose: false,
                closeOnClick: false,
                className: `${workout.type}-popup`,
            }))
            .setPopupContent(`${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`)
            .openPopup();
    }

    _renderWorkout(workout) {
        let html = `<li class="workout workout--${workout.type}" data-id="${workout.id}">
              <h2 class="workout__title">${workout.description}</h2>
              <div class="workout__details">
                <span class="workout__icon">${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'}</span>
                <span class="workout__value">${workout.distance}</span>
                <span class="workout__unit">km</span>
              </div >
        <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${workout.duration}</span>
            <span class="workout__unit">min</span>
        </div>`;

        if (workout.type === 'running') {
            html += `<div class="workout__details">
                  <span class="workout__icon">⚡️</span>
                  <span class="workout__value">${workout.pace.toFixed(1)}</span>
                  <span class="workout__unit">min/km</span>
                </div>
                <div class="workout__details">
                  <span class="workout__icon">🦶🏼</span>
                  <span class="workout__value">${workout.cadence}</span>
                  <span class="workout__unit">spm</span>
                </div>
            </li>`;
        }

        if (workout.type === 'cycling') {
            html += `<div class="workout__details">
                <span class="workout__icon">⚡️</span>
                <span class="workout__value">${workout.speed.toFixed(1)}</span>
                <span class="workout__unit">km/h</span>
              </div>
              <div class="workout__details">
                <span class="workout__icon">⛰</span>
                <span class="workout__value">${workout.elevationGain}</span>
                <span class="workout__unit">m</span>
              </div>
            </li>`;
        }

        form.insertAdjacentHTML('afterend', html);
    }
}

const app = new App();
