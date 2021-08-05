import View from './View.js';
import { RESULTS_PER_PAGE } from '../config.js';
// import icons from '../img/icons.svg'; // Parcel 1.x
import icons from 'url:../../img/icons.svg'; // Parcel 2.x

class AddRecipeView extends View {
    _parentElement = document.querySelector('.upload');
    _message = 'Recipe was successfully uploaded';
    _window = document.querySelector('.add-recipe-window');
    _overlay = document.querySelector('.overlay');
    _btnOpen = document.querySelector('.nav__btn--add-recipe');
    _btnClose = document.querySelector('.btn--close-modal');

    // This will be executed when the new instance of the class is created
    constructor() {
        super();
        this._addHandlerShowWindow();
        this._addHandlerHideWindow();
    }

    toggleWindow() {
        this._window.classList.toggle('hidden');
        this._overlay.classList.toggle('hidden');
    }

    // As showing/hiding the modal does not involves other classes or data, there is no need to create a handler or call to this method in the controller.js file
    _addHandlerShowWindow() {
        this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
    }

    _addHandlerHideWindow() {
        this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
        this._overlay.addEventListener('click', this.toggleWindow.bind(this));
    }

    // Publisher
    addHandlerUpload(handler) {
        this._parentElement.addEventListener('submit', function (e) {
            e.preventDefault();
            // This 'data' needs to be accessible by the model, through the controller, so it can be sent to another API. This is why this is a Publisher.
            const dataArr = [...new FormData(this)]; // this === this._parentElement (inside the listener function)
            const data = Object.fromEntries(dataArr);
            handler(data);
        });
    }

    _generateMarkup() {

    }
}

export default new AddRecipeView();