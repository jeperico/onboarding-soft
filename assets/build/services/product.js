import { baseView } from "../utils/base-view.js";
import { formatCode } from "../utils/format-code.js";
/**
 * Renders products rows inside `<tbody>`.
 *
 * @returns void
 */
const renderProducts = () => {
    // 1° - INPUT
    const table = document.querySelector("tbody");
    const data = baseView("products", { variant: "list" });
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
    for (let i = 0; i < 6; i++)
        row.appendChild(document.createElement("td"));
    table.appendChild(row);
};
export { renderProducts };
