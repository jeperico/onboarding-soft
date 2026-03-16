import renderPage from "../spa/render-page.js";
import { baseServiceDelete } from "./base-services.js";
const baseEvent = async (table, render, variant, handler) => {
    if (handler)
        document.querySelector("form")?.addEventListener("submit", handler);
    await render();
    const buttons = document.querySelectorAll(variant === "delete" ? ".action-delete" : ".action-view");
    buttons.forEach((el) => {
        el.addEventListener("click", () => {
            const id = Number(el.id);
            switch (variant) {
                case "delete":
                    baseServiceDelete(table, id);
                    break;
                case "view":
                    renderPage("/details");
                    break;
            }
        });
    });
};
export { baseEvent };
