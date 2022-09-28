import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './Nav.css';

export default function Nav(){


    return(
        <div className="Nav2_Container">
            <h1 className="Nav2_Title">PI-Food Henry</h1>
            <Link to='/home'>
                <button class="button-Nav2" role="button">Home</button>
            </Link>
        </div>
    )
}