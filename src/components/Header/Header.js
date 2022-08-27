import React from "react";
import { useState } from "react";
import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import Unauthorized from "../Unauthorized/Unauthorized";
import { CurrentUserContext } from "../../context/CurrentUserContext.js";

function Header(props) {
    const currentUser = React.useContext(CurrentUserContext);
    
    const [openMenu, setOpenMenu] = useState(false);

    function handleOpenMenu() {
        setOpenMenu(true);
    }
    function handleCloseMenu() {
        setOpenMenu(false);
    }

    return(
        <header className={`header ${props.className}`}>
            <Link to="/" className="header__logo-link link">
                <img className="header__logo" src={logo} alt="Логотип" />
            </Link>
            {currentUser._id
                ? <Navigation 
                    onClose={handleCloseMenu}
                    onOpen={openMenu}
                    textColor={props.textColor}
                    handleSignOut={props.handleSignOut}
                /> 
                : <Unauthorized /> }
            <button  type="button" className={`header__burger-container button ${!currentUser._id ? "header__burger-container_inv" : ""}`} onClick={handleOpenMenu}>
                <span className={`header__burger-icon`}></span>
            </button>
        </header>
    )
}
export default Header;