import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import { cleanDetail, detailCard } from '../../Actions';
import Nav from '../Nav 2/Nav.jsx';
import './Details.css';
import LoadingPage from "../LoadingPage/LoadingPage";

export default function Details(){
    const {id} = useParams();
    const dispatch = useDispatch();
    const details = useSelector((state)=> state.detail);

    useEffect(()=>{
        dispatch(cleanDetail())
    },[])

    useEffect(()=>{
        dispatch(detailCard(id))
    },[])


    return(
        <div>
                    <div>
                    
                        <Nav/>

                        <div>
                            <h2>{details.name}</h2>
                            <img src={details.img} alt={`img ${details.name}`}/>
                            <h3>Score: {details.score}</h3>
                            <h3>Health Score: {details.healthScore}</h3>
                            <h3>Dieta:</h3>
                            <ul>
                            {
                                details.diets && details.diets.map(e=>{
                                    return(
                                        <li>{e}</li>
                                    )
                                })
                            }
                            </ul>
                            <h4>Paso a paso: </h4>
                            <ul>
                            {
                                details.steps && details.steps.map(el=>{
                                    return(
                                     <li>{el}</li>
                                    )
                                })
                            }

                        </ul>
                        </div>
                    </div>
        </div>
    )
};