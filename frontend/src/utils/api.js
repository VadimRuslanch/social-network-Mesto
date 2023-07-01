class Api {
    constructor({ url, headers }) {
        this._url = url;
        this._headers = headers;
    };

    _getErrorFromServer(res) {
        return res.json()
            .then((res) => {
                throw new Error(res.message);
            });
    }

    // Управление лайком карточки
    _setLike(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this._headers
        })
            .then(res => { return res.json() })
            .catch(res => { return this._getErrorFromServer(res) })
    };

    _deleteLike(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(res => { return res.json() })
            .catch(res => { return this._getErrorFromServer(res) })
    }

    changeLikeCardStatus(cardId, isLiked) {
        if (isLiked) {
            return this._setLike(cardId);
        } else {
            return this._deleteLike(cardId);
        }
    };

    // Удаление карточки
    deleteCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
            method: "DELETE",
            headers: this._headers
        })
            .then(res => { return res.json() })
            .catch(res => { return this._getErrorFromServer(res) })
    };

    // Добавление новой карточки
    addCard(cardData) {
        return fetch(`${this._url}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: cardData.name,
                link: cardData.link
            })
        })
            .then(res => { return res.json() })
            .catch(res => { return this._getErrorFromServer(res) })
    };

    // Редактирует аватар пользователя
    setUserAvatar(link) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar: link
            })
        })
            .then(res => { return res.json() })
            .catch(res => { return this._getErrorFromServer(res) })
    }

    // Редактирует информацию профиля
    setUserInfo(userInfo) {
        return fetch(`${this._url}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: userInfo.name,
                about: userInfo.about,
            })
        })
            .then(res => { return res.json() })
            .catch(res => { return this._getErrorFromServer(res) })

    };

    // загрузка карточек с сервера
    getCardsList() {
        return fetch(`${this._url}/cards`, {
            headers: this._headers
        })
            .then(res => { return res.json() })
            .catch(res => { return this._getErrorFromServer(res) })
    };

    // Загрузка информации о пользователе с сервера
    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers
        })
            .then(res => {
                return res.json()
            })
            .catch(res => { return this._getErrorFromServer(res) })
    };
};

const api = new Api({
    url: 'https://api.vadim-lebedev.mesto.nomoreparties.sbs',
    headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${localStorage.getItem('token')}`,
    }
});

export default api;