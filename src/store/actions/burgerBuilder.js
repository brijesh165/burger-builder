import * as actionTypes from '../actions/actionTypes';
import axios from "../../axios-orders";

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
};


export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
};

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
};

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
};

export const initIngredient = () => {
    return dispatch => {
        axios.get('http://localhost:4000/ingredients')
            .then(response => {
                dispatch(setIngredients(response.data.ingredients[0]));
            })
            .catch(error => {
                dispatch(fetchIngredientsFailed());
            });
    }
};
