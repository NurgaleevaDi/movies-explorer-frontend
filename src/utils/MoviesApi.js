class MoviesApi {
    constructor({address, headers}){
        this._address = address;
        this._headers = headers;
    }
    _handleResponse = (res) => {
        if(res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка ${res.status} ${res.statusText}`)
    }
    getMovies() {
        return fetch(`${this._address}`, {
            headers: this._headers,
        }).then(this._handleResponse)
    }
}

const moviesApi = new MoviesApi({
    address: 'https://api.nomoreparties.co/beatfilm-movies',
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
        // 'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    }
})

export default moviesApi;