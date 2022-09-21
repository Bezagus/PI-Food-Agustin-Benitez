import React from "react";
import {useDispatch, useSelector} from 'react-redux';
import SearchBar from "../SearchBar/SearchBar";
import { getRecipe, filterRecipesByDiets, ordenByName, ordenByScore } from "../../Actions";
import './Filters.css'


export default function Filters(){

    const dispatch = useDispatch();
    const allRecipes = useSelector((state)=> state.recipes);
    
    function handleFilterDiet(e){
        if(e.target.value !== 'default'){
            dispatch(filterRecipesByDiets(e.target.value))
        }
    };
    function handleOrdenByName(e){
        if(e.target.value !== 'default'){
            dispatch(ordenByName(e.target.value))
        }
    };
    function handleOrdenByScore(e){
        if(e.target.value !== 'default'){
            dispatch(ordenByScore(e.target.value))
        }
    }
    
    return(
        <div className="container">
            <div>
                <SearchBar/>
            </div>
            <dv>
                <h4 className="h4">Filtros</h4>
                <h5 className="h4">Dieta</h5>
                <select className='select_constiner' onChange={e=>handleFilterDiet(e)}>
                    <option value='default'>Todos</option>
                    <option value='gluten free'>Gluten free</option>
                    <option value='lacto ovo vegetarian'>Lacto ovo vegetarian</option>
                    <option value='paleolithic'>Paleolithic</option>
                    <option value='dairy free'>Dairy free</option>
                    <option value='vegan'>Vegan</option>
                    <option value='primal'>Primal</option>
                    <option value='whole 30'>Whole 30</option>
                    <option value='pescatarian'>Pescatarian</option>
                </select>
                <h5 className="h4">Alfabeticamente</h5>
                <select className='select_constiner' onChange={e=>handleOrdenByName(e)}>
                    <option value='default'>Default</option>
                    <option value='asc'>Asendente</option>
                    <option values='desc'>Desendente</option>
                </select>
                <h5 className="h4">Nivel Saludable</h5>
                <select className='select_constiner' onChange={e=>handleOrdenByScore(e)}>
                    <option value='default'>Default</option>
                    <option value='asc'>Asendente</option>
                    <option value='desc'>Desendente</option>
                </select>
            </dv>
        </div>
    )
};