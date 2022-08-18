import React from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import AboutProject from "./AboutProject/AboutProject";
import NavTab from "./NavTab/NavTab";
import Portfolio from "./Portfolio/Portfolio";
import Promo from "./Promo/Promo";
import Techs from "./Techs/Techs";
import AboutMe from "./AboutMe/AboutMe";

function Main() {
    return(
        <main className="main">
            <Header 
                link="/signup"
                name="Войти"
                nameLink="Регистрация"
                invisibleBurger="header__burger-invisible"   
            />
            <Promo />
            <NavTab />
            <AboutProject />
            <Techs />
            <AboutMe />
            <Portfolio />
            <Footer />
        </main>
    )
}
export default Main;