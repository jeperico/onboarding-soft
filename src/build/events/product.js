import { createProduct, renderProducts } from "../services/product.js";
import { baseDelete } from "../utils/base-delete.js";
document.querySelector("form")?.addEventListener("submit", createProduct);
document.addEventListener("DOMContentLoaded", () => {
    renderProducts();
    const buttons = document.querySelectorAll(".action-delete");
    buttons.forEach((el) => {
        el.addEventListener("click", () => {
            const id = el.id;
            baseDelete("products", { id: id });
        });
    });
});
