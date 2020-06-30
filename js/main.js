'use strict';

const buttonBasket = document.querySelector('.button-basket');
const modalBasket = document.querySelector('.modal__basket');
const close = document.querySelector('.modal__button-close');
const buttonAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal__auth');
const closeAuth = document.querySelector('.modal__button-close-auth');
const logInForm = document.querySelector('#logInForm');
const loginInput = document.querySelector('#login');
const userName = document.querySelector('.user-name');
const buttonLogout = document.querySelector('.button-logout');
const cardsRestaurants = document.querySelector('.cards-restaurants');
const promo = document.querySelector('.promo');
const restaurants = document.querySelector('.restaurants');
const cardsMenu = document.querySelector('.restaurants-menu');
const logotype = document.querySelector('.logotype');
const cardsMenuItem = document.querySelector('.cards-menu');
const restaurantsHeading = document.querySelector('.restaurants__heading-second');
const restaurantsTitle = document.querySelector('.restaurants__title-second');
const rating = document.querySelector('.restaurants__heading-quantity');
const minPrice = document.querySelector('.restaurants__heading-price');
const category = document.querySelector('.restaurants__heading-caregory');
const modalItem = document.querySelector('.modal__item');
const modalPrice = document.querySelector('.modal__price');
const modalClear = document.querySelector('.modal__clear');



let login = localStorage.getItem('memberName');

const basket = [];

