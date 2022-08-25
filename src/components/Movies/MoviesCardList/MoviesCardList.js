import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList(props) {
    return(
        <div className="movies-cardlist">
            {props.films.map((film) => (
                <MoviesCard 
                    key={film.id}
                    {...film}
                />
            ))}
        </div>
    )
}
export default MoviesCardList;