import React from "react";
import './Error404.css';
import { Link } from "react-router-dom";

export default function Error404(){
    return(
        <div className='Landing_Container'>
            <div className='Landing_Info'>
                <h1 className='aling-error'>Error: Pagina no Encontrada</h1>
                    <Link to='/home'>
                        <button class="button-36-error aling-error" role="button">Ingresar</button>
                    </Link>
            </div>
        </div>
    )
};