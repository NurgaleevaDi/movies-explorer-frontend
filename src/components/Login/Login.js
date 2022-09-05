import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg"

function Login(props) {
    const [email, setEmail] = useState("");
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [errorEmail, setErrorEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isValidPassword, setIsValidPassword] = useState(false);
    const [errorPassword, setErrorPassword] = useState("");

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
        props.handleLogin(email, password);
    }

    return(
        <div className="register">
           <div className="register__header">
                <Link to="/" className="register__logo-link link">
                    <img src={logo} className="register__logo-img" alt="Логотип"></img>
                </Link>
                <p className="register__title">Рады видеть!</p>
            </div>
            <form className="register__form register__form_login" onSubmit={handleSubmit} noValidate>
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
                    <span className="register__error-message">{props.errorLogin}</span>
                    <button type="submit" className="register__btn button" disabled={!(isValidEmail && isValidPassword)}>Войти</button>
                    <p className="register__signin">
                        Еще не зарегистрированы?
                        <Link to="/signup" className="register__signin-link">Регистрация</Link>
                    </p>
                </div>
            </form>
        </div>
    )
}
export default Login;