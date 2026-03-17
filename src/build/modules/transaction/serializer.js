import { autoIncrement } from "../../utils/auto-increment.js";
const chartSerializer = async (form) => {
    const id = await autoIncrement("transactions");
    const product = form.elements.namedItem("product");
    const quantity = form.elements.namedItem("quantity");
    const price = form.elements.namedItem("price");
    const payload = {
        id: id,
        quantity: parseInt(quantity.value),
        price: parseInt(price.value),
        product_id: parseInt(product.value),
        is_active: true,
    };
    return payload;
};
export { chartSerializer };
