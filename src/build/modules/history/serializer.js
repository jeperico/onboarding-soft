import { serviceView } from "../base/base-services.js";
import { formatCurrency } from "../../utils/format-currency.js";
const historyTableSerializer = async () => {
    const data = (await serviceView("transactions"))?.filter((el) => el.is_active);
    if (!data)
        return null;
    const payload = [];
    data.map(async (el) => {
        const product = (await serviceView("products"))?.find((e) => e.id === el.product_id)?.category_id;
        const tax = (await serviceView("categories"))?.find((e) => e.id === product)?.tax;
        const total = el.price * el.quantity;
        payload.push({
            id: el.id.toString(),
            tax: tax ? tax.toString().concat("%") : "No data!",
            total: formatCurrency(total),
        });
    });
    return payload;
};
export { historyTableSerializer };
