import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import 'regenerator-runtime/runtime'; // Polyfill async-await
import 'core-js/stable'; // Polyfill everything else
import { async } from 'regenerator-runtime/runtime';

// Update page without reloading it (Parcel)
if (module.hot) {
  module.hot.accept();
}

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1); // get the hash code from the address bar of browser

    if (!id) return;

    recipeView.renderSpinner();

    // 1) Loading recipe
    await model.loadRecipe(id);

    // 2) Rendering recipe
    recipeView.render(model.state.recipe);


  } catch (err) {
    // Handling errors
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    // 1) Get search query
    const query = searchView.getQuery();

    // 2) Load search results
    if (!query) return;
    await model.loadSearchResults(query);

    // 3) Render results
    resultsView.render(model.state.search.results);

  } catch (err) {
    console.log(err);
  }
};

const init = function () {
  // Subscribers (handles the event)
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};

init();