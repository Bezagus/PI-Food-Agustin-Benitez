import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getRecipe, cleanRecipe, getDiets, addFavorite } from "../../Actions";
import { Link } from 'react-router-dom';
import Nav from '../Nav/Nav';
import Card from "../Card/Card";
import './Home.scss'
import Filters from "../Filters/Filters";
import Paginated from "../Paginated/Paginated";
import LoadingPage from "../LoadingPage/LoadingPage";

export default function Home(){
    const dispatch = useDispatch();
    const allRecipes = useSelector((state)=> state.recipes);

    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage, setRecipesPerPage] = useState(9);
    const indexOfLastRecipes = currentPage * recipesPerPage;
    const indexOfFirstRecipes = indexOfLastRecipes - recipesPerPage;

    const currentRecipes = allRecipes.slice(indexOfFirstRecipes, indexOfLastRecipes);

    const pagination = pageNumber => {
        setCurrentPage(pageNumber);
    }

    useEffect(()=>{
        dispatch(getRecipe())
    },[dispatch]);
    
    return(
        <div className="parent">
            {
                allRecipes.length > 0 ? 
                <div className="dis-constainer"> 
                    <Nav className='div1'/>
                    <div className='home_container'>
                        <div className="aling-filter">
                        <div className='container_filter'>
                            <Filters className='div2'/>
                        </div>
                        </div>
                        <div className='constainer_Cards div3'>
                            <div className='cards_container'>
                                {
                                    currentRecipes?.map(el=>{
                                            return(
                                                <div>
                                                <div>
                                                    <Card img={el.img} name={el.name} diets={el.diets} id={el.id}  healthScore={el.healthScore} createdInDb={el.createdInDb}/>
                                                </div>
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
                            currentRecipes={currentRecipes}
                            currentPage={currentPage}
                        />
                    </div>
                </div>: 
                <LoadingPage/>
            }
            
        </div>
    )
}