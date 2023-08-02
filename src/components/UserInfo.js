export default class UserInfo {
  constructor ({profileNameSelector, profileDescriptionSelector, profileAvatarSelector}) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileDescription = document.querySelector(profileDescriptionSelector);
    this._profileAvatar = document.querySelector(profileAvatarSelector);
  }

  getUserInfo() {  //Когда данные пользователя нужно будет подставить в форму при открытии
    return { //объект с данными пользователя
      name: this._profileName,
      about: this._profileDescription,
    }
  }

  setUserInfo ({name, about, avatar, _id: id}) { //принимает новые данные пользователя, отправляет их на сервер и добавляет их на страницу
    this._profileName = name;
    this._profileDescription = about;
    this._profileAvatar = avatar;
    this._userId = id;
  }
}
