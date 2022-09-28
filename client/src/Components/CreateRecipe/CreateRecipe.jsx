import React, { useState, useEffect } from "react";
import { Link , useHistory} from "react-router-dom";
import { useDispatch , useSelector } from "react-redux";
import Nav from '../Nav 2/Nav';
import './CreateRecipe.css';
import { getDiets, postRecipe } from "../../Actions";



export default function CreateRecipe(){
    
    const dispatch = useDispatch();
    const history = useHistory();
    const allDiets = useSelector((state)=> state.Diets);
    
    
    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        name:"",
        summary:"",
        healthScore:0,
        steps:"",
        img:"",
        diet:[],
    });

    function validate(newRecipe){
        let errors = {};
        if (!input.name){
            errors.name = "Tu Receta Necesita Nombre!"
        } else if (!input.diet.length){
            errors.diet = "Tu receta necesita dieta"
        }else if (!input.summary){
            errors.summary = "Tu Receta necesita un Resumen!"
        } else if(input.img.length > 255){
            errors.img = `Url hasta 255 caracteres(Caracteres:${input.img.length})`
        }else if(input.summary.length > 255){
            errors.summary = `Summary hasta 255 caracteres(Caracteres:${input.summary.length})`
        }else if(input.steps.length > 255){
            errors.steps = `Steps hasta 255  caracteres(Caracteres:${input.steps.length})`
        }else if(input.name.length > 255){
            errors.steps = `Name hasta 255  caracteres(Caracteres:${input.steps.length})`
        }
        return errors
    }
    
    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
        
    };

    function handleCheck(e){
        if(e.target.checked){
            setInput({
                ...input,
                diet: [...input.diet, e.target.value]
            })
            setErrors(validate({
                ...input,
                diet: [...input.diet, e.target.value]
            }))
            
        }
        if(!e.target.checked){
            setInput({
                ...input,
                diet: input.diet.filter(el=> el !== e.target.value)
            })
        }
    };

    function handleSubmit(e){
        if(!input.name){
            alert('Nombre required')
            return(false)
        }
        if(!input.summary){
            return(alert('Summary required'))
        }
        if(!input.diet.length){
            return(alert('Your Reipe required Diet'))
        }
        if(input.img.length > 255){
            return(alert('Url de imgen invalid'))
        }
        if(input.name.length > 255){
            return(alert('Name very long'))
        }
        if(input.summary.length > 255){
            return(alert('Summary very long'))
        }
        if(input.steps.length > 255){
            return(alert('Steps very long'))
        }
        if(input.healthScore > 100 || input.healthScore < 0){
            return(alert('Health Score invalid'))
        }
        if(!input.steps){
            input.steps = 'your recipe has no steps'
        }
        if(!input.img){
                input.img ='https://bestessayseducation.com/uploads/71/TEXT_HERE.png'
        }
        else if (!/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#()?&//=]*)/.test(input.img)) {
            return alert("Url imagen invalid");
            }
        dispatch(postRecipe(input))
        alert('Recipe Created!!')
        setInput({
            name:"",
            summary:"",
            healthScore:0,
            steps:"",
            img:"",
            diet:[]
        })
        history.push('/home')
    };


    useEffect(()=>{
        dispatch(getDiets())
    },[dispatch]);

    const selecDiet = input.diet.join(' ,')

    return(
        <div>
            <Nav/>
            <div className="div__constiner">
                <form onSubmit={(e) => handleSubmit(e)} className='form'>
                    <h1 className="title">Create Your Recipe</h1>
                    <div>
                        <div>
                            <h3 className="label_cont">Name:</h3>
                            <input className="input_cont" type='text' value={input.name} name='name' onChange={(e) => handleChange(e)} onPaste={(e) => handleChange(e)}/>
                            {errors.name && (<p className="error">{errors.name}</p>)}
                        </div>
                        <div className="cont-box">
                            <h3 className="label_cont dieta">Diets:</h3>
                            {allDiets.map(el=>{
                                return(
                                    <label className="checkbox">
                                        <input type='checkbox' name={el.name} value={el.name} onChange={(e) => handleCheck(e)} onPaste={(e) => handleCheck(e)}/>
                                        {el.name}
                                    </label>
                                )
                            })}
                            {errors.diet && (<p className="error">{errors.diet}</p>)}
                            {
                                selecDiet && <p className="select-diets">{selecDiet}</p>
                            }
                        </div>
                        <div>
                            <h3 className="label_cont">Summary:</h3>
                            <textarea className='input_cont resumen' type='text' value={input.summary} name='summary' onChange={(e) => handleChange(e)} onPaste={(e) => handleChange(e)}/>
                            {errors.summary && (<p className="error">{errors.summary}</p>)}
                        </div>
                        <div>
                            <h3 className="label_cont ">Health Score:</h3>
                            <div>
                            <input className='input_cont score' type="range" min="0" max="100" value={input.healthScore} name='healthScore' onChange={(e) => handleChange(e)}/>
                            <span className="score-text">{input.healthScore}</span>
                            </div>
                        </div>
                        <div>
                            <h3 className="label_cont">Url Image:</h3>
                            <input className='input_cont' type='text' value={input.img} name='img' onChange={(e) => handleChange(e)} onPaste={(e) => handleChange(e)}/>
                            {errors.img && (<p className="error">{errors.img}</p>)}
                        </div>
                        <div>
                            <h3 className="label_cont">Steps:</h3>
                            <textarea className='input_cont textarea' type='text' value={input.steps} name='steps'onChange={(e) => handleChange(e)} onPaste={(e) => handleChange(e)}/>
                            {errors.steps && (<p className="error">{errors.steps}</p>)}
                        </div>
                        
                        
                        <button type='submit' className='button-Nav3 btn_submit'>To Crete</button>
                    </div>
                </form>
            </div>
        </div>
    )
};

