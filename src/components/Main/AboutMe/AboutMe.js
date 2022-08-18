import React from "react";

function AboutMe() {
    return(
        <div className="sectionMain">
            <h2 className="sectionMain__title" id="about-me">Студент</h2>
            <div className="about-me">
                <div className="about-me__resume">
                    <div className="about-me__img"></div>
                    <div className="about-me__info">
                        <h3 className="about-me__title">Диана</h3>
                        <h4 className="about-me__subtitle">Фронтенд-разработчик</h4>
                        <p className="about-me__text">Я родился и живу в Саратове, закончил факультет 
                            экономики СГУ. У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом.
                            Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как
                            прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
                    </div>
                     <ul className="about-me__links">
                        <li className="about-me__item"><a className='about-me__link link' href="https://ru-ru.facebook.com/" target="_blank" rel="noreferrer">Facebook</a></li>
                        <li className="about-me__item"><a className='about-me__link link' href="https://github.com/NurgaleevaDi" target="_blank" rel="noreferrer">Github</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default AboutMe;