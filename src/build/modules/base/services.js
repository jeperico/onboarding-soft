import { serviceView } from "./base-services.js";
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
const renderActionButton = (row, id, variant) => {
    try {
        const button = document.createElement("button");
        button.textContent = variant.toUpperCase();
        button.className = `action-${variant} button-secondary`;
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
    const data = await serviceView(table);
    if (!parent || !data)
        return;
    parent.innerHTML =
        "<option value='' disabled selected hidden>Product</option>";
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
const setFocus = (selector) => {
    const element = document.querySelector(selector);
    if (element)
        element.focus();
};
export { renderElement, renderActionButton, renderSelect, setFocus };