/* 


export default function CreateRecipe(){
    



    return(
        <div>
            <Nav/>
        <div className="div__constiner">
            <form className='form'>
            <h1 className="title">Crear Receta</h1>
            <div className="div_form div_div">
                <div>
                    <label className="label_cont">Nombre</label>
                    <input className='input_cont' type="text" value={newRecipe.name} name="name" onChange={(e) => handleChange(e)} />
                    {errors.name && (<p>{errors.name}</p>)}
                </div>
                <div>
                    <label className="label_cont">Summary</label>
                    <textarea className='input_cont resumen' type="text" value={newRecipe.summary} name="summary" onChange={(e) => handleChange(e)} />
                </div>
                <div>
                    <label className="label_cont">Health Score</label>
                    <input className='input_cont' type="range" min="0" max="100" value={newRecipe.healthScore} name="healthScore" onChange={(e) => handleChange(e)} />
                </div>
                <div>
                    <label className="label_cont">Pasos</label>
                    <textarea  className='input_cont textarea' type="text" value={newRecipe.steps} name="steps" onChange={(e) => handleChange(e)} />
                </div>
                <div>
                    <label className="label_cont">Imagen</label>
                    <input className='input_cont' type='text' value={newRecipe.img} name="img" onChange={(e) => handleChange(e)} />
                </div>
                <div>
                    <select onChange={(e)=> handleSelect(e)}>
                        <option value='' name="diets">Seleccionar Dieta</option>
                        <option value='dairy free' name="diets">dairy free</option>
                        <option value='gluten free' name="diets">gluten free</option>
                        <option value='lacto ovo vegetarian' name="diets">lacto ovo vegetarian</option>
                        <option value='vegan' name="diets">vegan</option>
                        <option value='pescatarian' name="diets">pescatarian</option>
                        <option value='paleolithic' name="diets">paleolithic</option>
                        <option value='primal' name="diets">primal</option>
                        <option value='whole 30' name="diets">whole 30</option>
                    </select>   
                </div>
                <button type="submit" className='button-36-Nav3 btn_submit' onClick={(e) => handleSubmit(e)}>Crear Receta</button>
            </div>
            </form>
        </div>
        </div>
    )
}

 */
