import React from "react";

function MoviesCard(props) {
    return(
        <div className="movies-card">
            <div className="movies-card__info">
                <h3 className="movies-card__title">{props.name}</h3>
                <p className="movies-card__time">{props.time}</p>
                <div className="movies-card__lable">
                    <button className={props.lableClassName} type="button">
                    </button>
                </div>
                <img
                    className="movies-card__img"
                    src={props.src}
                    alt="Изображение"
                />
            </div>
        </div>
    )
}
export default MoviesCard;