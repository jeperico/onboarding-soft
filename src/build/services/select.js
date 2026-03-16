import { baseServiceView } from "../utils/base-services.js";
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
export { renderSelect };
