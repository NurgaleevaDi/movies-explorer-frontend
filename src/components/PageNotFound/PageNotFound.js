import React from "react";
import { useHistory } from "react-router-dom";

function PageNotFound() {
    const history = useHistory();
    return(
        <div className="notfound">
            <div className="notfound__content">
                <p className="notfound__status">404</p>
                <p className="notfound__message">Страница не найдена</p>
            </div>
            <button 
                className="notfound__button button" 
                type="button" 
                onClick={()=>history.goBack()}>
                Назад
            </button>
        </div>
    )
}
export default PageNotFound;