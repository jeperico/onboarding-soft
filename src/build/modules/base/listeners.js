import renderPage from "../../spa/render-page.js";
import { baseServiceDelete, baseServiceRemove, } from "../../utils/base-services.js";
const formsEvents = async (handler, form) => {
    // setTimeout(() => {
    const element = document.querySelector(form || "form");
    console.log(element);
    if (!element)
        return;
    element.addEventListener("submit", handler);
    // }, 0.2 * 1000);
};
const tableEvents = async (table, variant, render) => {
    if (render)
        await render();
    const buttons = document.querySelectorAll(variant === "delete" || variant === "remove"
        ? ".action-delete"
        : ".action-view");
    buttons.forEach((el) => {
        el.addEventListener("click", () => {
            const id = Number(el.id);
            switch (variant) {
                case "delete":
                    baseServiceDelete(table, id);
                    break;
                case "remove":
                    baseServiceRemove(table, id);
                    break;
                case "view":
                    renderPage("/details");
                    break;
            }
        });
    });
};
export { formsEvents, tableEvents };
