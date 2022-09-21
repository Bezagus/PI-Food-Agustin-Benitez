import React from "react";
import './Error404.css';
import { Link } from "react-router-dom";

export default function Error404(){
    return(
        <div className="container_404">
            <h2 className="h2_error">Pagina No Existe</h2>
            <Link to='/'>
                <button className="button_error button-36" role="button">Volver</button>
            </Link>
        </div>
    )
};