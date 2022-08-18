import React from "react";
import { Link } from "react-router-dom";
import Header from "../Header/Header";

function Profile() {
    return(
        <div className="profile">
            <Header 
                className="header_white"
                invisible="header__invisible"
                button="header__invisible-button"
            />
            <h2 className="profile__title">Привет, Виталий!</h2>
            <form className="profile__form">
                <div className="profile__input-container">
                    <p className="profile__input-discription">Имя</p>
                    <input 
                        className="profile__input-text profile__input-text_name" 
                        type="text" 
                        name="username"
                        placeholder="Имя"
                        value="Виталий"
                        required
                        minLength="2"
                        maxLength="30"
                    />
                </div>
                <div className="profile__input-container">
                    <p className="profile__input-discription">E-mail</p>
                    <input 
                        className="profile__input-text profile__input-text_email"
                        type="text"
                        name="useremail"
                        placeholder="E-mail"
                        value="pochta@yandex.ru"
                        required
                        minLength="2"
                        maxLength="30"
                    />
                </div>   
            </form>
            <footer className="profile__footer">
                <button type="button" className="profile__btn button">Редактировать</button>
                <Link to="/signin" className="profile__signout-link link">
                    Выйти из аккаунта
                </Link>
            </footer>
        </div>
    )
}
export default Profile;