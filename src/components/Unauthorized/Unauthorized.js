import React from "react";
import { Link } from "react-router-dom";

function Unauthorized() {
    return (
        <nav className="header__menu">
            <Link to="/signup" className={`link header__register-link`}>
                Регистрация
            </Link>
            <div className={`header__login-link-container`}>
                <Link to="/signin" className={`link header__login-link`}>
                    Войти
                </Link>
            </div>
        </nav>
    )
}
export default Unauthorized;