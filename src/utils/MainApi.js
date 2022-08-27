class MainApi{
    constructor({ address, headers}){
        this._address = address;
        this._headers = headers;
    }

    _handleResponse = (res) => {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка ${res.status} ${res.statusText}`)
    }

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
                name: user.name,
                email: user.email
            })
        }).then(this._handleResponse)
    }
}

const mainApi = new MainApi({
    address: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    }

})

export default mainApi;