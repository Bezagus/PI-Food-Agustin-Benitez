import axios from 'axios';

export function getRecipe(){
    return async function(dispatch){
        var json = await axios.get('http://localhost:3001/recipes');

        return dispatch({
            type: 'GET_RECIPES',
            payload: json.data
        })
    }
};

export function cleanRecipe(payload){
    return{
        type: 'CLEAN_RECIPE',
        payload
    }
}

export function filterRecipesByDiets(payload){
    return{
        type:'FILTER_BY_DIET',
        payload: payload
    }
};

export function ordenByName(payload){
    console.log('entre a la action')
    return{
        type: 'ORDEN_BY_NAME',
        payload: payload,
    }
};

export function ordenByScore(payload){
    return{
        type: 'ORDEN_BY_SCORE',
        payload: payload,
    }
};

export function cleanDetail(payload){
    return{
        type: 'CLEAN_DETAIL',
        payload: payload,
    }
}

export function detailCard(payload){
    return async function(dispatch){
        var json = await axios.get(`http://localhost:3001/recipes/${payload}`);

        return dispatch({
            type: 'DETAIL_CARD',
            payload: json.data
        })
    }
}

export function searchBar(payload){
    return{
        type: 'SEARCH_BAR',
        payload: payload,
    }
}

