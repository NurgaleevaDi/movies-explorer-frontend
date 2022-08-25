import React from "react";
import { useState } from "react";
import Header from "../Header/Header";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import SearchForm from "../Movies/SearchForm/SearchForm"

function Movies(props) {
    // console.log('Movies props ', props);
    const [openMenu, setOpenMenu] = useState(false);

    function handleOpenMenu() {
        setOpenMenu(true);
    }
    function handleCloseMenu() {
        setOpenMenu(false);
    }    

    return(
        <div className="movies">
            <Header 
                className="header_white"
                invisible="header__invisible"
                button="header__invisible-button"
                openMenu={handleOpenMenu}
                textColor="navigation__menu-navlink_black"
            />
            <SearchForm
                onSearchFormClick={props.onSearchFormClick}
                films={props.films}
                onChange={props.onChange}
                onSubmit={props.onSubmit}
                onChecked={props.onChecked}
            />
            <MoviesCardList
                films={props.searchFilms}
            />
            <div className="movies__more">
                <button className="movies__btn-more">
                    Еще
                </button>
            </div>
            <Footer />
        </div>
    )
}
export default Movies;