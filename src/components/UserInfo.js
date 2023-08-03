export default class UserInfo {
  constructor({
    profileNameSelector,
    profileDescriptionSelector,
    profileAvatarSelector,
  }) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileDescription = document.querySelector(
      profileDescriptionSelector
    );
    this._profileAvatar = document.querySelector(profileAvatarSelector);
  }
  //возвращает объект с данными пользователя
  getUserInfo() {
    //Когда данные пользователя нужно будет подставить в форму при открытии

    const dataUser = {
      //объект с данными пользователя
      //добавил в объект avatar
      //записываем в объект не селекторы, а значения полей этихъ селекторов
      name: this._profileName.textContent,
      about: this._profileDescription.textContent,
      avatar: this._profileAvatar.src,
    };
    return dataUser;
  }
  //мне кажется, что _id: id здесь лишнее

  setUserInfo(data) {
    //принимает новые данные пользователя, отправляет их на сервер и добавляет их на страницу
    //добавляем не селектор новый, а изменяем их атрибуты textContent и src
    this._profileName.textContent = data.name;
    this._profileDescription.textContent = data.about;
    this._profileAvatar.src = data.avatar;
    //this._userId = id;
  }
}
