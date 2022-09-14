import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getRecipe } from "../../Actions";
import { Link } from 'react-router-dom'

export default function Home(){
    const dispatch = useDispatch();
    const allRecipes = useSelector((state)=> state.recipes);

    useEffect(()=>{
        dispatch(getRecipe())
    },[]);

    function handleClik(e){
        e.preventDefault();
        dispatch(getRecipe());
    }
    return(
        <div>
            <Link to='/Recipes'>
                <button>Crear Receta</button>
            </Link>
            <h1>PI-Food 100 Recetas</h1>

            <button onClick={e=>handleClik(e)}>Refrescar</button>
        </div>
    )
}