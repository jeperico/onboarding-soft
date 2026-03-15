import { renderVoidTable } from "../spa/render-void-table.js";
import { autoIncrement } from "../utils/auto-increment.js";
import { baseServiceView } from "../utils/base-services.js";
import { formatCode } from "../utils/format-code.js";
/**
 * Handles category form submission.
 *
 * @param event - Form submit event.
 * @returns void
 */
const createCategory = async (event) => {
    // 1° - ENVIRONMENT
    event.preventDefault();
    // 2° - INPUT
    const id = await autoIncrement("categories");
    const form = event.target;
    const category = form.elements.namedItem("category")
        .value;
    const tax = parseInt(form.elements.namedItem("tax").value);
    // 3° - PROCESS
    const current = await baseServiceView("categories");
    if (!category || !tax)
        return;
    const payload = {
        id: id,
        name: category,
        tax: tax,
        is_active: true,
    };
    // 4° - OUTPUT
    localStorage.setItem("categories", JSON.stringify(current ? [...current, payload] : [payload]));
    window.location.reload();
};
/**
 * Renders category rows inside `<tbody>`.
 *
 * @returns void
 */
const renderCategory = async () => {
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
