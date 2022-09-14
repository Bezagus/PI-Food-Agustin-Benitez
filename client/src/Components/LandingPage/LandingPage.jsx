import React from 'react';
import {Link} from 'react-router-dom';
import './LandingPage.css'


export default function LandingPage(){
    return(
        <div className='Landing_Container'>
            <div className='Landing_Info'>
                    <Link to='/home'>
                        <button class="button-36" role="button">Ingresar</button>
                    </Link>
                <h2 className='Landing_Name'>Creado por: Agustin Benitez</h2>
            </div>
        </div>
    )
}