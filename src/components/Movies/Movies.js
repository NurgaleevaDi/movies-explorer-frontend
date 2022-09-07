import React from "react";
import { useState, useEffect } from "react";
import Header from "../Header/Header";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesApi from "../../utils/MoviesApi.js";
import Preloader from "../Preloader/Preloader";
import mainApi from "../../utils/MainApi";
import { CurrentUserContext } from "../../context/CurrentUserContext.js";
import { DURATION } from "../../utils/constants.js";

function Movies(props) {
    console.log(props);
    //const [allMovies, setAllMovies] = useState([]);
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorSearch, setErrorSearch] = useState('');
    const [isShorts, setIsShorts] = useState(false);
    const [savedMovies, setSavedMovies] = useState([]);
    const [savedMoviesId, setSavedMoviesId] = useState([]);
    const currentUser = React.useContext(CurrentUserContext);
    const [addition, setAddition] = useState(0);

    //фильтр фильмов
    function searchFilter(movies, keyWord, isShorts) {
        if (!movies) {
            return [];  
        }
        let filtered = [...movies];
        if (keyWord) {
            filtered = filtered.filter((element) => element.nameRU
            .toLowerCase()
            .includes(keyWord.toLowerCase()))
        }
        if(isShorts) {
            return filtered.filter((element) => element.duration <= DURATION);
        }
        return filtered;
    }

    //функция срабатывает при submit на поиске или чекбоксе короткометражек, 
    // фильтрует фильмы по состоянию чекбокса и ключевому слову, сохраняет в localStorage отобранные фильмы, 
   
    function handleSearch(keyWord, isShorts) {
        setAddition(0);
        setLoading(true);
        const filteredMovies = JSON.parse(localStorage.getItem('filteredMovies'));
        if (!filteredMovies) {
            MoviesApi.getMovies()
            .then((movies) => {
                    localStorage.setItem('allMovies', JSON.stringify(movies))
                    //setAllMovies([...movies]);
                    handleCheck(keyWord, isShorts);
                    getSavedStatus();            
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
            });
        } else {
            handleCheck(keyWord, isShorts);
        }
    };

    function handleCheck(keyWord, isShorts) {
        const filteredMovies = JSON.parse(localStorage.getItem('allMovies'));
        const filtered = searchFilter(filteredMovies, keyWord, isShorts);

        if (filtered.length === 0) {
            setErrorSearch('Ничего не найдено');
            setMovies([]);
            setLoading(false);
        } else {
            setLoading(false);
            setErrorSearch('');
            setMovies(filtered);
            // localStorage.setItem('filteredMovies', JSON.stringify(movies));
            localStorage.setItem('filteredMovies', JSON.stringify(filtered));
        }  
    }

    //сохраняет фильмы по нажатию на ярлык карточки в mainApi
    function handleSavedMovie(film) {
        const token = localStorage.getItem('jwt');
        //подготовка объекта фильма для записи в mainApi
        const newFilm = {};
        Object.assign(newFilm, film);
        delete newFilm.id;
        delete newFilm.created_at;
        delete newFilm.updated_at;
        delete newFilm.isSaved; //проверить!
        delete newFilm.savedMoviesId; //проверить!

        //при сохранении в mainApi уточняем свойства image, thumbnail, movieId для соответствия модели movie
        mainApi
            .saveFilm(
                {...newFilm,
                image: `https://api.nomoreparties.co/${film.image.url}`,
                thumbnail: `https://api.nomoreparties.co/${film.image.formats.thumbnail.url}`,
                movieId: film.id}, 
                token
            )
            .then((movie) => {
                getSavedStatus();
                //setIsSaved(true);
                // console.log('movie for id', movie);
                // setSavedMoviesId(movie.map(a => a.movieId));
                // console.log('1', setSavedMoviesId);
                setSavedMovies(movie);
                
                console.log('newSavedFilms ', movie);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    //удаляет сохраненные раннее фильмы из mainApi
    function handleRemoveMovie(id) {
        const token = localStorage.getItem('jwt');
        //собираем массив из отфильтрованных фильмов, которые сохранил текущий пользователь
        const ownerMovies = savedMovies.data.filter((movie) => movie.owner === currentUser._id);
        //из найденного массива находим карточку для удаления по ее movieId
        const cardRemove = ownerMovies.find(element => element.movieId === id);
        mainApi
            .deleteFilm(cardRemove._id, token)
            .then((res) => {
                getSavedStatus();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    //делает активными ярлыки к сохраненным фильмам
    function getSavedStatus() {
       const token = localStorage.getItem('jwt');
        mainApi
            .getFilms(token)
            .then((movies) => {
                setSavedMovies(movies);
                //массив из сохраненных фильмов, принадлежащих текущему пользователю
                const ownerMovies = movies.data.filter((movie) => movie.owner === currentUser._id);
                //массив id сохраненных фильмов, принадлежащих текущему пользователю
                setSavedMoviesId(ownerMovies.map(a => a.movieId));
            })
            .catch((err) => console.log(err));
    }

    //отрисовывает фильмы после обновления страницы
    useEffect(() => {
        const movies = JSON.parse(localStorage.getItem('filteredMovies'));
        //console.log('movies useEffect ', movies);
        setMovies(movies || []);
        getSavedStatus();
        setIsShorts(JSON.parse(localStorage.getItem('isShorts')));
    },[]);

    function showMoreMovies() {
        setAddition(addition+1);
    }

    // useEffect(() => {
    //     getFilms();
    // }, [])




    // useEffect(() => {
    //     if ()
    //     const movies = JSON.parse(localStorage.getItem('filteredMovies'));
    //     //console.log('movies useEffect ', movies);
    //     setMovies(movies || []);
    //     getSavedStatus();
    // })
    
    // useEffect(() => {
    //     if (props.loggedIn) {
    //         getSavedStatus();
    //     }
    // }, [props.loggedIn]);

    return(
        <div className="movies">
            <Header 
                loggedIn={props.loggedIn}
                className="header_white"
                textColor="navigation__menu-navlink_black" 
            />
            <SearchForm
                handleSearch={handleSearch}
                errorSearch={errorSearch}
                isShorts={isShorts}
            />
            {loading
                ? <Preloader />
                : <MoviesCardList 
                    movies={movies} 
                    addition={addition}
                    //для сохранения фильмов
                    handleSavedMovie={handleSavedMovie}
                    handleRemoveMovie={handleRemoveMovie}
                    savedMoviesId={savedMoviesId}
                    showMoreMovies={showMoreMovies}
                    //isSaved={isSaved}
                    />
            }
            <Footer />
        </div>
    )
}
export default Movies;