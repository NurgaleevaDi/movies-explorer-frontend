import React from "react";
import { useState } from "react";
import Header from "../Header/Header";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList"
import Footer from "../Footer/Footer";
import SearchForm from "../Movies/SearchForm/SearchForm";

function SavedMovies() {
    const [openMenu, setOpenMenu] = useState(false);

    function handleOpenMenu() {
        setOpenMenu(true);
    }
    function handleCloseMenu() {
        setOpenMenu(false);
    }
    return(
        <div className="movies movies_saved">
            <Header 
                className="header_white"
                invisible="header__invisible"
                button="header__invisible-button"
                openMenu={handleOpenMenu}
                textColor="navigation__menu-navlink_black"
            />
            <SearchForm />
            <MoviesCardList />
            <Footer />
        </div>
    )
}
export default SavedMovies;