const swiper = new Swiper(".swiper", {
  direction: "horizontal",
  loop: true,

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // And if we need scrollbar
  scrollbar: {
    el: ".swiper-scrollbar",
  },
});

const swiperComments = new Swiper(".swiper-comment", {
  direction: "horizontal",
  slidesPerView: 3,
  spaceBetween: 60,
  loop: true,

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // And if we need scrollbar
  scrollbar: {
    el: ".swiper-scrollbar",
  },
});

// INPUT Длинна забора
const formCalculate = document.querySelector(".calculate__form");
const inputNumberLengthFence = formCalculate.querySelector(
  ".input-length__fence"
);
// const formInputError = document.querySelector(".form-input__error");

inputNumberLengthFence.addEventListener("keydown", function (evt) {
  // Проверяем, была ли введена цифра
  if (Number.isNaN(Number(evt.key))) {
    // Если пользователь ввёл не цифру, показываем блок с ошибкой
    // formInputError.style.display = "block";
    // evt.preventDefault();
    console.log("нужны цифры");
  } else if (
    inputNumberLengthFence.value.length >= 4 &&
    evt.key !== "Backspace"
  ) {
    evt.preventDefault();
    console.log("притормози");
  }
});
