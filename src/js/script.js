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
const popupGager = document.querySelector(".gager-popup");

const btnGager = document.querySelectorAll(".calling__btn-gager");

const btnСonsultation = document.querySelector(".individual__offer-btn");
const popupConsultation = document.querySelector(".consultation-popup");
const popupCloseBtn = document.querySelector(".popup__close-btn");

const popups = document.querySelectorAll(".popup");

const openPopup = (popups) => {
  popups.classList.add("popup_opened");
  window.addEventListener("keydown", closeByEscape);
};
// ФУНКЦИЯ ЗАРЫТИЯ ПОПАПА
const closePopup = (popups) => {
  popups.classList.remove("popup_opened");
  window.removeEventListener("keydown", closeByEscape);
};

popupCloseBtn.addEventListener("click", () => {
  closePopup(popupGager);
});

btnGager.forEach((i) => {
  i.addEventListener("click", () => {
    openPopup(popupGager);
  });
});

btnСonsultation.addEventListener("click", () => {
  openPopup(popupConsultation);
});

const closeByEscape = (evt) => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened"); //нашли открытый попап
    closePopup(openedPopup); //закрыли попап
  }
};

popups.forEach((popup) => {
  const textareas = popup.querySelectorAll(".textarea-message");

  textareas.forEach((textarea) => {
    textarea.dataset.defaultValue = textarea.value;

    textarea.addEventListener("click", function () {
      if (this.value === this.dataset.defaultValue) {
        this.value = "";
      }
    });

    textarea.addEventListener("blur", function () {
      if (this.value === "") {
        this.value = this.dataset.defaultValue;
      }
    });
  });

  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__close-btn")) {
      closePopup(popup);
    }
  });
});

Inputmask().mask(document.querySelectorAll(".phone-mask"));
Inputmask("+7(999)999-99-99").mask(".phone-mask");

// Получаем элемент для поля ввода

const form = document.querySelector(".popup__form");

const formGager = document.querySelector(".popup__form-gager");
// const phoneInputGager = formGager.querySelector("#phone-input");
const phoneInputGager = formGager.querySelector(".popup__input-phone_gager");
const inputErrorGager = formGager.querySelector(".popup__input-error");
// console.log(`Форма вызвать замерщика:`, formGager);

const formConsultation = document.querySelector(".popup__form-consultation");
const phoneInputConsultation = formConsultation.querySelector(
  ".popup__input-phone_consultation"
);
const inputErrorConsultation = formConsultation.querySelector(
  ".popup__input-error"
);

let isFormSubmittedGager = false; // Флаг для отслеживания отправки формы
let isFormSubmittedConsultation = false; // Флаг для отслеживания отправки формы
let isFormSubmitCalculate = false; // Флаг для отслеживания отправки формы

// Функция для проверки корректности номера телефона
function validatePhoneNumber(input, error) {
  let isComplete = input.inputmask.isComplete();
  if (isComplete) {
    error.classList.remove("popup__input-error_active");
    return true;
  } else {
    error.classList.add("popup__input-error_active");
    return false;
  }
}

const formGagerBtn = form.querySelector(".popup__submit-gager");
const formConsultationBtn = popupConsultation.querySelector(
  ".popup__submit-consultation"
);

const initialButtonTexts = {};
document.querySelectorAll(".popup__submit").forEach((button) => {
  initialButtonTexts[button.classList] = button.textContent.trim();
});

const setButtonState = (btn, isSending) => {
  btn.disabled = isSending;
  btn.textContent = isSending
    ? "Отправляем..."
    : initialButtonTexts[btn.classList];
  console.log(btn.textContent);
};

const popupSuccess = document.querySelector(".popup-success");

