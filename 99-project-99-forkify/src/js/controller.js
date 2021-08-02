import * as model from './model.js';
import recipeView from './views/recipeView.js';
import 'regenerator-runtime/runtime'; // Polyfill async-await
import 'core-js/stable'; // Polyfill everything else

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1); // get the hash code from the address bar of browser
    console.log(id);

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

const init = function () {
  // Subscriber (handles the event)
  recipeView.addHandlerRender(controlRecipes);
};

init();