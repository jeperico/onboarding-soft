import { autoIncrement } from "../../utils/auto-increment.js";
const productSerializer = async (form) => {
    const id = await autoIncrement("products");
    const name = form.elements.namedItem("name");
    const amount = form.elements.namedItem("amount");
    const price = form.elements.namedItem("price");
    const category = form.elements.namedItem("category");
    const payload = {
        id: id,
        name: name.value.replace(/\s+/g, " ").trim(),
        amount: parseInt(amount.value),
        price: parseInt(price.value),
        category_id: parseInt(category.value),
        is_active: true,
    };
    return payload;
};
export { productSerializer };
