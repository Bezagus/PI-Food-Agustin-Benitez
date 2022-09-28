import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchBar } from "../../Actions";
import './SearchBar.css'

export default function SearchBar(){

    const dispatch = useDispatch();
    const [name, setName] = useState('');
    
    const handleInputChange = (e) => {
            e.preventDefault();
            setName(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(searchBar(name))
        setName('');
    }

    return(
        <div className="wrapper">
            <form onSubmit={e => {handleSubmit(e)}}>
                <input type="text" placeholder="Name..." onChange={e => {handleInputChange(e)}} value={name} className='search' />
                <button type="submit"  className="submit">Search.</button>
            </form>
        </div>
    )
};