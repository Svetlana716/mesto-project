export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  //сделал небольшой рефакторинг
  //чтобы не дублировать в запросах fetch и then, создал приватный метод и его уже вызываю в запросах
  /*_request(endpoint, options) {
    return fetch(`${this._baseUrl}/${endpoint}`, options).then(this._checkResponse);
  }*/

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  /*getUserInfo() {
    return request(`/users/me`, { headers: this._headers });
  }*/

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  /*getInitialCards() {
    return request(`/cards`, { headers: this._headers });
  }*/

  editProfile(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(name, about),
    }).then(this._checkResponse);
  }

  /*editProfile(name, about) {
    return request(`/users/me`, {
      method: "PATCH",
      body: JSON.stringify(name, about),
      headers: this._headers,
    });
  }*/

  editAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(avatar),
    }).then(this._checkResponse);
  }

  /*editAvatar(avatar) {
    return request(`/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(avatar),
    });
  }*/

  postNewCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(name, link),
    }).then(this._checkResponse);
  }

  /*postNewCard(name, link) {
    return request(`/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(name, link),
    });
  }*/

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  /*deleteCard(cardId) {
    return request(`/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }*/

  likeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  /*likeCard(cardId) {
    return request(`/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers,
    });
  }*/

  disLikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "delete",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  /*disLikeCard(cardId) {
  return request(`/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: this._headers,
  });
}*/
}
