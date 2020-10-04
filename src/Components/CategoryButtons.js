import React from 'react';
import { NavLink } from 'react-router-dom';

const CategoryButtons = props => { 
    return (
        <div className="category-buttons">
            <li onClick={ () => props.Clicked(props.favCategories[0])}>
                <NavLink to = {`/${props.favCategories[0]}`} >{props.favCategories[0]}</NavLink>
            </li>
            <li onClick={ () => props.Clicked(props.favCategories[1])}>
                <NavLink to = {`/${props.favCategories[1]}`} >{props.favCategories[1]} </NavLink>
            </li>
            <li onClick={ () => props.Clicked(props.favCategories[2])}>
                <NavLink to = {`/${props.favCategories[2]}`} >{props.favCategories[2]}</NavLink>
            </li> 
        </div>     
    );
      
}


export default CategoryButtons;