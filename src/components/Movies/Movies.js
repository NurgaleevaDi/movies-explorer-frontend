import React from "react";
import { useState, useEffect } from "react";
import Header from "../Header/Header";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesApi from "../../utils/MoviesApi.js";
import Preloader from "../Preloader/Preloader";
import mainApi from "../../utils/MainApi";


function Movies(props) {
    //const [allMovies, setAllMovies] = useState([]);
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorSearch, setErrorSearch] = useState('');
    const [isShorts, setIsShorts] = useState(false);
    const [savedMovies, setSavedMovies] = useState([]);
    const [savedMoviesId, setSavedMoviesId] = useState([]);

    //фильтр фильмов
    function searchFilter(movies, keyWord, isShorts) {
        //console.log('keyWord in filter ', keyWord, 'isShorts in filter ', isShorts);
        //console.log('movies in filter ', movies);
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
            return filtered.filter((element) => element.duration <= 40);
        }
        return filtered;
    }

    //функция срабатывает при submit на поиске или чекбоксе короткометражек, 
    // фильтрует фильмы по состоянию чекбокса и ключевому слову, сохраняет в localStorage отобранные фильмы, 
   
    function handleSearch(keyWord, isShorts) {
        setLoading(true);
        const filteredMovies = JSON.parse(localStorage.getItem('filteredMovies'));
        if (!filteredMovies) {
            MoviesApi.getMovies()
            .then((movies) => {
                    localStorage.setItem('allMovies', JSON.stringify(movies))
                    //setAllMovies([...movies]);
                    handleCheck(keyWord, isShorts);               
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
        console.log(film);
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
                //setIsSaved(true);
                console.log('movie for id', movie);
                setSavedMoviesId(movies.map(a => a.movieId));
                setSavedMovies(movie);
                
                console.log('newSavedFilms ', movie);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    //удаляет сохраненные раннее фильмы из mainApi
    function handleRemoveMovie(_id) {
        const token = localStorage.getItem('jwt');
        console.log('id из card ', _id);
        console.log('savedMovies из бека ', savedMovies);
        // ищем id карточки с фильмом, по которой кликнули для удаления (сравниваем массивы фильмов из localStorage и из mainApi)
        const cardRemove = savedMovies.data.find(element => element.movieId === _id) ;
        console.log('movieId для удаления ', cardRemove);
        mainApi
            .deleteFilm(cardRemove._id, token)
            .then((res) => {
                console.log(movies);
                setSavedMoviesId(movies.data.map(a => a.movieId));
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
                console.log('movies ', movies.data);
                setSavedMoviesId(movies.data.map(a => a.movieId));
               
                console.log('savedMoviesId ', savedMoviesId);
            })
            .catch((err) => console.log(err));
    }

    //отрисовывает фильмы после обновления страницы
    useEffect(() => {
        const movies = JSON.parse(localStorage.getItem('filteredMovies'));
        //console.log('movies useEffect ', movies);
        setMovies(movies || []);
        getSavedStatus();
        console.log('savedMoviesId useEffect', savedMoviesId);
        setIsShorts(JSON.parse(localStorage.getItem('isShorts')));
    },[]);


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
                    
                    //для сохранения фильмов
                    handleSavedMovie={handleSavedMovie}
                    handleRemoveSavedMovie={handleRemoveMovie}
                    savedMoviesId={savedMoviesId}
                    //isSaved={isSaved}
                    />
            }
            <Footer />
        </div>
    )
}
export default Movies;