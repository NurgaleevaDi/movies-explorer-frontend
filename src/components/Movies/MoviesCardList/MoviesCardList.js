import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
    MAXIMUM_MOVIES_1280,
    MAXIMUM_MOVIES_768,
    MAXIMUM_MOVIES_320,
    AMOUNT_1280,
    AMOUNT_768,
    AMOUNT_320
} from "../../../utils/constants.js";

function MoviesCardList(props) {
    console.log('MoviesList ', props);
    const location = useLocation();
    const [maximumMovies, setMaximumMovies] = useState(setTemplate());
    //const [amount, setAmount] = useState(0);

    const [testMax, setTestMax] = useState(maximumMovies[0])
    console.log('testMax ', testMax);
    const testAmount = maximumMovies[1];
    console.log('maximumMovies ', maximumMovies);

    function showMoreMovies() {
      // setMaximumMovies(maximumMovies + amount);
      console.log('test', testMax);
      setTestMax(testMax+testAmount);
    };

    function setTemplate() {
        const width = window.innerWidth;

        if  (location.pathname === '/saved-movies') {
            setMaximumMovies(props.movies.length);
        }
        if (width >= 1280) {
            // setMaximumMovies(MAXIMUM_MOVIES_1280);
            // setAmount(AMOUNT_1280);
            return [MAXIMUM_MOVIES_1280, AMOUNT_1280];
        } else if (width >= 768) {
            // setMaximumMovies(MAXIMUM_MOVIES_768);
            // setAmount(AMOUNT_768);
            return [MAXIMUM_MOVIES_768, AMOUNT_768];
        } else if (width >= 320) {
            // setMaximumMovies(MAXIMUM_MOVIES_320);
            // setAmount(AMOUNT_320);
            return [MAXIMUM_MOVIES_320, AMOUNT_320];
        } else {
            // setMaximumMovies(MAXIMUM_MOVIES_320);
            // setAmount(AMOUNT_320);
            return [MAXIMUM_MOVIES_320, AMOUNT_320];
        }
    }

    function handleResize() {
        setTimeout(() => {
            setTemplate();
        }, 500);
    }
    useEffect(() => {
        setTemplate();
        
        window.addEventListener('resize', handleResize);
        // return () => {
        //     window.removeEventListener('resize', handleResize);
        // }
       
    },[]);

    // useEffect(() => {
    //     setTestMax(maximumMovies);
    // })

   

    return(
        <div className="movies-list">
            <div className="movies-cardlist">
                {props.movies.map((movie, index) => {
                    console.log('index ', index, 'maximumMovies ', testMax);
                    if (index < testMax) {
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
            {location.pathname === '/movies' && props.movies.length > maximumMovies[0] && (
                <div className="movies__more">
                    <button 
                        className="movies__btn-more button"
                        type="button"
                        // onClick={showMoreMovies}>
                        onClick={showMoreMovies}>
                        Еще
                    </button>
                </div>
            )}
            
        </div>
    )
}
export default MoviesCardList;