export const BASE_URL = 'http://localhost:3000';

function checkResponse(res) {
    // console.log('res ', res);
    // return res.ok ? res.json() : Promise.reject(`'Ошибка': ${res.status}`);
    if (res.ok) {
        return res.json();
    }
        return res.json()
        .then((data) => {
           throw new Error(data.message);
        })
};

// регистрация пользователя
export function register(email, password, name) {
    return fetch (`${BASE_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name })
    })
    .then (res => checkResponse(res))
};

//авторизация пользователя
export function authorize(email, password) {
    return fetch (`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ password, email })
    })
    .then(res => checkResponse(res))
};

//получение информации о пользователе после авторизации
export function getContent(token) {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`},
    })
    .then(res => checkResponse(res))
}