import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import Input from "../Input/Input";

function Register() {
    return(
        <div className="register">
            <div className="register__header">
                <Link to="/" className="register__logo-link link">
                    <img src={logo} className="register__logo-img" alt="Логотип"></img>
                </Link>
                <p className="register__title">Добро пожаловать!</p>
             </div>
            <form className="register__form">
                <Input
                    discription="Имя"
                    type="text" 
                    name="username"
                    placeholder="Имя"
                    value="Виталий"
                    required
                    minLength="2"
                    maxLength="30"
                />
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
                    spantext="Что-то пошло не так..."
                />
            </form>
            <div className="register__footer">
                <button type="button" className="register__btn">Зарегистрироваться</button>
                <p className="register__signin">
                    Уже зарегистрированы?
                    <Link to="/signin" className="register__signin-link">Войти</Link>
                </p>
            </div>
        </div>
    )
}
export default Register;