import { autoIncrement } from "../../utils/auto-increment.js";
import { serviceView } from "../base/base-services.js";
import { formatCurrency } from "../../utils/format-currency.js";
const ChartCreateSerializer = async (form) => {
    const id = await autoIncrement("chart");
    const quantity = form.elements.namedItem("quantity");
    const price = form.elements.namedItem("price");
    const tax = form.elements.namedItem("tax");
    const product = form.elements.namedItem("product");
    const payload = await {
        id: id,
        quantity: parseInt(quantity.value),
        price: parseInt((parseFloat(price.value) * 100).toFixed(0)),
        tax: parseInt((parseFloat(tax.value) * 100).toFixed(0)),
        product_id: parseInt(product.value),
    };
    const requireds = [];
    if (!payload.quantity)
        requireds.push({ field: "#quantity", message: "Quantity is required." });
    if (!payload.price)
        requireds.push({ field: "#price", message: "Price is required." });
    if (payload.tax === null || payload.tax === undefined)
        requireds.push({ field: "#tax", message: "Tax is required." });
    const product_id = parseInt(product.value);
    if (!product.value || isNaN(product_id)) {
        requireds.push({ field: "#product", message: "Product is required." });
    }
    return { payload, requireds };
};
const ChartViewSerializer = async () => {
    const data = await serviceView("chart");
    if (!data)
        return null;
    const payload = [];
    data.map(async (el) => {
        const product = (await serviceView("products"))?.find((e) => e.id === el.product_id);
        const total = el.price * el.quantity;
        const tax = product?.tax === null || product?.tax === undefined
            ? "No data!"
            : formatCurrency(product.tax * el.quantity);
        payload.push({
            id: el.id.toString(),
            quantity: el.quantity.toString(),
            price: formatCurrency(el.price),
            tax: tax,
            total: formatCurrency(total),
            product: product?.name || "No data!",
        });
    });
    return payload;
};
export { ChartCreateSerializer, ChartViewSerializer };
