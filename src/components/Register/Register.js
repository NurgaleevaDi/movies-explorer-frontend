import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";


function Register(props) {
    const [name, setName] = useState("");
    const [isValidName, setIsValidName] = useState(false);
    const [errorName, setErrorName] = useState("");
    const [email, setEmail] = useState("");
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [errorEmail, setErrorEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isValidPassword, setIsValidPassword] = useState(false);
    const [errorPassword, setErrorPassword] = useState("");

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

    function handlePasswordChange(evt) {
        const input = evt.target;
        setPassword(input.value);
        setIsValidPassword(input.validity.valid);
        if(!isValidPassword) {
            setErrorPassword(input.validationMessage)
        } else {
            setErrorPassword("");
        }
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        props.handleRegister(email, password, name);
    }

    return(
        <div className="register">
            <div className="register__header">
                <Link to="/" className="register__logo-link link">
                    <img src={logo} className="register__logo-img" alt="Логотип"></img>
                </Link>
                <p className="register__title">Добро пожаловать!</p>
             </div>
            <form className="register__form" onSubmit={handleSubmit} noValidate>
                <div className="input__container">
                    <p className="input__disription">Имя</p>
                    <input
                        className="input__text"
                        type="text"
                        name="username"
                        placeholder="Имя"
                        required
                        minLength="2"
                        maxLength="30"
                        value={name || ""}
                        onChange={handleNameChange}
                    />
                    <span className="input__error-message">{errorName}</span>
                </div>
                <div className="input__container">
                    <p className="input__disription">E-mail</p>
                    <input
                        className="input__text"
                        type="email"
                        name="useremail"
                        placeholder="pochta@yandex.ru"
                        required
                        minLength="2"
                        maxLength="30"
                        value={email || ""}
                        onChange={handleEmailChange}
                    />
                    <span className="input__error-message">{errorEmail}</span>
                </div>
                <div className="input__container">
                    <p className="input__disription">Пароль</p>
                    <input
                        className="input__text"
                        type="password"
                        name="password"
                        placeholder="Пароль"
                        required
                        value={password || ""}
                        onChange={handlePasswordChange}
                    />
                    <span className="input__error-message">{errorPassword}</span>
                </div>
                <div className="register__footer">
                    <span className="register__error-message">{props.errorRegister}</span>
                    <button type="submit" className="register__btn button" disabled={!(isValidEmail && isValidPassword && isValidName)}>Зарегистрироваться</button>
                    <p className="register__signin">
                        Уже зарегистрированы?
                        <Link to="/signin" className="register__signin-link">Войти</Link>
                    </p>
                </div>
            </form>
        </div>
    )
}
export default Register;