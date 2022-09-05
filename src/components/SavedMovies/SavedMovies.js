import React from "react";
import { useState, useEffect } from "react";
import Header from "../Header/Header";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList"
import Footer from "../Footer/Footer";
import SearchForm from "../Movies/SearchForm/SearchForm";
import mainApi from "../../utils/MainApi";
import { searchFilter } from "../../utils/utils";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import Preloader from "../Preloader/Preloader";

function SavedMovies(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const [savedMovies, setSavedMovies] = useState([]);
    const [savedMoviesId, setSavedMoviesId] = useState([]);
    const [filteredSavedMovies, setFilteredSavedMovies] = useState([]);
    const [errorSearch, setErrorSearch] = useState('');
    const [loading, setLoading] = useState(false);
    
    function getFilms() {
        const token = localStorage.getItem('jwt');
        mainApi
            .getFilms(token)
            .then((movies) => {
                //отбираем фильмы текущего пользователя
                const ownerMovies = movies.data.filter((movie) => movie.owner === currentUser._id);
                setSavedMovies(ownerMovies);
                setFilteredSavedMovies(ownerMovies);
                setSavedMoviesId(ownerMovies.map(a => a._id));
            })
            .catch((err) => console.log(err));
    }

    function handleRemoveMovie(_id) {
        const token = localStorage.getItem('jwt');
        mainApi
            .deleteFilm(_id, token)
            .then((film) => {
                setFilteredSavedMovies((state) =>
                state.filter((c) => (c._id === _id ? film._id : c)))
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function handleSearch(keyWord, isShorts) {
        setLoading(true);
        console.log('savedMovies ', savedMovies, 'keaword', keyWord);
        searchFilter(savedMovies, keyWord, isShorts);
        let movies = searchFilter(savedMovies, keyWord, isShorts);
        console.log(movies);
        if (movies.length === 0) {
            setLoading(false);
            setErrorSearch('Ничего не найдено');
            setFilteredSavedMovies([])
        } else {
            setLoading(false);
            setErrorSearch('');
            setFilteredSavedMovies(movies);
        }
    }

    useEffect(()=> {
        if (props.loggedIn) {
            getFilms();
            setFilteredSavedMovies(savedMovies);
        }
    }, [props.loggedIn])
    
    useEffect(()=> {
            getFilms();
    }, [])
 
    return(
        <div className="movies movies_saved">
            <Header
                loggedIn={props.loggedIn}
                className="header_white"
                textColor="navigation__menu-navlink_black"
            />
            <SearchForm
                handleSearch={handleSearch}
                errorSearch={errorSearch}
            />
            {loading
                ? <Preloader />
                :  <MoviesCardList
                movies={filteredSavedMovies}
                savedMoviesId={savedMoviesId}
                handleRemoveMovie={handleRemoveMovie}
                />
            }
            <Footer />
        </div>
    )
}
export default SavedMovies;