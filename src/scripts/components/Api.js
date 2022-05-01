export default class Api {
  constructor(data) {
    this._serverUrl = data.serverUrl;
    this._token = data.token;
  }

  _checkResponse(res) {
    if(res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    }
  }

  getInitialCards() {
    return fetch(`${this._serverUrl}cards`, {
      headers: {
        authorization: this._token
      }
    })
    .then((res) => this._checkResponse(res));
  }

  addCard() {
    return fetch(`${this._serverUrl}cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then((res) => this._checkResponse(res));
  }

  deleteCard(data) {
    return fetch(`${this._serverUrl}cards/${data}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      }
    })
    .then((res) => this._checkResponse(res));
  }

  getUserData() {
    return fetch(`${this._serverUrl}users/me`, {
      headers: {
        authorization: this._token
      }
    })
    .then((res) => this._checkResponse(res));
  }

  changeUserData(data) {
    return fetch(`${this._serverUrl}users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
    .then((res) => this._checkResponse(res));
  }

  changeAvatar(data) {
    return fetch(`${this._serverUrl}users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
    .then((res) => this._checkResponse(res));
  }

  // putLike() {

  // }

  // deleteLike() {

  // }
}
