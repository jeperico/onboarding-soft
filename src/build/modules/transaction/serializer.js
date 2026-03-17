import { autoIncrement } from "../../utils/auto-increment.js";
const transactionSerializer = async (form) => {
    const id = await autoIncrement("transactions");
    const product = form.elements.namedItem("product");
    const quantity = form.elements.namedItem("quantity");
    const price = form.elements.namedItem("price");
    const payload = {
        id: id,
        state: "active",
        quantity: parseInt(quantity.value),
        price: parseInt(price.value),
        product_id: parseInt(product.value),
        created_at: new Date(),
        is_active: true,
    };
    return payload;
};
export { transactionSerializer };
