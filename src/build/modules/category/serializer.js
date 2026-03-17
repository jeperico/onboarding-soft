import { autoIncrement } from "../../utils/auto-increment.js";
import { baseServiceView } from "../../utils/base-services.js";
const categorySerializer = async (form) => {
    const id = await autoIncrement("categories");
    const name = form.elements.namedItem("name");
    const tax = form.elements.namedItem("tax");
    const payload = {
        id: id,
        name: name.value.replace(/\s+/g, " ").trim(),
        tax: parseFloat(parseFloat(tax.value).toFixed(2)),
        is_active: true,
    };
    return payload;
};
const categoryTableSerializer = async () => {
    const data = await baseServiceView("categories");
    if (!data)
        return null;
    const payload = [];
    data.map(async (el) => {
        payload.push({
            id: el.id.toString(),
            name: el.name,
            tax: el.tax.toString().concat("%"),
        });
    });
    return payload;
};
export { categorySerializer, categoryTableSerializer };
