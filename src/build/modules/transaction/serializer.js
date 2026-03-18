import { autoIncrement } from "../../utils/auto-increment.js";
import { baseServiceView } from "../../utils/base-services.js";
const transactionSerializer = async () => {
    const data = await baseServiceView("chart");
    if (!data)
        return null;
    const payload = [];
    data.map(async (el) => {
        const id = await autoIncrement("transactions");
        payload.push({
            id: id,
            quantity: el.quantity,
            price: el.price,
            product_id: el.product_id,
            is_active: true,
        });
    });
    return payload;
};
export { transactionSerializer };
