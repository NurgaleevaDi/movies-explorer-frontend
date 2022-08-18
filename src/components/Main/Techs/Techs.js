import React from "react";

function Techs() {
    return(
        <div className="sectionMain sectionMain_techs">
            <h2 className="sectionMain__title" id="techs">Технологии</h2>
            <div className="techs">
                <h3 className="techs__subtitle">7 технологий</h3>
                <p className="techs__text">На курсе веб-разработки мы освоили технологии, 
                которые применили в дипломном проекте.</p>
                <ul className="techs__list">
                    <li className="techs__item">HTML</li>
                    <li className="techs__item">CSS</li>
                    <li className="techs__item">JS</li>
                    <li className="techs__item">React</li>
                    <li className="techs__item">Git</li>
                    <li className="techs__item">Express.js</li>
                    <li className="techs__item">mongoDB</li>
                </ul>
            </div>
        </div>
    )
}
export default Techs;