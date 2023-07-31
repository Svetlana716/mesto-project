import {createCard} from './Card.js'
import { cardsList } from '../utils/constants';

/*export default class Section {
  constructor ({ data, renderer }, containerSelector) {
    this._initialArray = data;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  setItem (element) {
    this._container.append(element);
  }

  renderItems () {
    this._initialArray.forEach((item) => {
      this._renderer(item);
    })
  }
}


const cardList = new Section({
  data: cardsData,
  renderer: (cardItem) => {
    const card = new Card (data, userId, '#card');
    const cardElement = card.generate();
    cardList.setItem(cardElement);
  },
  cardsList
});

cardList.renderItems(); */

/////////////////////////////////////

export function renderNewCard(data, userId) {
  const card = createCard (data, userId);
  cardsList.prepend(card);
};

export function renderInitialCards(cardsData, userId) {
cardsData.forEach((data => {
  const card = createCard(data, userId);
  cardsList.append(card);
}))
};
