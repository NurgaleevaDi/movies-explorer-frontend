import React from "react";

function Input(props) {
    return (
        <div className="input__container">
        <p className="input__disription">{props.discription}</p>
        <input 
            className="input__text"
            type={props.type} 
            name={props.name}
            placeholder={props.placeholder}
            value={props.value}
        />
        <span className="input__error-message">{props.spantext}</span> 
    </div>
    )
}

export default Input;