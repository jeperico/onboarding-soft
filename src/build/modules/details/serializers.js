import { formatCurrency } from "../../utils/format-currency.js";
import { serviceView } from "../base/base-services.js";
const DetailsTableSerializer = async () => {
    const data = (await serviceView("transactions"))?.filter((el) => el.is_active);
    if (!data)
        return null;
    const payload = [];
    await data.map(async (el) => {
        const product = (await serviceView("products"))?.find((e) => e.id === el.product_id);
        const category = (await serviceView("categories"))?.find((e) => e.id === product?.category_id);
        const total = el.price * el.quantity;
        payload.push({
            id: el.id.toString(),
            product: product?.name || "No data!",
            category: category?.name || "No data!",
            quantity: el.quantity.toString(),
            tax: category?.tax.toString().concat("%") || "No data!",
            total: formatCurrency(total),
        });
    });
    return payload;
};
export { DetailsTableSerializer };
