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

let login = localStorage.getItem('memberName');

function toggleModal() {
  modalBasket.classList.toggle('is-open');
}

function toggleModalAuth() {
  modalAuth.classList.toggle('is-open');
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
    buttonLogout.removeEventListener('click', logOut);

    checkAuth();



  }

  console.log('авторизован');
  userName.textContent = login; // присвоение контента с login

  buttonAuth.style.display = 'none'; //присвоение стиля кнопке после авторизации
  buttonLogout.style.display = 'inline';

  buttonLogout.addEventListener('click', logOut);

}

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
}

function checkAuth() {
  if (login) {
    autorized();
  } else {
    notAutorized();
  }
}

function createCardRestaurants() {

  const card = `
    <a class="cards__item">
      <img src="./images/pizza-plus/preview.jpg" alt="caesar" class="cards__image">
      <div class="cards__description">
        <div class="cards__heading">
          <h3 class="cards__title">Пицца плюс</h3>
          <span class="cards__tag tag">50 мин</span>
        </div>
        <div class="cards__info">
          <div class="cards__rating">
            <svg class="cards__svg">
              <use href="./images/icons/sprite.svg#rating"></use>
            </svg>4</div>
          <div class="cards__price">от 65 грн.</div>
          <div class="cards__category">пицца</div>
        </div>
      </div>
    </a>
  `;

  cardsRestaurants.insertAdjacentHTML('beforeend', card);

}

function createCardGood() {
  const card = document.createElement('div')
  card.className = 'cards__item';

  card.insertAdjacentHTML('beforeend', `
    <img src="./images/pizza-plus/pizza-girls.jpg" alt="caesar" class="cards__image">
    <div class="cards__text">
      <h3 class="cards__title-second">Пицца гриль</h3>
      <p class="cards__description-second">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur, impedit.
      </p>
    </div>
    <div class="cards__info-second">
      <button class="cards__button button">в корзину<svg class="cards__button-svg">
          <use href="./images/icons/sprite.svg#shopping-cart-white"></use>
        </svg></button>

      <span class="cards__price-second">75 грн.</span>
  `);

  cardsMenuItem.insertAdjacentElement('beforeend', card);
}

function openGoods(event) {


  const target = event.target;

  const restaurant = target.closest('.cards__item');

  if (restaurant) {
    cardsMenuItem.textContent = '';

    promo.classList.add('hide');
    restaurants.classList.add('hide');
    cardsMenu.classList.remove('hide');

    createCardGood();
    createCardGood();
    createCardGood();
    createCardGood();
    createCardGood();
    createCardGood();

  }



}

// код для открытие и закрытия корзины
buttonBasket.addEventListener('click', toggleModal);
close.addEventListener('click', toggleModal);

// код для открытия и закрытия авторизации
buttonAuth.addEventListener('click', toggleModalAuth);
closeAuth.addEventListener('click', toggleModalAuth);

cardsRestaurants.addEventListener('click', openGoods);
logotype.addEventListener('click', function () {
  promo.classList.remove('hide')
  restaurants.classList.remove('hide')
  cardsMenu.classList.add('hide')
})

checkAuth();

createCardRestaurants();
createCardRestaurants();
createCardRestaurants();
createCardRestaurants();
createCardRestaurants();
createCardRestaurants();