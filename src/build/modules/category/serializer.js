import { autoIncrement } from "../../utils/auto-increment.js";
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
export { categorySerializer };
