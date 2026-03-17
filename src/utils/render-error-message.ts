import { ErrorResponse } from "../interfaces/error-response";

const renderErrorMessage = (errors: ErrorResponse) => {
  const container = document.querySelector(".errors-form-container");
  if (!container) return;
  container.innerHTML = "";

  errors.map((error) => {
    const message = document.createElement("p");
    message.innerText = error.message;
    message.classList.add("error-form-message");

    container.appendChild(message);

    const clean = document.querySelector(error.field) as HTMLInputElement;
    clean.value = "";
  });
};

export { renderErrorMessage };
