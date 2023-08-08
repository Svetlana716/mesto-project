export default class UserInfo {
  constructor({
    profileNameSelector,
    profileDescriptionSelector,
    profileAvatarSelector,
  }) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileDescription = document.querySelector(profileDescriptionSelector);
    this._profileAvatar = document.querySelector(profileAvatarSelector);
  }
  //возвращает объект с данными пользователя
  getUserInfo() {//Когда данные пользователя нужно будет подставить в форму при открытии
    const dataUser = {
      name: this._profileName.textContent,
      about: this._profileDescription.textContent,
      avatar: this._profileAvatar.src,
    };
    return dataUser;
  }

  setUserInfo(data) { //принимает новые данные пользователя, отправляет их на сервер и добавляет их на страницу
    this._profileName.textContent = data.name;
    this._profileDescription.textContent = data.about;
    this._profileAvatar.style.backgroundImage = `url("${data.avatar}")`;
    this._userId = data._id;
  }
}
