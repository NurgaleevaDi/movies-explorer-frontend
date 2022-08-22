import React from "react";
import { useState } from "react";

function Input(props) {
    const [value, setValue] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [error, setError] = useState(''); 

    function handleChange(evt) {
        const input = evt.target;
        console.log('event ', input.validity);
        setValue(input.value);
        setIsValid(input.validity.valid);
        if (!isValid) {
            setError(input.validationMessage);
        } 
        else {
            setError('');
        }
    }
    return (
        <div className="input__container">
        <p className="input__disription">{props.discription}</p>
        <input 
            className="input__text"
            type={props.type} 
            name={props.name}
            placeholder={props.placeholder}
            value={value || ""}
            onChange={handleChange}
        />
        <span className="input__error-message">{error}</span> 
    </div>
    )
}

export default Input;