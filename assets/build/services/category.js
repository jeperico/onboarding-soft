import { baseDelete } from "../utils/base-delete";
import { baseView } from "../utils/base-view.js";
const createCategory = (event) => {
    // 1° - ENVIRONMENT
    event.preventDefault();
    // 2° - INPUT
    const id = crypto.randomUUID();
    const form = event.target;
    const category = form.elements.namedItem("category")
        .value;
    const tax = parseInt(form.elements.namedItem("tax").value);
    // 3° - PROCESS
    if (!category || !tax)
        return;
    const current = baseView("category", { variant: "list" });
    console.log(current);
    const payload = {
        id: id,
        name: category,
        tax: tax,
        is_active: true,
    };
    console.log();
    // 4° - OUTPUT
    localStorage.setItem("category", JSON.stringify([...current, payload]));
};
document.querySelector("form")?.addEventListener("submit", createCategory);
const buttons = document.querySelectorAll(".action-delete");
buttons.forEach((el) => {
    el.addEventListener("click", () => {
        baseDelete("category", { id: "123" });
    });
});
export { createCategory, baseView };
