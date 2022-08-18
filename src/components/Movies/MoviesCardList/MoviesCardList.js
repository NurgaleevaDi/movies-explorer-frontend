import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import film1 from "../../../images/film1.jpg";
import film2 from "../../../images/film2.jpg";
import film3 from "../../../images/film3.jpg";
import film4 from "../../../images/film4.jpg";
import film5 from "../../../images/film5.jpg";

function MoviesCardList() {
    return(
        <div className="movies-cardlist">
            <MoviesCard 
                name="33 слова о дизайне"
                time="1ч 47м"
                src={film1}
                lableClassName="movies-card__btn"
            />
             <MoviesCard 
                name="33 слова о дизайне"
                time="1ч 47м"
                src={film2}
                lableClassName="movies-card__btn"
            />
             <MoviesCard 
                name="33 слова о дизайне"
                time="1ч 47м"
                src={film3}
                lableClassName="movies-card__btn movies-card__btn_active"
            />
             <MoviesCard 
                name="33 слова о дизайне"
                time="1ч 47м"
                src={film4}
                lableClassName="movies-card__btn"
            />
             <MoviesCard 
                name="33 слова о дизайне"
                time="1ч 47м"
                src={film5}
                lableClassName="movies-card__btn movies-card__btn_active"
            />
        </div>
    )
}
export default MoviesCardList;