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

    const allsteps = details.steps? details.steps : ['No Posee Pasos a Receta']
    return(
        <div>
            {
                details.id?
                <div>
                    
                <Nav/>

                <div className="div-container-detail">
                    <img src={details.img} alt={`img ${details.name}`} className='img-detail'/>
                    <h2 className="detail-name">{details.name}</h2>
                    <h3 className="detail-score">Health Score: <b className="number">{details.healthScore}</b></h3>
                    <div className="detail-diet">
                    <h3 className="title-diet">Dieta:</h3>
                    <ul>
                    {
                        details.diets && details.diets.map(e=>{
                            return(
                                <li  className="li-diet">|| {e[0].toUpperCase()+e.slice(1)} ||</li>
                            )
                        })
                    }
                    </ul>
                    </div>
                    <h4 className="paso-detail">Paso a paso: </h4>
                    <ul className="steps-detail">
                    
                    {
                        allsteps && allsteps.map(el=>{
                            return(
                             <li className="li-steps">{el}</li>
                            )
                        })
                    }

                </ul>
                </div>
            </div>:
            <div>
            <Nav/>
            <LoadingPage/>
            </div>
            }
                    
        </div>
    )
};