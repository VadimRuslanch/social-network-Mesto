class Api {
    constructor({ url }) {
        this._url = url;
    };

    _getErrorFromServer(res) {
        return res.json()
            .then((res) => { throw new Error(res.message) });
    }
    // Регистрация пользователя
    register({ email, password }) {
        return fetch(`${this._url}/signup`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify({ email, password }),
        })
            .then(res => { return res })
            .catch(res => { return this._getErrorFromServer(res) })
    };
    // Авторизация пользователя
    login({ email, password }) {
        return fetch(`${this._url}/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify({ email, password }),
        })
            .then(res => { return res.json() })
            .catch(res => { return this._getErrorFromServer(res) })
    };

    // Выход из аккаунтв пользователя
    // logout(){
    //     return fetch(`${this._url}/`)
    // }

    // Проверка токена пользователя для автологина
    checkToken() {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            credentials: 'include',
        })
            .then(res => { if (res.ok) return res.json() })
            .catch(res => { return this._getErrorFromServer(res) })
    };
};

const auth = new Api({
    url: 'https://api.vadim-lebedev.mesto.nomoreparties.sbs',
    // url: 'http://localhost:4000',

});

export default auth;