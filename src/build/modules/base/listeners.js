import renderPage from "../../spa/render-page.js";
import { validateCategoryDelete } from "../category/validators.js";
import { validateProductDelete } from "../product/validators.js";
import { serviceDelete } from "./base-services.js";
const formsEvents = async (handler, form) => {
    const element = document.querySelector(form || "form");
    if (!element)
        return;
    element.addEventListener("submit", handler);
    const cancelButton = element.querySelector("#no-submit");
    if (!cancelButton)
        return;
    cancelButton.addEventListener("click", (e) => {
        const confirmCancel = window.confirm("Are you sure you want to cancel?");
        if (!confirmCancel)
            return;
        e.preventDefault();
        const form = document.querySelector("form");
        form?.reset();
        localStorage.removeItem("chart");
        renderPage("/");
    });
};
const tableEvents = async (table, variant, render, page) => {
    if (render)
        await render();
    const buttons = document.querySelectorAll(`.action-${variant}`);
    buttons.forEach((el) => {
        el.addEventListener("click", async () => {
            const id = Number(el.id);
            let validator;
            if (table === "categories")
                validator = validateCategoryDelete;
            if (table === "products")
                validator = validateProductDelete;
            switch (variant) {
                case "delete":
                case "remove":
                    await serviceDelete(table, id, validator);
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
