
import React from 'react'
import "./Data.css"

const data = (props) => {
    return(
    <div className="Duty">
    <p>Model: {props.model}</p>
    <p>Make: {props.make}</p>
    <p>Seller: {props.sold}</p>
    <p>Price: {props.price}</p>
    </div>

);
};


export default data;