import React from "react";
import { useState } from "react";
import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import Unauthorized from "../Unauthorized/Unauthorized";

function Header(props) {
    const [openMenu, setOpenMenu] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    function handleOpenMenu() {
        setOpenMenu(true);
    }
    function handleCloseMenu() {
        setOpenMenu(false);
    }
    function handleLogged() {
        setIsLoggedIn(false);
    }
    console.log(isLoggedIn);

    return(
        <header className={`header ${props.className}`}>
            <Link to="/" className="header__logo-link link">
                <img className="header__logo" src={logo} alt="Логотип" />
            </Link>
            {isLoggedIn 
                ? <Navigation 
                    onClose={handleCloseMenu}
                    onOpen={openMenu}
                    textColor={props.textColor}
                /> 
                : <Unauthorized /> }
            <button  type="button" className={`header__burger-container button ${!isLoggedIn ? "header__burger-container_inv" : ""}`} onClick={handleOpenMenu}>
                <span className={`header__burger-icon`}></span>
            </button>
        </header>
    )
}
export default Header;