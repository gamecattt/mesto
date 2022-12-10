export class UserInfo {
  constructor(nicknameSelector, descriptionSelector, avatarSelector) {
    this._nickname = document.querySelector(nicknameSelector);
    this._description = document.querySelector(descriptionSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._nickname.textContent.trim(),
      about: this._description.textContent.trim(),
      avatar: this._avatar.src,
    };
  }

  setUserInfo({ name, about, avatar }) {
    this._nickname.textContent = name;
    this._description.textContent = about;
    this._avatar.src = avatar;
  }
}
