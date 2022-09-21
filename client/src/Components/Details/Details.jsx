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
    const detail = useSelector((state)=> state.detail);

    useEffect(()=>{
        return ()=> {
            dispatch(cleanDetail())
        }
    },[dispatch]);

    useEffect(()=>{
        dispatch(detailCard(id))
    },[dispatch,id])


    return(
        <div>
            {
                detail.length > 0?
                    <div>
                    
                        <Nav/>

                        <div>
                            <h2>{detail.name}</h2>
                            <img src={detail.img} alt={`img ${detail.name}`}/>
                            <h3>Score: {detail.score}</h3>
                            <h3>Health Score: {detail.healthScore}</h3>
                            <h3>Dieta:</h3>
                            <ul>
                            {
                                detail.diets && detail.diets.map(e=>{
                                    return(
                                        <li>{e}</li>
                                    )
                                })
                            }
                            </ul>
                            <h4>Paso a paso: </h4>
                            <ul>
                            {
                                detail.steps && detail.steps.map(el=>{
                                    return(
                                     <li>{el}</li>
                                    )
                                })
                            }

                        </ul>
                        </div>
                    </div>:
                    <LoadingPage/>
            }
        </div>
    )
};