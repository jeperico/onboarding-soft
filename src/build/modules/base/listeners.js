import renderPage from "../../spa/render-page.js";
import { serviceDelete, serviceRemove } from "./base-services.js";
const formsEvents = async (handler, form) => {
    const element = document.querySelector(form || "form");
    if (!element)
        return;
    element.addEventListener("submit", handler);
};
const tableEvents = async (table, variant, render, page) => {
    if (render)
        await render();
    const buttons = document.querySelectorAll(`.action-${variant}`);
    buttons.forEach((el) => {
        el.addEventListener("click", () => {
            const id = Number(el.id);
            switch (variant) {
                case "delete":
                    serviceDelete(table, id);
                    if (page)
                        renderPage(page);
                    break;
                case "remove":
                    serviceRemove(table, id);
                    if (page)
                        renderPage(page);
                    break;
                case "view":
                    renderPage("/details", id);
                    break;
            }
        });
    });
};
export { formsEvents, tableEvents };
