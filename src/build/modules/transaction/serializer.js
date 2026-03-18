import { autoIncrement } from "../../utils/auto-increment";
const transactionSerializer = async (form) => {
    const id = await autoIncrement("transactions");
    const quantity = form.elements.namedItem("quantity");
    const payload = {
        id: id,
        quantity: 2,
        price: 3,
        product_id: 4,
        is_active: true,
    };
    return payload;
};
