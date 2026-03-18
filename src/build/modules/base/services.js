import { baseServiceView } from "../../utils/base-services.js";
const renderElement = (row, text) => {
    try {
        const td = document.createElement("td");
        td.textContent = text;
        row.appendChild(td);
    }
    catch {
        renderVoidElement(row);
    }
};
const renderDeleteButton = (row, id) => {
    try {
        const button = document.createElement("button");
        button.textContent = "DELETE";
        button.className = "action-delete button-secondary";
        button.id = id;
        const td = document.createElement("td");
        td.appendChild(button);
        row.appendChild(td);
    }
    catch {
        renderVoidElement(row);
    }
};
const renderVoidElement = (row) => {
    const td = document.createElement("td");
    td.textContent = "No data!";
    row.appendChild(td);
};
const renderSelect = async (table, select, fieldText, fieldValue) => {
    const parent = document.querySelector(select);
    const data = await baseServiceView(table);
    if (!parent || !data)
        return;
    data.forEach((el) => {
        if (!el.is_active)
            return;
        const option = document.createElement("option");
        const text = el[fieldText];
        const value = el[fieldValue];
        option.innerText = String(text);
        option.value = String(value);
        parent.appendChild(option);
    });
};
export { renderElement, renderDeleteButton, renderSelect };
