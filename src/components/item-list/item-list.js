import React from "react";
import { Link } from "react-router-dom";

import './item-list.css';


const ItemList = (props) => {
    const { data, onItemSelected, children:renderLabel } = props;
    const items = data.map((item, index) => {
        const { id } = item
        const label = renderLabel(item)
        return (
            <Link  key={id} to={`/starships/${id}`}>
                <li className="list-group-item" onClick={() => onItemSelected(id)}>
                    {label}
                </li>
            </Link>
        )
    })
      
    return (
        <ul className="item-list list-group"> 
            {items}
        </ul>
    )
}


export default ItemList