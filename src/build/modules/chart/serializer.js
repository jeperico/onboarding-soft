import { autoIncrement } from "../../utils/auto-increment.js";
import { serviceView } from "../base/base-services.js";
import { formatCurrency } from "../../utils/format-currency.js";
const ChartCreateSerializer = async (form) => {
    const id = await autoIncrement("chart");
    const quantity = form.elements.namedItem("quantity");
    const price = form.elements.namedItem("price");
    const tax = form.elements.namedItem("tax");
    const product = form.elements.namedItem("product");
    console.log("price: ", price.value, parseFloat(price.value) * 100);
    console.log("tax: ", tax.value, parseFloat(tax.value) * 100);
    const payload = {
        id: id,
        quantity: parseInt(quantity.value),
        price: parseInt((parseFloat(price.value) * 100).toFixed(0)),
        tax: parseInt((parseFloat(tax.value) * 100).toFixed(0)),
        product_id: parseInt(product.value),
    };
    return payload;
};
const ChartViewSerializer = async () => {
    const data = await serviceView("chart");
    if (!data)
        return null;
    const payload = [];
    data.map(async (el) => {
        const product = (await serviceView("products"))?.find((e) => e.id === el.product_id)?.name;
        const total = el.price * el.quantity;
        const tax = total * (el.tax / 100);
        payload.push({
            id: el.id.toString(),
            quantity: el.quantity.toString(),
            price: formatCurrency(el.price),
            tax: formatCurrency(tax),
            total: formatCurrency(total),
            product: product || "No data!",
        });
    });
    return payload;
};
export { ChartCreateSerializer, ChartViewSerializer };
