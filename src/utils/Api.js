class Api {
  constructor({ baseUrl, headers }) {
    this._link = baseUrl;
    this._headers = headers;
  }
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialProfileData() {
    return fetch(`${this._link}/users/me`, { headers: this._headers }).then(
      this._checkResponse
    );
  }

  setNewProfileData({ name, about }) {
    return fetch(`${this._link}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._checkResponse);
  }

  setNewAvatar(avatar) {
    return fetch(`${this._link}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(avatar),
    }).then(this._checkResponse);
  }

  getInitialGallery() {
    return fetch(`${this._link}/cards`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  setNewCard({ name, link }) {
    return fetch(`${this._link}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._checkResponse);
  }

  setLikeCard(cardId) {
    return fetch(`${this._link}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  setDislikeCard(cardId) {
    return fetch(`${this._link}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._link}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }
}

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-52",
  headers: {
    authorization: "9fcfb2cc-6788-4de3-958e-87d26868b61e",
    "Content-Type": "application/json",
  },
});

export default api;
