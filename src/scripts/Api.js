export class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getProfile() {
    return this._request('/users/me');
  }

  getInitialCards() {
    return this._request('/cards');
  }

  updateProfile(data) {
    return this._request('/users/me', 'PATCH', data);
  }

  createPost(data) {
    return this._request('/cards', 'POST', data);
  }

  deletePost(cardId) {
    return this._request(`/cards/${cardId}`, 'DELETE');
  }

  like(cardId) {
    return this._request(`/cards/${cardId}/likes`, 'PUT');
  }

  dislike(cardId) {
    return this._request(`/cards/${cardId}/likes`, 'DELETE');
  }

  avatarEdit(data) {
    return this._request('/users/me/avatar', 'PATCH', data);
  }

  _request(path, method = 'GET', data = null) {
    return fetch(this._baseUrl + path, {
      method,
      headers: this._headers,
      ...(data ? { body: JSON.stringify(data) } : {}),
    }).then(this._callback);
  }

  _callback(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}
