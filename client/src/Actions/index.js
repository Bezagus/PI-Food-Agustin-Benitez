import axios from 'axios';

export function getRecipe(){
    return async function(dispatch){
        var json = await axios.get('http://localhost:3001/recipes');

        return dispatch({
            type: 'GET_RECIPES',
            payload: json.data
        })
    }
}