import { baseDelete } from "../utils/base-delete.js";
import { baseView } from "../utils/base-view.js";
import { formatCode } from "../utils/format-code.js";
/**
 * Handles category form submission.
 *
 * @param event - Form submit event.
 * @returns void
 */
const createCategory = (event) => {
    // 1° - ENVIRONMENT
    event.preventDefault();
    // 2° - INPUT
    const id = crypto.randomUUID();
    const form = event.target;
    const category = form.elements.namedItem("category")
        .value;
    const tax = parseInt(form.elements.namedItem("tax").value);
    // 3° - PROCESS
    if (!category || !tax)
        return;
    const current = baseView("category", { variant: "list" });
    const payload = {
        id: id,
        name: category,
        tax: tax,
        is_active: true,
    };
    // 4° - OUTPUT
    localStorage.setItem("category", JSON.stringify([...current, payload]));
    window.location.reload();
};
/**
 * Renders category rows inside `<tbody>`.
 *
 * @returns void
 */
const tableCategory = () => {
    // 1° - INPUT
    const table = document.querySelector("tbody");
    const data = baseView("category", { variant: "list" });
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
        button.id = el.id;
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
/* ======================================================
 * EVENT LISTENERS
 * ====================================================== */
document.querySelector("form")?.addEventListener("submit", createCategory);
document.addEventListener("DOMContentLoaded", () => {
    tableCategory();
    const buttons = document.querySelectorAll(".action-delete");
    buttons.forEach((el) => {
        el.addEventListener("click", () => {
            const id = el.id;
            baseDelete("category", { id: id });
        });
    });
});
/* ======================================================
 * EXPORTS
 * ====================================================== */
export { createCategory, baseView };
