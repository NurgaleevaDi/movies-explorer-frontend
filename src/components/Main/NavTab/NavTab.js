import React from "react";

function NavTab() {
    return(
        <div className="navTab">
            <ul className="navTab__menu">
                <li className="navTab__item"> 
                    <a className="link navTab__link" href="#about-project">О проекте</a>
                </li>
                <li className="navTab__item"> 
                    <a className="link navTab__link" href="#techs">Технологии</a>
                </li>
                <li className="navTab__item"> 
                    <a className="link navTab__link" href="#about-me">Студент</a>
                </li>
            </ul>
            <div id="test"></div>
        </div>
    )
}
export default NavTab;