const getData = async function (url) {

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Ошибка  по адресу ${url},
      статус ошибка ${ response.status}!`);
  }

  return await response.json();

};

getData('./db/partners.json');

function toggleModal() {
  modalBasket.classList.toggle('is-open');
};

function toggleModalAuth() {
  modalAuth.classList.toggle('is-open');
};

function returnMain() {
  promo.classList.remove('hide')
  restaurants.classList.remove('hide')
  cardsMenu.classList.add('hide')
}

// авторизация
function autorized() {

  function logOut() {
    login = null;
    localStorage.removeItem('memberName');
    buttonAuth.style.display = ''; //присвоение стиля кнопке после авторизации
    buttonLogout.style.display = '';
    userName.style.display = '';
    userName.textContent = '';
    buttonBasket.style.display = '';
    buttonLogout.removeEventListener('click', logOut);

    checkAuth();

  }

  console.log('авторизован');
  userName.textContent = login; // присвоение контента с login
  buttonBasket.style.display = 'inline';

  buttonAuth.style.display = 'none'; //присвоение стиля кнопке после авторизации
  buttonLogout.style.display = 'inline';

  buttonLogout.addEventListener('click', logOut);

};

function notAutorized() {
  console.log('не авторизован');

  function logIn(event) {
    event.preventDefault();
    login = loginInput.value;

    localStorage.setItem('memberName', login);

    toggleModalAuth();
    buttonAuth.removeEventListener('click', toggleModalAuth);
    closeAuth.removeEventListener('click', toggleModalAuth);
    logInForm.removeEventListener('submit', logIn);
    logInForm.reset();
    checkAuth()

  }

  buttonAuth.addEventListener('click', toggleModalAuth);
  closeAuth.addEventListener('click', toggleModalAuth);
  logInForm.addEventListener('submit', logIn);
};

function checkAuth() {
  if (login) {
    autorized();
  } else {
    notAutorized();
  }
};

function createCardRestaurants(restaurant) {

  const {
    image,
    kitchen,
    name,
    price,
    products,
    stars,
    time_of_delivery: timeOfDelivery
  } = restaurant;

  const card = `
    <a class="cards__item" 
      data-products="${products}"
      data-info="${[name, stars, price, kitchen]}">
      <img src="${image}" alt="caesar" class="cards__image">
      <div class="cards__description">
        <div class="cards__heading">
          <h3 class="cards__title">${name}</h3>
          <span class="cards__tag tag">${timeOfDelivery} мин</span>
        </div>
        <div class="cards__info">
          <div class="cards__rating">
            <svg class="cards__svg">
              <use href="./images/icons/sprite.svg#rating"></use>
            </svg>${stars}</div>
          <div class="cards__price">от ${price} грн.</div>
          <div class="cards__category">${kitchen}</div>
        </div>
      </div>
    </a>
  `;

  cardsRestaurants.insertAdjacentHTML('beforeend', card);

};

function createCardGood(goods) {

  const {
    description,
    id,
    image,
    name,
    price
  } = goods;

  const card = document.createElement('div')
  card.className = 'cards__item';
  card.insertAdjacentHTML('beforeend', `
    <img src="./${image}" alt="caesar" class="cards__image">
    <div class="cards__text">
      <h3 class="cards__title-second">${name}</h3>
      <p class="cards__description-second">
        ${description}
      </p>
    </div>
    <div class="cards__info-second">
      <button class="cards__button button" id="${id}">в корзину<svg class="cards__button-svg">
          <use href="./images/icons/sprite.svg#shopping-cart-white"></use>
        </svg></button>

      <span class="cards__price-second">${price} грн.</span>
  `);

  cardsMenuItem.insertAdjacentElement('beforeend', card);

};

function openGoods(event) {

  const target = event.target;
  if (login) {

    const restaurant = target.closest('.cards__item');

    if (restaurant) {

      const info = restaurant.dataset.info;
      const [name, stars, price, kitchen] = info.split(',');

      cardsMenuItem.textContent = '';
      promo.classList.add('hide');
      restaurants.classList.add('hide');
      cardsMenu.classList.remove('hide');

      restaurantsTitle.textContent = name;
      rating.textContent = stars;
      minPrice.textContent = `От ${price} грн`;
      category.textContent = kitchen;

      getData(`./db/${restaurant.dataset.products}`).then(function (data) {
        data.forEach(createCardGood);
      });

    }
  } else {
    toggleModalAuth();
  }

};


function addToBasket(event) {

  const target = event.target;

  const buttonAddBasket = target.closest('.cards__button'); // любой клик приводим к обертке .cards__button

  if (buttonAddBasket) {
    const card = target.closest('.cards__item');         //получение карточки
    const title = card.querySelector('.cards__title-second').textContent;
    const cost = card.querySelector('.cards__price-second').textContent;
    const id = buttonAddBasket.id;

    const food = basket.find(function (item) {
      return item.id === id;
    })

    if (food) {
      food.count += 1;
    } else {
      basket.push({
        id,
        title,
        cost,
        count: 1
      });
    }
  }
}

function renderBasket() {
  modalItem.textContent = '';

  basket.forEach(function ({ id, title, cost, count }) {
    const itemBasket = `
      <div class="modal__row">
        <span class="modal__row-title">${title}</span>
        <strong class="modal__row-price">${cost}</strong>
        <div class="modal__row-counter">
          <button class="counter-button counter-minus" data-id=${id}>
            -
          </button>
          <span class="counter">${count}</span>
          <button class="counter-button counter-plus" data-id=${id}>
            +
          </button>
        </div>
      </div>
    `;

    modalItem.insertAdjacentHTML('afterbegin', itemBasket)
  });

  const totalPrice = basket.reduce(function (result, item) {
    return result + (parseFloat(item.cost)) * item.count;
  }, 0);

  modalPrice.textContent = totalPrice + ' грн.';

}

function changeCount(event) {
  const target = event.target;

  if (target.classList.contains('counter-button')) {
    const food = basket.find(function (item) {
      return item.id === target.dataset.id;
    });
    if (target.classList.contains('counter-minus')) {
      food.count--;
      if (food.count === 0) {
        basket.splice(basket.indexOf(food), 1);
      }
    };
    if (target.classList.contains('counter-plus')) food.count++;
    renderBasket();
  }
}

function init() {

  getData('./db/partners.json').then(function (data) {
    data.forEach(createCardRestaurants);
  });


  // код для открытие и закрытия корзины
  buttonBasket.addEventListener('click', function () {
    renderBasket();
    toggleModal();
  });

  modalItem.addEventListener('click', changeCount);

  close.addEventListener('click', toggleModal);

  // код для открытия и закрытия авторизации
  buttonAuth.addEventListener('click', toggleModalAuth);

  modalClear.addEventListener('click', function () {
    basket.length = 0;
    renderBasket();
  });

  closeAuth.addEventListener('click', toggleModalAuth);

  cardsMenu.addEventListener('click', addToBasket);

  cardsRestaurants.addEventListener('click', openGoods);

  logotype.addEventListener('click', function () {
    promo.classList.remove('hide')
    restaurants.classList.remove('hide')
    cardsMenu.classList.add('hide')
  });

  checkAuth();

}

init();