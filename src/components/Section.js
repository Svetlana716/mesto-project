export default class Section {
  //круто сделала, я сам голову ломал как реализовать
  constructor({ items, renderer }, containerSelector) {
    this._initialArray = items; // массив данных, которые нужно добавить на страницу при инициализации класса
    this._renderer = renderer; // функция, которая отвечает за создание и отрисовку данных на странице
    this._container = document.querySelector(containerSelector); // селектор контейнера, в который нужно добавлять созданные элементы
  }
  //отвечает за отрисовку всех элементов.
  //Отрисовка каждого отдельного элемента должна осуществляться функцией renderer.
  renderItems() {
    this._initialArray.forEach((item) => {
      this._renderer(item);
    });
  }
  // принимает DOM-элемент и добавляет его в контейнер
  addItem(element) {
    this._container.append(element);
  }
}
