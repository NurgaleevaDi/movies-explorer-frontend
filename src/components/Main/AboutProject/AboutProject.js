import React from "react";

function AboutProject() {
    return(
        <div className="sectionMain">
                <h2 className="sectionMain__title" id="about-project">О проекте</h2>
            <article className="sectionMain__item">
                <div className="sectionMain__card">
                <h3 className="sectionMain__subtitle">Дипломный проект включал 5 этапов</h3>
                <p className="sectionMain__text">Составление плана, работу над бэкендом, вёрстку, добавление 
                    функциональности и финальные доработки.</p>
                </div>
                <div className="sectionMain__card">
                    <h3 className="sectionMain__subtitle">На выполнение диплома ушло 5 недель</h3>
                    <p className="sectionMain__text">У каждого этапа был мягкий и жёсткий дедлайн, которые
                         нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
            </article>
            <div className="progress-bar">
                <p className="progress-bar__text progress-bar__text_green">1 неделя</p>
                <p className="progress-bar__text">4 недели</p>
                <p className="progress-bar__text_eng">Back-end</p>
                <p className="progress-bar__text_eng">Front-end</p>
            </div>
        </div>
    )
}
export default AboutProject;