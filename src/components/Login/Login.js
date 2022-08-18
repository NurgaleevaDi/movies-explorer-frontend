import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg"
import Input from "../Input/Input";

function Login() {
    return(
        <div className="register">
           <div className="register__header">
                <Link to="/" className="register__logo-link link">
                    <img src={logo} className="register__logo-img" alt="Логотип"></img>
                </Link>
                <p className="register__title">Рады видеть!</p>
            </div>
            <form className="register__form">
                <Input 
                    discription="E-mail"
                    type="text" 
                    name="useremail"
                    placeholder="E-mail"
                    value="pochta@yandex.ru"
                    required
                    minLength="2"
                    maxLength="30"
                />
                 <Input
                    discription="Пароль"
                    type="password" 
                    name="password"
                    placeholder="Пароль"
                    value="Пароль"
                    required
                /> 
            </form>
            <div className="register__footer">
                <button type="button" className="register__btn">Войти</button>
                <p className="register__signin">
                    Еще не зарегистрированы?
                    <Link to="/signup" className="register__signin-link">Регистрация</Link>
                </p>
            </div>
        </div>
    )
}
export default Login;