async function sendForm(event, success, popup, button) {
  event.preventDefault();
  setButtonState(button, true);
  try {
    // Формируем запрос
    const response = await fetch(event.target.action, {
      method: "POST",
      body: new FormData(event.target),
    });
    // проверяем, что ответ есть
    if (!response.ok)
      throw `Ошибка при обращении к серверу: ${response.status}`;
    // проверяем, что ответ действительно JSON
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw "Ошибка обработки. Ответ не JSON";
    }
    // обрабатываем запрос
    const json = await response.json();
    if (json.result === "success") {
      if (popup) {
        closePopup(popup);
      }
      success.classList.add("popup-success-active");

      setTimeout(function () {
        success.classList.remove("popup-success-active");
      }, 3000);
      setButtonState(button, false);
    } else {
      // в случае ошибки
      console.log(json);
      throw json.info;
    }
  } catch (error) {
    // обработка ошибки
    alert(error);
  }
}

formGager.addEventListener("submit", async function (evt) {
  evt.preventDefault(); // Предотвращаем отправку формы
  isFormSubmittedGager = true; // Устанавливаем флаг отправки формы

  if (validatePhoneNumber(phoneInputGager, inputErrorGager)) {
    try {
      await sendForm(evt, popupSuccess, popupGager, formGagerBtn);
      formGager.reset(); // Сбрасываем форму
      isFormSubmittedGager = false; // Сбрасываем флаг отправки формы
    } catch (error) {
      alert(error);
      isFormSubmittedGager = false; // Показываем сообщение об ошибке
    }
  } else {
  }
});
// Обработчик события ввода для поля телефона
phoneInputGager.addEventListener("input", function () {
  if (isFormSubmittedGager) {
    validatePhoneNumber(phoneInputGager, inputErrorGager);
  }
});

formConsultation.addEventListener("submit", async function (evt) {
  evt.preventDefault(); // Предотвращаем отправку формы
  isFormSubmittedConsultation = true;

  if (validatePhoneNumber(phoneInputConsultation, inputErrorConsultation)) {
    try {
      await sendForm(evt, popupSuccess, popupConsultation, formConsultationBtn);
      formConsultation.reset(); // Сбрасываем форму
      isFormSubmittedConsultation = false; // Сбрасываем флаг отправки формы
    } catch (error) {
      isFormSubmittedConsultation = false; // Сбрасываем флаг отправки формы

      alert(error); // Показываем сообщение об ошибке
    }
  } else {
  }
});

phoneInputConsultation.addEventListener("input", function () {
  if (isFormSubmittedConsultation) {
    validatePhoneNumber(phoneInputConsultation, inputErrorConsultation);
  }
});

// ФОРМА КАЛЬКУЛЯТОРА

const calculateForm = document.querySelector(".calculate__form");
const calculateFormBtn = calculateForm.querySelector(".calculate__form-button");
const fenceOption = calculateForm.querySelector(".fence");
const inputPhoneCalculate = calculateForm.querySelector(
  ".input-phone_calculate"
);
const inputErrorCalculate = calculateForm.querySelector(
  ".popup__input-error_calculate"
);
console.log(`Форма калькулятора:`, calculateForm);
console.log(inputPhoneCalculate);
console.log(inputErrorCalculate);
// console.log(`Кнопка отправки калькулятора:`, calculateFormBtn);
// console.log(`Селект выбора забора:`, fenceOption.value);

calculateForm.addEventListener("submit", async function (evt) {
  evt.preventDefault(); // Предотвращаем отправку формы
  isFormSubmitCalculate = true;

  if (validatePhoneNumber(inputPhoneCalculate, inputErrorCalculate)) {
    try {
      await sendForm(evt, popupSuccess, undefined, calculateFormBtn);
      calculateForm.reset(); // Сбрасываем форму
      isFormSubmitCalculate = false; // Сбрасываем флаг отправки формы
    } catch (error) {
      isFormSubmitCalculate = false; // Сбрасываем флаг отправки формы

      alert(error); // Показываем сообщение об ошибке
    }
  } else {
  }
});

inputPhoneCalculate.addEventListener("input", function () {
  if (isFormSubmitCalculate) {
    validatePhoneNumber(inputPhoneCalculate, inputErrorCalculate);
  }
});
