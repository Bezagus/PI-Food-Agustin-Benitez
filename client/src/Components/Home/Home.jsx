import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getRecipe, cleanRecipe, getDiets } from "../../Actions";
import { Link } from 'react-router-dom';
import Nav from '../Nav/Nav';
import Card from "../Card/Card";
import './Home.css'
import Filters from "../Filters/Filters";
import Paginated from "../Paginated/Paginated";
import LoadingPage from "../LoadingPage/LoadingPage";

export default function Home(){
    const dispatch = useDispatch();
    const allRecipes = useSelector((state)=> state.recipes);

    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage, setRecipesPerPage] = useState(12);
    const [order, setOrder] = useState('');
    const indexOfLastRecipes = currentPage * recipesPerPage;
    const indexOfFirstRecipes = indexOfLastRecipes - recipesPerPage;

    const currentRecipes = allRecipes.slice(indexOfFirstRecipes, indexOfLastRecipes);

    const pagination = pageNumber => {
        setCurrentPage(pageNumber);
    }

    useEffect(()=>{
        dispatch(getRecipe())
    },[dispatch]);
    

    function handleClik(e){
        e.preventDefault();
        dispatch(getRecipe());
    }
    return(
        <div>
            {
                allRecipes.length > 0 ? 
                <div> 
                    <Nav/>
            <div className='home_container'>
                <div className='container_filter'>
                    <Filters/>
                    <button onClick={e=>handleClik(e)} className='btn_clear'>Refrescar</button>
                </div>
                <div className='constainer_Cards'>
                    <div className='cards_container'>
                        {
                            currentRecipes?.map(el=>{
                                return(
                                    <div>
                                    <Card img={el.img} name={el.name} diets={el.diets} id={el.id}  healthScore={el.healthScore}/>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <div className='pagination_home'>
                <Paginated
                    recipesPerPage={recipesPerPage}
                    allRecipes={allRecipes.length}
                    pagination={pagination}
                />
            </div>
                </div> : 
                <LoadingPage/>

            }
            
        </div>
    )
}