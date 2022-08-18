import React from "react";

function Portfolio() {
    return(
        <div className="portfolio">
            <h5 className="portfolio__menu-title">Портфолио</h5>
            <ul className="portfolio__menu-projects">
                <li className="portfolio__link-container">
                    <a 
                        className="portfolio__project-link link"
                        target="_blank" rel="noreferrer" 
                        href="https://github.com/NurgaleevaDi/how-to-learn.git">
                        Статичный сайт
                        <p className="portfolio__arrow">&#8599;</p>
                    </a>
                </li>
                <li className="portfolio__link-container">
                    <a 
                        className="portfolio__project-link link"
                        target="_blank" rel="noreferrer"
                        href="https://github.com/NurgaleevaDi/russian-travel.git">
                        Адаптивный сайт
                        <p className="portfolio__arrow">&#8599;</p>
                    </a>
                </li>
                <li className="portfolio__link-container">
                    <a 
                        className="portfolio__project-link link"
                        target="_blank" rel="noreferrer" 
                        href="https://github.com/NurgaleevaDi/react-mesto-api-full.git">
                        Одностраничное приложение
                        <p className="portfolio__arrow">&#8599;</p>
                    </a>
                </li>
                </ul>
            </div>
    )
}
export default Portfolio;