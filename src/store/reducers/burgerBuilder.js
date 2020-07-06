import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

const initalState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
}


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

const addIngredient = (state, ingredientName) => {
    const updatedIngrdient = { [ingredientName]: state.ingredients[ingredientName] + 1 } //ingredientName is a string so [ingredientName] converts it to property
    const updatedIngredients = updateObject(state.ingredients, updatedIngrdient)
    const updatedState = {
        ingredients: updatedIngredients,
        building: true,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[ingredientName]
    }
    return updateObject(state, updatedState)
}

const removeIngredient = (state, ingredientName) => {
    const updatedIng = { [ingredientName]: state.ingredients[ingredientName] - 1 }
    const updatedIngs = updateObject(state.ingredients, updatedIng)
    const updatedSt = {
        ingredients: updatedIngs,
        building: true,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[ingredientName]
    }
    return updateObject(state, updatedSt)
}

const setIngredinets = (state, ingredients) => {
    return updateObject(state, {
        ingredients,
        building: false,
        totalPrice: 4,
        error: false
    })
}

const fetchIngredientFailed = (state) => {
    return updateObject(state, {
        error: true
    })
}

const reducer = (state = initalState, { type, ingredientName, ingredients }) => {
    switch (type) {
        case actionTypes.ADD_INGREDIENT:
            return addIngredient(state, ingredientName)

        case actionTypes.REMOVE_INGREDIENT:
            return removeIngredient(state, ingredientName)

        case actionTypes.SET_INGREDIENT:
            return setIngredinets(state, ingredients)

        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return fetchIngredientFailed(state)

        default: return state
    }
}



export default reducer