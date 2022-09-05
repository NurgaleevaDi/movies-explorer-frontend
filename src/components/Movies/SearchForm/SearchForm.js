import React from "react";
import find from "../../../images/find-button.svg"
import search from "../../../images/icon-search.svg"
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function SearchForm(props) {
    const [keyWord, setKeyWord] = useState("");
    const [isValidKeyWord, setIsValidKeyWord] = useState(false);
    const [errorKeyWord, setErrorKeyWord] = useState("");
    const [isShorts, setIsShorts] = useState(false);
    const location = useLocation();

    function handleChangeInput(evt) {
        const input = evt.target;
        setKeyWord(input.value);
        setIsValidKeyWord(input.validity.valid);
    }

    function handleChangeCheckbox() {
        setIsShorts(!isShorts);
        localStorage.setItem('isShorts', !isShorts)
        console.log('isShorts in ChangeCheckbox ', isShorts);
        props.handleSearch(keyWord, !isShorts);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        if (!isValidKeyWord) {
            setErrorKeyWord("Нужно ввести ключевое слово")
        } else {
            localStorage.setItem('keyWord', keyWord);
            props.handleSearch(keyWord, isShorts);
        }
    }

    // заполняет строку поиска и состояние чекбокса значениями из localStorage
    useEffect(() => {
        if (location.pathname === '/movies') {
            const savedInputValue = localStorage.getItem('keyWord');
            const savedShorts = JSON.parse(localStorage.getItem('isShorts'));
            if (savedInputValue) {
                setKeyWord(savedInputValue);
            }
            if (savedShorts) {
                setIsShorts(savedShorts);
            }
            if (savedInputValue || (savedShorts === true)) {
                props.handleSearch(savedInputValue, savedShorts);
            }
        }
    }, []);

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
                        value={keyWord || ""}
                        onChange={handleChangeInput}
                    />
                    <button 
                        className="movies__button button"
                        type="submit"
                        // disabled={!isValidKeyWord}
                    >
                        <img src={find} alt="Кнопка искать"/>
                    </button>
                </form>
                <span className="movies__input-error">{errorKeyWord}</span>
                <div className="movies__shorts-conteiner">
                    <div className="movies__checkbox-group">
                        <input
                            type="checkbox" 
                            className="movies__checkbox"
                            id="movies__checkbox"
                            onChange={handleChangeCheckbox}
                            checked={isShorts}
                        />
                        <label htmlFor="movies__checkbox" className="movies__checkbox-label"></label>
                    </div>
                    <p className="movies__shorts">Короткометражки</p>
                </div>
            </div>
            <span className="movies-search__error">{props.errorSearch}</span>
        </section>
    )
}

export default SearchForm;