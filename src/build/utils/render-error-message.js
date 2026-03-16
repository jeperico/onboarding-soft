const renderErrorMessage = (errors) => {
    const container = document.querySelector(".errors-form-container");
    if (!container)
        return;
    container.innerHTML = "";
    errors.map((error) => {
        const message = document.createElement("p");
        message.innerText = error.message;
        message.classList = "error-form-message";
        container.appendChild(message);
        const clean = document.querySelector(error.field);
        clean.value = "";
    });
};
export { renderErrorMessage };
