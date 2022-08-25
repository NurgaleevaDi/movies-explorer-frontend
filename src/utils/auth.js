export const BASE_URL = 'http://localhost:3000';

function checkResponse(res) {
    console.log('res ', res);
    return res.ok ? res.json() : Promise.reject(`'Ошибка': ${res.status}`);
};

export function register(email, password, name) {
    return fetch (`${BASE_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email, password, name})
    })
    .then (res => checkResponse(res))
};