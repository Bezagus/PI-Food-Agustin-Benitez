import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './Nav.css';

export default function Nav(){


    return(
        <div className="Nav_Container">
            <h1 className="Nav_Title">PI-Food Henry</h1>
            <Link to='/CreateRecipe'>
                <button class="button-36-Nav" role="button">Crear Receta</button>
            </Link>
        </div>
    )
}