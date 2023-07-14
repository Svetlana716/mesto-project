const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-26',
  headers: {
    authorization: '61d49f57-4ce9-4c25-b8be-be0fabbb76d9',
    'Content-Type': 'application/json'
  }
};

function checkResponse (res) {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}

function checkReject (err) {
  console.error(`Ошибка: ${err}`);
}

export function getUserInfo () {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
})
.then(checkResponse)
.catch(checkReject)
};

export function getInitialCards () {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
})
.then(checkResponse)
.catch(checkReject)
};

export function editProfile ({name, about}) {
  return fetch(`${config.baseUrl}/users/me`, {
  method: 'PATCH',
  headers: config.headers,
  body: JSON.stringify({name, about}),
})
.then(checkResponse)
.catch(checkReject)
};

export function editAvatar ({avatar}) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({avatar}),
  })
  .then(checkResponse)
.catch(checkReject)
};

export function postNewCard ({name, link}) {
  return fetch(`${config.baseUrl}/cards`, {
  method: 'POST',
  headers: config.headers,
  body: JSON.stringify({name, link}),
})
.then(checkResponse)
.catch(checkReject)
};

export function deleteCard (cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
  method: 'DELETE',
  headers: config.headers,
})
.then(checkResponse)
.catch(checkReject)
};

export function likeCard (cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
  method: 'PUT',
  headers: config.headers,
})
.then(checkResponse)
.catch(checkReject)
};

export function disLikeCard (cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
  method: 'delete',
  headers: config.headers,
})
.then(checkResponse)
.catch(checkReject)
};
