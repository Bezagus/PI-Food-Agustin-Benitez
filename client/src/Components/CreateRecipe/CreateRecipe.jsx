import React from "react";
import Nav from '../Nav 2/Nav';
import './CreateRecipe.css'

export default function CreateRecipe(){
    return(
        <div>
            <Nav/>
            <div className="div__constiner">
                <form className='form'>
                    <h2 className="title">Crear Receta</h2>
                    <div className="div_form">
                        <div className="div_div">
                            <label className="label_cont">Name:</label>
                            <input type='text' className='input_cont'/>
                            <label className="label_cont">Resumen:</label>
                            <textarea type='text' className='input_cont resumen'/>
                            <label className="label_cont">Health Score:</label>
                            <input type='number' min="1" max="100" placeholder='1' className='input_cont'/>
                        </div>
                        <div>
                            <label className="label_cont">Pasos:</label>
                            <textarea className='input_cont textarea'/>
                        </div>
                    </div>
                        <button  type='submit' className='button-36-Nav3 btn_submit'>Crear!</button>
                </form>
            </div>
        </div>
    )
};