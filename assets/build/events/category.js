import { createCategory, renderCategory } from "../services/category.js";
import { baseDelete } from "../utils/base-delete.js";
document.querySelector("form")?.addEventListener("submit", createCategory);
document.addEventListener("DOMContentLoaded", () => {
    renderCategory();
    const buttons = document.querySelectorAll(".action-delete");
    buttons.forEach((el) => {
        el.addEventListener("click", () => {
            const id = el.id;
            baseDelete("category", { id: id });
        });
    });
});
