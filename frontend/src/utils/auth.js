export default class Auth {
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

  registrUser(email, password) {
    return fetch(`${this._url}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({email, password})
    })
    .then(this._response)
  }

  loginUser(email, password) {
    return fetch(`${this._url}/signin`,{
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({email, password})
    })
    .then(this._response)
    .then((data) => {
      if (data.token) {
        localStorage.setItem('jwt', data.token)
        return data
      } 
    })
  }

  getUserToken(token) {
    return fetch(`${this._url}/user/me`,{
      method: "GET",
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
    .then(this._response)
  }
}

export const auth = new Auth({
  url: 'https://api-mesto.nomoredomains.rocks',
  headers: {
    "Content-Type": "application/json",
    'Accept': 'application/json',
  }
})