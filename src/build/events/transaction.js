import { createTransaction } from "../services/transaction.js";
import { baseDelete } from "../utils/base-delete.js";
document.querySelector("form")?.addEventListener("submit", createTransaction);
document.addEventListener("DOMContentLoaded", () => {
    // renderProducts();
    const buttons = document.querySelectorAll(".action-delete");
    buttons.forEach((el) => {
        el.addEventListener("click", () => {
            const id = el.id;
            baseDelete("transactions", { id: id });
        });
    });
});
