import { baseDelete } from "./base-delete.js";
const baseEvent = (table, handler, render) => {
    document.querySelector("form")?.addEventListener("submit", handler);
    document.addEventListener("DOMContentLoaded", () => {
        render();
        const buttons = document.querySelectorAll(".action-delete");
        buttons.forEach((el) => {
            el.addEventListener("click", () => {
                const id = el.id;
                baseDelete(table, { id: id });
            });
        });
    });
};
export { baseEvent };
