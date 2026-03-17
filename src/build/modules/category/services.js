import renderPage from "../../spa/render-page.js";
import { renderVoidTable } from "../../spa/render-void-table.js";
import { baseServiceView } from "../../utils/base-services.js";
import { formatCode } from "../../utils/format-code.js";
import { renderErrorMessage } from "../../utils/render-error-message.js";
import { categoryHandler } from "./handlers.js";
import { categorySerializer } from "./serializer.js";
const createCategory = async (event) => {
    // I - Environment
    event.preventDefault();
    // II - Inputs
    const payload = await categorySerializer(event.target);
    if (!payload.name || !payload.tax)
        return;
    // III - Errors handling
    const errors = await categoryHandler(payload.name, payload.tax);
    if (errors.length > 0) {
        renderErrorMessage(errors);
        return;
    }
    // IV - Output
    const currentData = await baseServiceView("categories");
    localStorage.setItem("categories", JSON.stringify(currentData ? [...currentData, payload] : [payload]));
    renderPage("/categories");
};
/**
 * Renders category rows inside `<tbody>`.
 *
 * @returns void
 */
const renderCategory = async () => {
    // TODO: VALIDATE IF NOT SOME KEY IS UNDEFINED
    // 1° - INPUT
    const data = await baseServiceView("categories");
    if (!data) {
        renderVoidTable("#tbody-category", 4);
        return;
    }
    const table = document.querySelector("#tbody-category");
    if (!table)
        return;
    // 2° - PROCESS /  OUTPUT
    if (!data || !table)
        return;
    const payload = data.filter((el) => {
        return el.is_active;
    });
    payload.forEach((el, index) => {
        const row = document.createElement("tr");
        const td = document.createElement("td");
        const code = td.cloneNode();
        code.textContent = formatCode(index);
        row.appendChild(code);
        const category = td.cloneNode();
        category.textContent = el.name;
        row.appendChild(category);
        const tax = td.cloneNode();
        tax.textContent = el.tax.toString();
        row.appendChild(tax);
        const button = document.createElement("button");
        button.textContent = "DELETE";
        button.className = "action-delete button-secondary";
        button.id = el.id.toString();
        const action = td.cloneNode();
        action.appendChild(button);
        row.appendChild(action);
        table.appendChild(row);
    });
    const row = document.createElement("tr");
    for (let i = 0; i < 4; i++)
        row.appendChild(document.createElement("td"));
    table.appendChild(row);
};
export { createCategory, renderCategory };
