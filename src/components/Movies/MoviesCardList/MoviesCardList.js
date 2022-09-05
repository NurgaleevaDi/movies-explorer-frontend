import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function MoviesCardList(props) {
    //console.log('MoviesList ', props);
    const location = useLocation();
    const [maximumMovies, setMaximumMovies] = useState(0);
    const [amount, setAmount] = useState(0);

    function showMoreMovies() {
        setMaximumMovies(maximumMovies + amount);
    };

    function setTemplate() {
        const width = window.innerWidth;

        if  (location.pathname === '/saved-movies') {
            setMaximumMovies(props.movies.length);
        }
        if (width >= 1280) {
            setMaximumMovies(12);
            setAmount(3);
        } else if (width >= 768) {
            setMaximumMovies(8);
            setAmount(2);
        } else if (width >= 320) {
            setMaximumMovies(5);
            setAmount(2);
        } else {
            setMaximumMovies(5);
            setAmount(2);
        }
    }

    useEffect(() => {
        setTemplate();

        window.addEventListener('resize', () => {
            setTimeout(() => {
                setTemplate();
            }, 500);
        });
    }, []);

    return(
        <div className="movies-list">
            <div className="movies-cardlist">
                {props.movies.map((movie, index) => {
                    if (index < maximumMovies) {
                        return (
                            <MoviesCard
                                key={movie.id || movie._id}
                                {...movie}
                                //для сохранения фильмов
                                onSavedMovie={props.handleSavedMovie}
                                onRemoveMovie={props.handleRemoveMovie}
                                savedMoviesId={props.savedMoviesId}
                                //если в массиве id сохраненных фильмов есть id карточки, то метод indexOf вернет значение, если нет, то -1
                                isSaved={props.savedMoviesId.indexOf(movie.id) !== -1 }
                            />
                        );
                    }
                    return null;
                }      
            )}
            </div>
            {location.pathname === '/movies' && props.movies.length > maximumMovies && (
                <div className="movies__more">
                    <button 
                        className="movies__btn-more button"
                        type="button"
                        onClick={showMoreMovies}>
                        Еще
                    </button>
                </div>
            )}
            
        </div>
    )
}
export default MoviesCardList;