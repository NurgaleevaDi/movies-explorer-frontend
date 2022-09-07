import React from "react";
import { useLocation } from "react-router-dom";
import { MIN_PER_HOUR } from "../../../utils/constants.js";
import { useState } from "react";

function MoviesCard(props) {
    const [savedLabel, setSavedLabel] = useState(false);
    const location = useLocation();
    
    const cardLableClassName = props.isSaved || savedLabel
                                ? "movies-card__btn button movies-card__btn_active"
                                : "movies-card__btn button";
    
    function handleSavedMovie(evt) {
        props.onSavedMovie(props);
    }
    function handleRemoveMovie(evt) {     
        console.log('ok', props.id);
        props.onRemoveMovie(props.id || props._id);
        setSavedLabel(false);
    }

    return(
        <div className="movies-card">
            <div className="movies-card__info">
                <h3 className="movies-card__title">{props.nameRU}</h3>
                <p className="movies-card__time">{`${Math.trunc(props.duration / MIN_PER_HOUR)}ч ${props.duration % MIN_PER_HOUR}м`}</p>
                <div className="movies-card__lable">
                    <button
                        className={location.pathname ==='/saved-movies'
                            ? "movies-card__btn button movies-card__btn_saved"
                            : cardLableClassName}
                        type="button"
                        onClick={location.pathname === '/saved-movies'
                            ? handleRemoveMovie
                            :  props.isSaved
                                ? handleRemoveMovie : handleSavedMovie 
                        }>
                    </button>
                </div>
                <a href={props.trailerLink} target="_blank" rel="noreferrer">
                    <img
                        className="movies-card__img"
                        src={location.pathname === '/saved-movies'
                            ? props.image
                            : `https://api.nomoreparties.co${props.image.url}`}
                         alt="Изображение"
                    />
                </a>
            </div>
        </div>
    )
}
export default MoviesCard;