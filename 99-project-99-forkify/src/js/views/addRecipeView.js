import View from './View.js';
import { RESULTS_PER_PAGE } from '../config.js';
// import icons from '../img/icons.svg'; // Parcel 1.x
import icons from 'url:../../img/icons.svg'; // Parcel 2.x

class AddRecipeView extends View {
    _parentElement = document.querySelector('.upload');
    _window = document.querySelector('.add-recipe-window');

    _generateMarkup() {

    }
}

export default new AddRecipeView();