export default class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse (res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
};
  getUserInfo () {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
  })
  .then(this._checkResponse)
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
  })
  .then(this._checkResponse)
  }

  editProfile (name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
    method: 'PATCH',
    headers: this._headers,
    body: JSON.stringify(name, about),
  })
  .then(this._checkResponse)
  }

  editAvatar (avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(avatar),
    })
    .then(this._checkResponse)
  }

  postNewCard (name, link) {
    return fetch(`${this._baseUrl}/cards`, {
    method: 'POST',
    headers: this._headers,
    body: JSON.stringify(name, link),
  })
  .then(this._checkResponse)
  }

  deleteCard (cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: this._headers,
  })
  .then(this._checkResponse)
  }

  likeCard (cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: this._headers,
  })
  .then(this._checkResponse)
  }

  disLikeCard (cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
    method: 'delete',
    headers: this._headers,
  })
  .then(this._checkResponse)
  }
};
