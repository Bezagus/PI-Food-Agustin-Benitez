import React from "react";
import { Link, NavLink } from "react-router-dom";
import './Card.css'

export default function Card({img, name, diets, id}){
    return(
        <div className='nav_container'>
        <img src={img} alt={`receta ${name}`} className="img_recipe"/>
        <h1 className="Name_Card">{name[0].toUpperCase()+name.slice(1)}</h1>
        <ul className="ul_diets">
            {
                diets && diets.map(el=>{
                    return(
                        <li>||{el[0].toUpperCase()+el.slice(1)}||</li>
                    )
                })
            } 
        </ul>
        <Link to={`/recipes/${id}`}>
            <button class="button-59" role="button">Mas Detalles</button>
        </Link>
</div>
    );
};