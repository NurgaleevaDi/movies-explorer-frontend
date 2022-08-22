import React from "react";
import { useState } from "react";
import find from "../../../images/find-button.svg";
import search from "../../../images/icon-search.svg";
import InfoTooltip from "../../InfoTooltip/InfoTooltip";

function SearchForm(props) {
    const [film, setFilm] = useState("");
    const [isValidFilm, setIsValidFilm] = useState(false);
    const [errorFilm, setErrorFilm] = useState("");
    const [openPopup, setOpenPopup] = useState(false);

    function handleChangeInput(evt) {
        const input = evt.target;
        setFilm(input.value);
        setIsValidFilm(input.validity.valid);
        console.log('isValid ', isValidFilm);
    }
    function handleClose(){
        setOpenPopup(false);
    }
    function handleSubmit(e) {
        e.preventDefault();
        console.log('submit!');
        props.onSearchFormClick();
        if(!(isValidFilm)) {
            setErrorFilm("Нужно ввести ключевое слово");
            setOpenPopup(true);
        } else {
            setErrorFilm("");
        }
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
                    >
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
            <InfoTooltip
                message={errorFilm}
                openPopup={openPopup}
                onClose={handleClose}
            />
        </section>
    )
}

export default SearchForm;