import { autoIncrement } from "../../utils/auto-increment.js";
import { baseServiceView } from "../../utils/base-services.js";
import { formatCurrency } from "../../utils/format-currency.js";
const chartSerializer = async (form) => {
    const id = await autoIncrement("chart");
    const quantity = form.elements.namedItem("quantity");
    const price = form.elements.namedItem("price");
    const tax = form.elements.namedItem("tax");
    const product = form.elements.namedItem("product");
    const payload = {
        id: id,
        quantity: parseInt(quantity.value),
        price: parseInt(price.value),
        tax: parseFloat(tax.value),
        product_id: parseInt(product.value),
    };
    return payload;
};
const chartTableSerializer = async () => {
    const data = await baseServiceView("chart");
    if (!data)
        return null;
    const payload = [];
    data.map(async (el) => {
        const product = (await baseServiceView("products"))?.find((e) => e.id === el.product_id)?.name;
        const total = el.price * el.quantity;
        payload.push({
            id: el.id.toString(),
            quantity: el.quantity.toString(),
            price: formatCurrency(el.price),
            tax: el.tax.toString().concat("%"),
            total: formatCurrency(total),
            product: product || "No data!",
        });
    });
    return payload;
};
export { chartSerializer, chartTableSerializer };
