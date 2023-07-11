class Api {
    constructor({ baseUrl }) {
        this._baseUrl = baseUrl;
    };

    _getErrorFromServer(res) {
        return res.json()
            .then((res) => { throw new Error(res.message) });
    }
    // Регистрация пользователя
    register({email, password }) {
        return fetch(`${this._baseUrl}/signup`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email, password })
        })
            .then(res => { return res })
            .catch(res => { return this._getErrorFromServer(res) })
    };
    // Авторизация пользователя
    authorization({email, password }) {
        return fetch(`${this._baseUrl}/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email, password })
        })
            .then(res => { return res.json() })
            .catch(res => { return this._getErrorFromServer(res) })
    };
    // Проверка токена пользователя для автологина
    checkToken(token) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => { if (res.ok) return res.json() })
            .catch(res => { return this._getErrorFromServer(res) })
    };
};

const auth = new Api({
    baseUrl: 'http://api.vadim-lebedev.mesto.nomoreparties.sbs',
});

export default auth;