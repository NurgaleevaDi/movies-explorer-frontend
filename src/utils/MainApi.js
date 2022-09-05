class MainApi{
    constructor({ address, headers}){
        this._address = address;
        this._headers = headers;
    }

    _handleResponse(res) {
        if (res.ok) {
            return res.json();
        }
            return res.json()
            .then((data) => {
               throw new Error(data.message);
            })
    };
    // _handleResponse = (res) => {
    //     if (res.ok) {
    //         return res.json()
    //     }
    //     return Promise.reject(`Ошибка ${res.status} ${res.statusText}`)
    // }

    getUserData(token) {
        return fetch(`${this._address}/users/me`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(this._handleResponse)
    }

    profileEdit(user, token) {
        return fetch(`${this._address}/users/me`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name: user.updateName,
                email: user.updateEmail
            })
        }).then(this._handleResponse)
    }

    getFilms(token) {
        return fetch(`${this._address}/movies`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(this._handleResponse) 
    }

    saveFilm(film, token) {
        return fetch(`${this._address}/movies`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(film)
         }).then(this._handleResponse)
    }

    deleteFilm(id, token) {
        return fetch(`${this._address}/movies/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
         }).then(this._handleResponse)
    }

}

const mainApi = new MainApi({
    address: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
        //'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    }

})

export default mainApi;