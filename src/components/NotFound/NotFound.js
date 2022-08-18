import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
    return(
        <div className="notfound">
            <div className="notfound__content">
                <p className="notfound__status">404</p>
                <p className="notfound__message">Страница не найдена</p>
            </div>
            <Link to="/" className="notfound__link link">Назад</Link>
        </div>
    )
}
export default NotFound;