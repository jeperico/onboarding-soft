import renderPage from "../spa/render-page.js";
import { baseDelete } from "./base-delete.js";
const baseEvent = (table, render, variant, handler) => {
    if (handler)
        document.querySelector("form")?.addEventListener("submit", handler);
    render();
    const buttons = document.querySelectorAll(variant === "delete" ? ".action-delete" : ".action-view");
    buttons.forEach((el) => {
        el.addEventListener("click", () => {
            const id = Number(el.id);
            switch (variant) {
                case "delete":
                    baseDelete(table, { id: id });
                    break;
                case "view":
                    renderPage("/details");
                    break;
            }
        });
    });
};
export { baseEvent };
