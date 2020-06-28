const buttonBasket = document.querySelector('.button-basket');
const modalBasket = document.querySelector('.modal__basket');
const close = document.querySelector('.modal__button-close');
const buttonAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal__auth');
const closeAuth = document.querySelector('.modal__button-close-auth');
const logInForm = document.querySelector('#logInForm');

let login = '';


// код для открытие и закрытия корзины
buttonBasket.addEventListener('click', toggleModal);
close.addEventListener('click', toggleModal);

function toggleModal() {
  modalBasket.classList.toggle('is-open');
}


// код для открытия и закрытия авторизации
buttonAuth.addEventListener('click', toggleModalAuth);
closeAuth.addEventListener('click', toggleModalAuth);

function toggleModalAuth() {
  modalAuth.classList.toggle('is-open');
}


// авторизация
function autorized() {
  console.log('авторизован');
}

function notAutorized() {
  console.log('не авторизован');

  function logIn() {
    console.log('логин');
  }

  buttonAuth.addEventListener('click', toggleModalAuth);
  closeAuth.addEventListener('click', toggleModalAuth);
  logInForm.addEventListener('submit', logIn);
}

if (login) {
  autorized();
} else {
  notAutorized();
}


