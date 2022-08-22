import React from "react";
import { useState } from "react";
import find from "../../../images/find-button.svg";
import search from "../../../images/icon-search.svg";

function SearchForm(props) {
    // console.log('SearchForm props ', props);
    const [film, setFilm] = useState("");
    console.log('film ', film);
    const [isValidFilm, setIsValidFilm] = useState(false);
    console.log('isValid -1 ', isValidFilm)
    const [errorFilm, setErrorFilm] = useState("");

    function handleChangeInput(evt) {
        const input = evt.target;
        setFilm(input.value);
        setIsValidFilm(input.validity.valid);
        if(!isValidFilm) {
            setErrorFilm(input.validationMessage)
        } else {
            setErrorFilm("");
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log('submit!');
        props.onSearchFormClick();
    }
    return (
        <section className="movies__search">
            <div className="movies__search-block">
                <form className="movies__input-conteiner" onSubmit={handleSubmit} noValidate>
                    <img src={search} className="movies__img-search" alt="Иконка поиска"/>
                    <input 
                        type="text" 
                        className="movies__input" 
                        placeholder="Фильм"
                        required
                        value={film || ""}
                        onChange={handleChangeInput}
                    />
                    
                    <button 
                        className="movies__button button"
                        type="submit"
                        disabled={!(isValidFilm)}
                       //onSubmit={handleSubmit}
                    >
                        <img src={find} alt="Кнопка искать"/>
                    </button>
                    <span className="movies__error-message">{errorFilm}</span>
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