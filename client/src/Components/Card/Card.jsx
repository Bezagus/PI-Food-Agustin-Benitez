import React, {useState}from "react";
import { useDispatch } from "react-redux";
import { deleteDb, getRecipe } from "../../Actions";
import { Link, NavLink } from "react-router-dom";
import ButtonDelete from "../button delete/buttonDelete";
import './Card.css'

export default function Card({img, name, diets, id, createdInDb}){

    const dispatch= useDispatch();
    const [input, setInput]= useState({
        id: id
    })
    function handleClick (){
        dispatch(deleteDb(id));
        dispatch(getRecipe())
        return alert('Se elimino correctamente')
    }


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
        {
            createdInDb === true? 
            <button onClick={e=> handleClick ()}>x</button>
            : <div></div>
        }
        <Link to={`/recipes/${id}`}>
            <button class="button-59" role="button">Mas Detalles</button>
        </Link>
</div>
    );
};