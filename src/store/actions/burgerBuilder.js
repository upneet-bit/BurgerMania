import axios from '../../axios/axios-orders';
import * as actionTypes from "./actionTypes";
 
export const addIngredients= (name)=>{
    return{
        type: actionTypes.ADD_INGREDIENTS,
        ingredientName: name
    }
}

export const removeIngredients= (name)=>{
    return{
        type: actionTypes.REMOVE_INGREDIENTS,
        ingredientName: name
    }
}

export const setIngredients= (ingredients)=>{
    return{
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

export const fetchIngredientsFailed= ()=>{
    return{
        type: actionTypes.FETCH_INREDIENTS_FAILED
    }
}

export const initIngredients =()=>{
    return dispatch =>{
     axios.get('/ingredients.json')
        .then(response =>{
            dispatch(setIngredients(response.data));
        })
        .catch(err =>{
          dispatch(fetchIngredientsFailed())
        })
    }
}