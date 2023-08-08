export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer; // функция, которая отвечает за создание и отрисовку данных на странице
    this._container = document.querySelector(containerSelector); // селектор контейнера, в который нужно добавлять созданные элементы
  }
  //отвечает за отрисовку всех элементов.
  renderItems(items) {
    items.forEach((item) => {
      this._container.append(this._renderer(item));
    });
  }
  // принимает DOM-элемент и добавляет его в контейнер
  addItem(item) {
    this._container.prepend(this._renderer(item));
  }
};
