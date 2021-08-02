import { async } from 'regenerator-runtime/runtime';
import { API_URL } from './config.js';
import { getJSON } from './helpers.js';

// As per Architecture diagram
export const state = {
    recipe: {},
    search: {
        query: '',
        results: []
    }
};

export const loadRecipe = async function (id) {
    try {
        const data = await getJSON(`${API_URL}${id}`);

        // let recipe = data.data.recipe
        const { recipe } = data.data;
        state.recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            image: recipe.image_url,
            servings: recipe.servings,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients,
        };
    } catch (err) {
        // Temp error handling
        // console.error(`🔥 - ${err}`);
        throw err; // Error propagation
    }
};

export const loadSearchResults = async function (query) {
    try {
        state.search.query = query;

        const data = await getJSON(`${API_URL}?search=${query}`);
        console.log(data);

        state.search.results = data.data.recipes.map(rec => {
            return {
                id: rec.id,
                title: rec.title,
                publisher: rec.publisher,
                image: rec.image_url,
            };
        });
    } catch (err) {
        throw err; // Error propagation
    }
}