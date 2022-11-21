export class UserInfo {
  constructor(nicknameSelector, descriptionSelector) {
    this._nickname = document.querySelector(nicknameSelector);
    this._description = document.querySelector(descriptionSelector);
  }

  getUserInfo() {
    return {
      nickname: this._nickname.textContent.trim(),
      description: this._description.textContent.trim(),
    };
  }

  setUserInfo({nickname, description}) {
    this._nickname.textContent = nickname;
    this._description.textContent = description;
  }
}

// Создайте класс UserInfo
// Класс UserInfo отвечает за управление отображением информации о пользователе на странице.
// Этот класс:
// Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.
// Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя.
// Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
// Содержит публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу.
