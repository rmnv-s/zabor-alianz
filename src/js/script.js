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
      mode: "no-cors",
    });
    // проверяем, что ответ есть
    if (!response.ok)
      throw `Ошибка при обращении к серверу: ${response.status}`;
    // проверяем, что ответ действительно JSON
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw "Ошибка обработки. Ответ не JSON б..";
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
      // console.log(json);
      throw json.info;
    }
  } catch (error) {
    // обработка ошибки
    if (popup) {
      closePopup(popup);
    }
    success.classList.add("popup-success-active");

    setTimeout(function () {
      success.classList.remove("popup-success-active");
    }, 3000);
    setButtonState(button, false);
    // alert(error);
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

//

// КАРТОЧКИ ЗАБОРОВ
const cardBtnDetail = document.querySelectorAll(".card__btn");
const cardListHeading = document.querySelector(".card__list-heading");
const cardPopup = document.querySelector(".card-popup");

const cardPopupHeading = cardPopup.querySelector(".popup-card__heading");
const cardPopupHeadingNew = cardPopup.querySelector(
  ".card-popup__description-heading"
);
const cardPopupText = cardPopup.querySelector(".popup-card__text");
const cardPopupTextOne = cardPopup.querySelector(".popup-card__text_1");
const cardPopupTextTwo = cardPopup.querySelector(".popup-card__text_2");

cardBtnDetail.forEach((item) => {
  item.addEventListener("click", () => {
    openPopup(cardPopup);

    // Находим родительский элемент карточки
    const card = item.closest(".card__list");
    const cardTitlePopup = card.querySelector(
      ".card-popup__description-heading"
    );
    const cardTextPopup = card.querySelector(".card__text-description");
    const cardTextPopupOne = card.querySelector(".card__text-description-1");
    const cardTextPopupTwo = card.querySelector(".card__text-description-2");
    // Получаем title карточки
    cardPopupHeading.textContent = cardTitlePopup.textContent;

    cardPopupText.textContent = cardTextPopup.textContent;
    cardPopupTextOne.textContent = cardTextPopupOne.textContent;
    cardPopupTextTwo.textContent = cardTextPopupTwo.textContent;
  });
});

// //////////////////////////////

const dataPrice = [
  {
    name: "Евроштакетник",
    height: "1.5",
    price: 1900,
  },
  {
    name: "Евроштакетник",
    height: "1.7",
    price: 2060,
  },
  {
    name: "Евроштакетник",
    height: "1.8",
    price: 2180,
  },
  {
    name: "Евроштакетник",
    height: "2",
    price: 2320,
  },
  //
  {
    name: "Профнастил",
    height: "1.5",
    price: 1600,
  },
  {
    name: "Профнастил",
    height: "1.7",
    price: 1750,
  },
  {
    name: "Профнастил",
    height: "1.8",
    price: 1800,
  },
  {
    name: "Профнастил",
    height: "2",
    price: 1920,
  },
  //
  {
    name: "Рабица",
    height: "1.5",
    price: 680,
  },
  {
    name: "Рабица",
    height: "1.8",
    price: 730,
  },
  {
    name: "Рабица",
    height: "2.0",
    price: 860,
  },

  // 3D
  {
    name: "3D",
    height: "1.5",
    price: 1450,
  },
  {
    name: "3D",
    height: "1.8",
    price: 1450,
  },
  {
    name: "3D",
    height: "2.0",
    price: 1450,
  },
  {
    name: "Навесы",
    price: 999,
  },
];
// //////////////////////////////

// CALCULAT
// ФОРМА КАЛЬКУЛЯТОРА
const calculateFormPrice = document.querySelector(".calculate__form-price");

const calculateForm = document.querySelector(".calculate__form");
const calculateFormBtn = calculateForm.querySelector(".calculate__form-button");
const fenceOption = calculateForm.querySelector("#fence");
const fenceOptionHeight = calculateForm.querySelector("#fence-height");
const fenceInputLengthMetre = calculateForm.querySelector(
  ".input-length__fence-metre"
);
const priceNumber = calculateForm.querySelector(
  ".calculate__form-price-number"
);
const fenceInputRoof = calculateForm.querySelector(".input-length__roof");

// КНОПКА ПОДСЧЕТА
calculateForm.addEventListener("submit", async function (evt) {
  evt.preventDefault();
  // Находим соответствующий объект в массиве formEuroData
  const selectedOption = dataPrice.find((option) => {
    if (fenceOption.value !== "Навесы") {
      return (
        option.height === fenceOptionHeight.value &&
        option.name === fenceOption.value
      );
    } else {
      return option.name === fenceOption.value;
    }
  });

  console.log(selectedOption);
  if (selectedOption) {
    // Извлекаем стоимость из выбранного объекта
    const price = selectedOption.price;
    //     // Вычисляем итоговую стоимость с учетом длины забора
    const totalPrice = price * parseFloat(fenceInputLengthMetre.value);
    //     // Устанавливаем итоговую стоимость в состояние
    priceNumber.textContent = `${totalPrice} ₽`;
    //
    fenceOptionHeight.value = "";
    fenceInputLengthMetre.value = "";
  }
});

const optionElement = calculateForm.querySelector(
  '#fence-height option[value="1.7"]'
);

// ИНПУТЫ
fenceOption.addEventListener("change", () => {
  const selectedValue = fenceOption.value;

  if (
    selectedValue === "Профнастил" ||
    selectedValue === "Евроштакетник" ||
    selectedValue === "3D" ||
    selectedValue === "Рабица"
  ) {
    fenceOptionHeight.classList.remove("input-hidden");
    fenceInputLengthMetre.classList.remove("input-hidden");
    fenceInputRoof.classList.add("input-hidden");
    fenceInputLengthMetre.setAttribute("required", "");
    fenceOptionHeight.setAttribute("required", "");
  }
  if (selectedValue === "Навесы") {
    fenceOptionHeight.classList.add("input-hidden");
    fenceInputLengthMetre.classList.add("input-hidden");
    fenceInputRoof.classList.remove("input-hidden");
    fenceInputRoof.setAttribute("required", "");
    fenceInputLengthMetre.removeAttribute("required", "");
    fenceOptionHeight.removeAttribute("required", "");
  }
  if (selectedValue === "Ворота") {
    fenceOptionHeight.classList.add("input-hidden");
    fenceInputLengthMetre.classList.add("input-hidden");
    fenceInputRoof.classList.add("input-hidden");
    calculateFormPrice.classList.add("input-hidden");
  } else {
    calculateFormPrice.classList.remove("input-hidden");
  }

  if ((optionElement && selectedValue === "3D") || selectedValue === "Рабица") {
    optionElement.style.display = "none";
    // optionElementValueType.textContent = "Высота забора";
  } else {
    optionElement.style.display = "block";
  }

  // Проверяем текущее значение fenceOptionHeight
  if (
    (fenceOptionHeight.value === "1.7" && selectedValue === "3D") ||
    selectedValue === "Рабица"
  ) {
    // Если текущее значение равно "1.7" и выбрано "3D", сбрасываем его на значение "type"
    fenceOptionHeight.value = "";
  }

  //
});
