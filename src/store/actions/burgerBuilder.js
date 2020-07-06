import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'

export const addIngredient = (name) => ({
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name
})

export const removeIngredient = (name) => ({
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name
})

export const setIngredinets = (ingredients) => ({
    type: actionTypes.SET_INGREDIENT,
    ingredients
})

export const fechIngredientsFailed = () => ({
    type: actionTypes.FETCH_INGREDIENTS_FAILED
})



export const initIngredients = () => {
    return (dispatch, getState) => {
        axios.get('https://burgerbuilder-23f28.firebaseio.com/ingredients.json').then(res => {
            dispatch(setIngredinets(res.data));
        })
            .catch(error => {
                dispatch(fechIngredientsFailed());
            });



    };
};