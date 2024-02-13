const swiper = new Swiper(".swiper", {
  slidesPerView: 1,
  direction: "horizontal",
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  scrollbar: {
    el: ".swiper-scrollbar",
  },

  autoplay: {
    delay: 5000, // Задержка между прокруткой каждого слайда в миллисекундах
    disableOnInteraction: false, // При значении true автопрокрутка отключится после взаимодействия пользователя (например, касания слайдера)
  },
});

window.addEventListener("scroll", function () {
  const header = document.querySelector(".header");
  const scrollPosition = window.scrollY;

  if (scrollPosition > 100) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// const swiperComment = new Swiper(".swiper-comment", {
//   slidesPerView: 3,
//   spaceBetween: 30,
//   loop: true,
//   navigation: {
//     nextEl: ".swiper-button-next",
//     prevEl: ".swiper-button-prev",
//   },
//   pagination: {
//     el: ".swiper-pagination-comment",
//     clickable: true,
//   },
// });

// console.log(swiperComments);
// INPUT Длинна забора
// const formCalculate = document.querySelector(".calculate__form");
// const inputNumberLengthFence = formCalculate.querySelector(
//   ".input-length__fence"
// );
// // const formInputError = document.querySelector(".form-input__error");
//
// inputNumberLengthFence.addEventListener("keydown", function (evt) {
//   // Проверяем, была ли введена цифра
//   if (Number.isNaN(Number(evt.key))) {
//     // Если пользователь ввёл не цифру, показываем блок с ошибкой
//     // formInputError.style.display = "block";
//     // evt.preventDefault();
//     console.log("нужны цифры");
//   } else if (
//     inputNumberLengthFence.value.length >= 4 &&
//     evt.key !== "Backspace"
//   ) {
//     evt.preventDefault();
//     console.log("притормози");
//   }
// });

// БУРГЕР МЕНЮ
let menuBtn = document.querySelector(".burger-menu");
const body = document.querySelector("body");
const header = document.querySelector(".header__nav");

const mainNav = document.querySelector(".main-nav");
const calling = document.querySelector(".calling");

const headerPhone = document.querySelector(".header__phone");

menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("active");

  if (menuBtn.classList.contains("active")) {
    body.classList.add("no-scroll");
    header.classList.add("menu-open");

    mainNav.classList.add("open");
    calling.classList.add("open");

    headerPhone.classList.add("header__phone-open-burger");
  } else {
    header.classList.remove("menu-open");
    body.classList.remove("no-scroll");

    mainNav.classList.remove("open");
    calling.classList.remove("open");
    headerPhone.classList.remove("header__phone-open-burger");
  }
});
