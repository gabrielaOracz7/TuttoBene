export function showError(input, msg) {
  input.setCustomValidity(msg);

  const errorElement = input.parentElement.querySelector(".error-message");
  errorElement.textContent = msg;
}

export function clearError(input) {
  input.setCustomValidity("");

  const errorElement = input.parentElement.querySelector(".error-message");
  errorElement.textContent = "";
}

export function validateFirstName(input) {
  const value = input.value.trim();
  const namePattern = /^[\p{L}]+$/u;

  if (value.length < 2) {
    showError(input, "Imię musi posiadać co najmniej 2 znaki");
    return false;
  }
  if (value.length > 30) {
    showError(input, "Imię może posiadać maksymalnie 30 znaków");
    return false;
  }
  if (!namePattern.test(value)) {
    showError(input, "Imię może zawierać tylko litery");
    return false;
  }
  clearError(input);
  return true;
}

export function validateLastName(input) {
  const value = input.value.trim();
  const namePattern = /^[\p{L}-]+$/u;

  if (value.length < 2) {
    showError(input, "Naziwsko musi posiadać co najmniej 2 znaki");
    return false;
  }
  if (value.length > 50) {
    showError(input, "Nazwisko może posiadać maksymalnie 50 znaków");
    return false;
  }
  if (!namePattern.test(value)) {
    showError(input, "Nazwisko może zawierać tylko litery i znak -");
    return false;
  }
  clearError(input);
  return true;
}

export function validatePhone(input) {
  const value = input.value.trim();
  const phonePattern = /^[0-9]{9}$/;
  if (!phonePattern.test(value)) {
    showError(input, "Numer telefonu musi zawierać 9 cyfr");
    return false;
  }
  clearError(input);
  return true;
}

export function validateEmail(input) {
  const value = input.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(value)) {
    showError(input, "Wprowadź poprawny adres email");
    return false;
  }
  clearError(input);
  return true;
}

export function validateGuests(input) {
  const value = Number(input.value);
  if (!Number.isInteger(value) || value < 1 || value > 50) {
    showError(input, "Liczba osób musi być z zakresu 1-50");
    return false;
  }
  clearError(input);
  return true;
}

export function validateHour(input) {
  const value = input.value;
  if (value < "15:00" || value > "19:00") {
    showError(input, "Rezerwacje mozliwe między 15:00 a 19:00");
    return false;
  }
  const minutes = value.split(":")[1];
  if (minutes !== "00" && minutes !== "30") {
    showError(input, "Rezerwacje możliwe tylko co pół godziny");
    return false;
  }

  clearError(input);
  return true;
}

export function validateDate(input) {
  const selectedDate = input.value;
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  const todayString = `${year}-${month}-${day}`;

  if (!selectedDate) {
    showError(input, "Wybierz datę rezerwacji");
    return false;
  }

  if (selectedDate <= todayString) {
    showError(input, "Wymagadne co najmniej jednodniowe wyprzedzenie.");
    return false;
  }
  clearError(input);
  return true;
}

export function validateMessage(input) {
  const value = input.value.trim();

  if (!value) {
    showError(input, "Wpisz treść wiadomości");
    return false;
  }

  if (value.length < 10) {
    showError(input, "Wiadomość powinna mieć minimum 10 znaków.");
    return false;
  }
  if (value.length > 500) {
    showError(input, "Wiadomość może mieć makrymalnie 500 znaków.");
    return false;
  }

  clearError(input);
  return true;
}
