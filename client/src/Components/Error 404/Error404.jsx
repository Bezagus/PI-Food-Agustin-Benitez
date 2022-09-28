import React from "react";
import './Error404.css';
import { Link } from "react-router-dom";

export default function Error404(){
    return(
        <div className='Landing_Container'>
            <div className='Landing_Info'>
                <h1 className='aling-error'>Error: Page Not Found</h1>
                    <Link to='/home'>
                        <button class="button-error aling-error" role="button">To Return</button>
                    </Link>
            </div>
        </div>
    )
};