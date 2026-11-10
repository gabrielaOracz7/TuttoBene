import {
  validateFirstName,
  validateEmail,
  validateMessage,
} from "./validators.js";

const form = document.querySelector(".contact-form");

const name = document.querySelector("#name");
const email = document.querySelector("#email");
const message = document.querySelector("#msg");
const successMessage = document.querySelector(".success-message");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const isNameValid = validateFirstName(name);
  const isEmailValid = validateEmail(email);
  const isMessageValid = validateMessage(message);

  const isFormValid = isNameValid && isEmailValid && isMessageValid;

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

name.addEventListener("input", () => {
  validateFirstName(name);
});

email.addEventListener("input", () => {
  validateEmail(email);
});

message.addEventListener("input", () => {
  validateMessage(message);
});
