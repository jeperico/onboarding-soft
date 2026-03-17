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
export { renderElement, renderDeleteButton };
