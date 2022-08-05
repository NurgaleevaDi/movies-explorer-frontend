import React from "react";
import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";

function Header(props) {
    return(
        <header className="header">
            <img className="header__logo" src={logo} alt="Логотип" />
            <div className="header__menu">
                <Link to={props.link} className="link header__link">
                    {props.nameLink}
                </Link>
                <button className="button header__button">
                    {props.name}
                </button>
            </div>
        </header>
    )
}
export default Header;