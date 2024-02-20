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

const callBtn = document.querySelector(".calling__btn-online");
const menuLinks = document.querySelectorAll(".main-nav a");

menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menuBtn.classList.toggle("active");
    header.classList.remove("menu-open");
    body.classList.remove("no-scroll");

    mainNav.classList.remove("open");
    calling.classList.remove("open");
    headerPhone.classList.remove("header__phone-open-burger");
  });
});

callBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("active");
  header.classList.remove("menu-open");
  body.classList.remove("no-scroll");

  mainNav.classList.remove("open");
  calling.classList.remove("open");
  headerPhone.classList.remove("header__phone-open-burger");
});

// POPUPs
const popup = document.querySelector(".popup");
const btnGager = document.querySelector(".calling__btn-gager");
const popupGager = document.querySelector(".gager-popup");
const popupCloseBtn = document.querySelector(".popup__close-btn");

const openPopup = (popups) => {
  popups.classList.add("popup_opened");
  window.addEventListener("keydown", closeByEscape);
};
// ФУНКЦИЯ ЗАРЫТИЯ ПОПАПА
const closePopup = (popups) => {
  popups.classList.remove("popup_opened");
  window.removeEventListener("keydown", closeByEscape);
};

btnGager.addEventListener("click", () => {
  openPopup(popupGager);
});

popupCloseBtn.addEventListener("click", () => {
  closePopup(popupGager);
});

const closeByEscape = (evt) => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened"); //нашли открытый попап
    closePopup(openedPopup); //закрыли попап
  }
};

// TEXTAREA
const textarea = popup.querySelector(".textarea-message");
console.log(textarea);

textarea.addEventListener("click", function () {
  if (this.value === this.defaultValue) {
    this.value = "";
  }
});

textarea.addEventListener("blur", function () {
  if (this.value === "") {
    this.value = this.defaultValue;
  }
});
