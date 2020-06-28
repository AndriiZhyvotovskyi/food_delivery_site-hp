const modalOpen = document.querySelector("#modalOpen");
const modal = document.querySelector('.modal');
const close = document.querySelector('.modal__button-close');

modalOpen.addEventListener('click', function (event) {
  modal.classList.add("is-open");
});
close.addEventListener('click', function (event) {
  modal.classList.remove("is-open");
});