import React from "react";
import { useLocation } from "react-router-dom";

function MoviesCard(props) {
    //console.log('MoviesCard props isSaved', props);
    const location = useLocation();
    
    const cardLableClassName = props.isSaved
                                ? "movies-card__btn button movies-card__btn_active"
                                : "movies-card__btn button";
    function handleSavedMovie(evt) {
        props.onSavedMovie(props);
    }
    function handleRemoveMovie(evt) {
        props.onRemoveMovie(props.id || props._id);
    }

    return(
        <div className="movies-card">
            <div className="movies-card__info">
                <h3 className="movies-card__title">{props.nameRU}</h3>
                <p className="movies-card__time">{props.duration}</p>
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
                <img
                    className="movies-card__img"
                    src={location.pathname === '/saved-movies'
                            ? props.image
                            : `https://api.nomoreparties.co${props.image.url}`}
                    alt="Изображение"
                />
            </div>
        </div>
    )
}
export default MoviesCard;