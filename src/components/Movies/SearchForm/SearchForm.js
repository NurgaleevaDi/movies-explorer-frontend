import React from "react";
import find from "../../../images/find-button.svg"
import search from "../../../images/icon-search.svg"

function SearchForm() {
    return (
        <section className="movies__search">
            <div className="movies__search-block">
                <form className="movies__input-conteiner">
                    <img src={search} className="movies__img-search" alt="Иконка поиска"/>
                    <input type="text" className="movies__input" placeholder="Фильм" required/>
                    <button className="movies__button button" type="submit">
                        <img src={find} alt="Кнопка искать"/>
                    </button>
                </form>
                <div className="movies__shorts-conteiner">
                    <div className="movies__checkbox-group">
                        <input type="checkbox" className="movies__checkbox" id="movies__checkbox"/>
                        <label htmlFor="movies__checkbox" className="movies__checkbox-label"></label>
                    </div>
                    <p className="movies__shorts">Короткометражки</p>
                </div>
            </div>
        </section>
    )
}

export default SearchForm;