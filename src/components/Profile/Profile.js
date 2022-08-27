import React from "react";
import { useState } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext.js";
import Header from "../Header/Header";

function Profile(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = useState("");
    const [isValidName, setIsValidName] = useState(false);
    const [errorName, setErrorName] = useState("");
    const [email, setEmail] = useState("");
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [errorEmail, setErrorEmail] = useState("");

    function handleNameChange(evt) {
        const input = evt.target;
        setName(input.value);
        setIsValidName(input.validity.valid);
        if(!isValidName) {
            setErrorName(input.validationMessage)
        } else {
            setErrorName("");
        }
    }

    function handleEmailChange(evt) {
        const input = evt.target;
        setEmail(input.value);
        setIsValidEmail(input.validity.valid);
        if(!isValidEmail) {
            setErrorEmail(input.validationMessage)
        } else {
            setErrorEmail("");
        }
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        props.onUpdateUser({ name, email });
    }

    return(
        <div className="profile">
            <Header 
                className="header_white"
                textColor="navigation__menu-navlink_black"
                invisible="header__invisible"
                button="header__invisible-button"
            />
            <h2 className="profile__title">Привет, {currentUser.name}!</h2>
            <form className="profile__form" onSubmit={handleSubmit}>
                <div className="profile__input-container">
                    <p className="profile__input-discription">Имя</p>
                    <input 
                        className="profile__input-text profile__input-text_name" 
                        type="text" 
                        name="username"
                        placeholder={currentUser.name}
                        value={name || ""} 
                        // required
                        minLength="2"
                        maxLength="30"
                        onChange={handleNameChange}
                    />
                    <span className="input__error-message">{errorName}</span>
                </div>
                <div className="profile__input-container">
                    <p className="profile__input-discription">E-mail</p>
                    <input 
                        className="profile__input-text profile__input-text_email"
                        type="email"
                        name="useremail"
                        placeholder="E-mail"
                        value={email || ""}
                        // required
                        onChange={handleEmailChange}
                    />
                    <span className="input__error-message">{errorEmail}</span>
                </div>   
            
            <footer className="profile__footer">
                <button 
                    type="submit"
                    className="profile__btn button"
                    disabled={!(isValidEmail || isValidName)}>
                    Редактировать
                </button>
            
                <button type="button" className="profile__signout-btn button" onClick={props.handleSignOut}>
                    Выйти из аккаунта
                </button>
            </footer>
            </form>
        </div>
    )
}
export default Profile;