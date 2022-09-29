import React from "react";
import './Paginated.css';


export default function Paginated({recipesPerPage, allRecipes, pagination,currentPage}){
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(allRecipes/recipesPerPage); i++) {
        pageNumbers.push(i);        
    }

    return(
        <nav>
            <ul className="ul_list">
                {
                    pageNumbers?.map(number => (
                        <li key={number} className='li_list'>
                            <a className={currentPage === number?'select-page a_list' : 'a_list' } onClick={() => pagination(number)}>{number}</a>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
};