import {
  validateFirstName,
  validateLastName,
  validateGuests,
  validatePhone,
  validateDate,
  validateHour,
  validateEmail,
} from "./validators.js";

const form = document.querySelector(".reservations-form");

const firstName = document.querySelector("#first_name");
const lastName = document.querySelector("#last_name");
const email = document.querySelector("#email");
const guests = document.querySelector("#guests");
const date = document.querySelector("#date");
const hour = document.querySelector("#hour");
const phone = document.querySelector("#phone");
const successMessage = document.querySelector(".success-message");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const isFirstNameValid = validateFirstName(firstName);
  const isLastNameValid = validateLastName(lastName);
  const isPhoneValid = validatePhone(phone);
  const isGuestsValid = validateGuests(guests);
  const isEmailValid = validateEmail(email);
  const isDateValid = validateDate(date);
  const isHourValid = validateHour(hour);

  const isFormValid =
    isFirstNameValid &&
    isLastNameValid &&
    isPhoneValid &&
    isGuestsValid &&
    isEmailValid &&
    isDateValid &&
    isHourValid;

  if (!isFormValid) {
    form.reportValidity();
    return;
  }

  successMessage.hidden = false;

  setTimeout(() => {
    successMessage.hidden = true;
    form.reset();
  }, 3000);
});

firstName.addEventListener("input", () => {
  validateFirstName(firstName);
});

lastName.addEventListener("input", () => {
  validateLastName(lastName);
});

email.addEventListener("input", () => {
  validateEmail(email);
});

phone.addEventListener("input", () => {
  validatePhone(phone);
});

guests.addEventListener("input", () => {
  validateGuests(guests);
});

date.addEventListener("change", () => {
  validateDate(date);
});

hour.addEventListener("change", () => {
  validateHour(hour);
});
