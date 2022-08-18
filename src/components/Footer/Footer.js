import React from "react";

function Footer() {
    return(
        <footer className="footer">
            <h3 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h3>
            <div className="footer__container">
                <ul className="footer__list">
                    <li className="footer__item"><a className="footer__link" href="https://practicum.yandex.ru" target="_blank" rel="noreferrer">Яндекс.Практикум</a></li>
                    <li className="footer__item"><a className="footer__link" href="hhttps://github.com/" target="_blank" rel="noreferrer">Github</a></li>
                    <li className="footer__item"><a className="footer__link" href="https://ru-ru.facebook.com/" target="_blank" rel="noreferrer">Facebook</a></li>
                </ul>
                <p className="footer__copyrigth">&#169; 2022</p>
            </div>
        </footer>
    )
}
export default Footer;