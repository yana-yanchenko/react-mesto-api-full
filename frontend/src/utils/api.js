export default class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  _response(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`error - ${res.status}`);
  };

  updateAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar: data.avatar
        })
      })
      .then(this._response)
  }

  getInitialCards(token) {
    return fetch(`${this._url}/cards`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${token}`
        }
      })
      .then(this._response)
  }

  getInfoUser(token) {
    return fetch(`${this._url}/user/me`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${token}`
        }
      })
      .then(this._response)
  }

  setInfoUser(data) {
    return fetch(`${this._url}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          about: data.about,
          avatar: data.avatar
        })
      })
      .then(this._response)
  }

  generateNewCard(data) {
    return fetch(`${this._url}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          link: data.link
        })
      })
      .then(this._response)
  }

  changeLikeCardStatus(id, isLiked){
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: isLiked ? 'PUT' : 'DELETE',
      headers: this._headers,
    })
    .then(this._response)
  }
  
  deleteCard(id){
    return fetch(`${this._url}/cards/${id}`,{
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._response)
  }
}

export const api = new Api({
  url: 'https://api-mesto.nomoredomains.rocks',
  headers: {
    "Content-Type": "application/json",
    "authorization": `Bearer ${localStorage.getItem("jwt")}`
  }
})