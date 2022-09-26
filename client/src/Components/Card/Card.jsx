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

    const Alldiets= diets.join(', ')
    return(
        <div className='nav_container'>
            <div className={createdInDb === false?'title-center' : "title-button" }>
                <h1 className={createdInDb === false? "Name_Card": 'Name_Card2'}>{name[0].toUpperCase()+name.slice(1)}</h1>
                {
                    createdInDb === true? 
                    <button onClick={e=> handleClick ()} className='buttonDelete'>x</button>
                    : <div></div>
                }
            </div>
            <img src={img} alt={`receta ${name}`} className="img_recipe"/>
            <h3 className="diets title-diets">Diets:</h3>
            <h3 className="diets"> {Alldiets}</h3>
            <Link to={`/recipes/${id}`}>
                <button class="button-59" role="button">Mas Detalles</button>
            </Link>
        </div>
    );
};