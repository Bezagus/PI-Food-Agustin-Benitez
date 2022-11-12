import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Nav(){


    return(
        <div className="Nav_Container">
            <h1 className="Nav_Title">PI-Food Henry</h1>
            <Link to='/home'>
                <button class="button-Nav" role="button">Home</button>
            </Link>
        </div>
    )
}