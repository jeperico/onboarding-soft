import { baseServiceView } from "../utils/base-services.js";
const renderSelect = (table, select, field) => {
    // 1° - INPUT
    const parent = document.querySelector(select);
    const data = baseServiceView(table);
    // 2° - PROCESS
    if (!parent || !data)
        return;
    data.forEach((el) => {
        const option = document.createElement("option");
        option.innerText = el[field];
        option.value = el[field].toLowerCase();
        parent.appendChild(option);
    });
};
export { renderSelect };
