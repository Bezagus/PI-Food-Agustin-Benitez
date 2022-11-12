import React, {useState}from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteDb, getRecipe, addFavorite } from "../../Actions";
import { Link, NavLink } from "react-router-dom";
import ButtonDelete from "../button delete/buttonDelete";
import './Card.scss'

export default function Card({img, name, diets, id, createdInDb, healthScore}){

    const dispatch= useDispatch();
    
    function handleClick (){
        dispatch(deleteDb(id));
        dispatch(getRecipe())
        return alert('Se elimino correctamente')
    }
    
    function handlefavorite(e){
            dispatch(addFavorite(id))
            return alert(`Se agrego: ${e}`)
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
            <div className='dietcont'>
            <h3 className="diets title-diets">Diets:</h3>
            <h3 className="diets"> {Alldiets}</h3>
            </div>
            <h6 className="diets">{healthScore}</h6>
            {/* <button onClick={e=> handlefavorite(name)}>Agregar Fav</button> */}
            <Link to={`/recipes/${id}`}>
                <button class="button-more" role="button">More Details</button>
            </Link>
        </div>
    );
};