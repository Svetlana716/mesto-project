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

  _request(endpoint, options) {
    return fetch(`${this._baseUrl}/${endpoint}`, options).then(this._checkResponse);
  }

  getUserInfo() {
    return _request(users/me, { headers: this._headers });
  }

  getInitialCards() {
    return _request(cards, { headers: this._headers });
  }

  editProfile(name, about) {
    return _request(users/me, {
      method: "PATCH",
      body: JSON.stringify(name, about),
      headers: this._headers,
    });
  }

  editAvatar(avatar) {
    return _request(users/me/avatar, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(avatar),
    });
  }

  postNewCard(name, link) {
    return _request(cards, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(name, link),
    });
  }

  deleteCard(cardId) {
    return _request(cards/`${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  likeCard(cardId) {
    return _request(cards/likes/`${cardId}`, {
      method: "PUT",
      headers: this._headers,
    });
  }

  disLikeCard(cardId) {
  return _request(cards/likes/`${cardId}`, {
    method: "DELETE",
    headers: this._headers,
  });
}
};
