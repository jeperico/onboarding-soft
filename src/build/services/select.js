import { baseServiceView } from "../utils/base-services.js";
const renderSelect = async (table, select, field) => {
    const parent = document.querySelector(select);
    const data = await baseServiceView(table);
    if (!parent || !data)
        return;
    data.forEach((el) => {
        const option = document.createElement("option");
        const value = el[field];
        option.innerText = String(value);
        option.value = String(value).toLowerCase();
        parent.appendChild(option);
    });
};
export { renderSelect };
