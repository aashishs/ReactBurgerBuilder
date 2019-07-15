import * as actionTypes from '../actions/actionTypes';
import { updatedObject } from '../utility';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.4,
    cheese: 1.3,
    meat: 0.7
}

const addIngredient = (state, action) => {
    const updatedIng = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 };
    const updatedIngs = updatedObject(state.ingredients, updatedIng)
    const updatedState = {
        ingredients: updatedIngs,
        building: true,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    }
    return updatedObject(state, updatedState);
}

const removeIngredient = (state, action) => {
    const updatedIng2 = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 };
    const updatedIngs2 = updatedObject(state.ingredients, updatedIng2)
    const updatedState2 = {
        ingredients: updatedIngs2,
        building: true,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
    }
    return updatedObject(state, updatedState2);
}

const setIngredients = (state, action) => {
    return updatedObject(state, {
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat
        },
        totalPrice: 4,
        error: false,
        building: false
    });
}

const fetchIngredientFailed  = (state, action) => {
    return updatedObject(state, {
        error: true
    });
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_INGREDIENTS:
            return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENTS:
            return removeIngredient(state, action);
        case actionTypes.SET_INGREDIENTS:
            return setIngredients(state, action);
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return fetchIngredientFailed(state, action);
        default: 
            return state;
    }
};

export default reducer;