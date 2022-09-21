import axios from "axios";

const initialState = {
    recipes: [],
    allRecipes:[],
    Diets: [],
    recipesFiltered: [],
    detail: {},

}

function rooReducer (state= initialState, action){
    switch(action.type) {
        case 'GET_RECIPES':
            return{
                ...state,
                recipes: action.payload,
                allRecipes: action.payload,
                recipesFiltered: action.payload,
            }
        case 'CLEAN_RECIPE':
            return{
                ...state,
                recipes: {},
            }
        case 'FILTER_BY_DIET':
            const allRecipe = state.allRecipes;
            const statusFilter =  allRecipe.filter(el => el.diets.includes(action.payload))
            return{
                ...state,
                recipes: statusFilter,
            }  
        case 'ORDEN_BY_NAME':
            let orderedRecipes = [...state.recipes]
            orderedRecipes= 
                action.payload === 'asc' ?
                orderedRecipes.sort((a,b)=>{
                    if(a.name < b.name) return -1;
                    if(a.name > b.name) return 1;
                    return 0;
                }):
                    orderedRecipes.sort((a,b)=>{
                        if(a.name < b.name) return 1;
                        if(a.name > b.name) return -1;
                        return 0
                    })
            return{
                ...state,
                recipes: orderedRecipes,
            }  
        case 'ORDEN_BY_SCORE':
            let orderedRecipes2 = [...state.recipes]
            orderedRecipes2= 
                action.payload === 'asc' ?
                orderedRecipes2.sort((a,b)=>{
                    if(a.healthScore < b.healthScore) return 1;
                    if(a.healthScore > b.healthScore) return -1;
                    return 0;
                }):
                    orderedRecipes2.sort((a,b)=>{
                        if(a.healthScore < b.healthScore) return -1;
                        if(a.healthScore > b.healthScore) return 1;
                        return 0
                    })
            return{
                ...state,
                recipes: orderedRecipes2,
            } 
        case 'CLEAN_DETAIL':
            return{
                ...state,
                detail: {},
            }
        case 'DETAIL_CARD':
            return{
                ...state,
                detail: action.payload
            }
        case 'SEARCH_BAR':
            let resultSearch = [...state.allRecipes];
            resultSearch= resultSearch.filter(el=> el.name === action.payload);
            return{
                ...state,
                recipes: resultSearch
            }
        default: 
         return{
            ...state
         }
    }
}

export default rooReducer;