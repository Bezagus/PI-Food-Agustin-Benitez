import React, {useState}from "react";
import { useDispatch } from "react-redux";
import { deleteDb } from "../../Actions";

export default function ButtonDelete(id){
    const dispatch= useDispatch();

    const [input, setInput]= useState({
        id: id
    })
    function handleClick (){
        dispatch(deleteDb(input))
        return alert('Se elimino correctamente')
    }

    return(
        <button onClick={e=>handleClick ()}>X</button>
    )
}