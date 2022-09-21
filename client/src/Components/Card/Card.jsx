import React from "react";
import { NavLink } from "react-router-dom";
import './Card.css'

export default function Card({img, name, diets, id, healthScore}){
    return(
        <div className='nav_container'>
            <NavLink to={`/recipes/${id}`}>
                <img src={img} alt={`receta ${name}`} className="img_recipe"/>
                <h3 className="Name_Card">{name}</h3>
                <h3 className="Name_Card">{healthScore}</h3>
                <ul className="ul_diets">
                    {
                        diets && diets.map(el=>{
                            return(
                                <li>{el}</li>
                            )
                        })
                    } 
                </ul>
            </NavLink>
        </div>
    );
};