import React from "react";
import close from "../../images/close.svg";
import icon from "../../images/icon-profile.svg";
import { NavLink, Link } from "react-router-dom";
import { CurrentUserContext } from "../../context/CurrentUserContext";

function Navigation(props) {
    const currentUser = React.useContext(CurrentUserContext);
    
    return(
        <div className={`navigation ${props.onOpen ? "opened" : ""}`}>
            <div className={`navigation__menu `}>
                <button type="button" className="navigation__menu-close-btn button" onClick={props.onClose}>
                    <img src={close} className="navigation__menu-close-img" alt="Закрыть"/>
                </button>
                <nav className="navigation__menu-navlinks">
                    <NavLink exact to="/" className={`navigation__menu-navlink link navigation__menu-navlink_inv`}>Главная</NavLink>
                    <NavLink to="/movies" className={`navigation__menu-navlink link ${props.textColor}`}>Фильмы</NavLink>
                    <NavLink to="/saved-movies" className={`navigation__menu-navlink link ${props.textColor}`}>Сохраненные фильмы</NavLink>
                </nav> 
                <div className="navigation__profile">
                    <p className={`navigation__profile-name ${props.textColor}`}>{currentUser.name}</p>
                    <button type="button" className="navigation__profile-button button">
                        <Link to="/profile">
                            <img className="navigation__profile-img" src={icon} alt="Profile" />
                        </Link>
                    </button>
                </div>
            </div>
        </div>  
    )
}
export default Navigation;