import { autoIncrement } from "../../utils/auto-increment.js";
import { formatCurrency } from "../../utils/format-currency.js";
import { serviceView } from "../base/base-services.js";
const OrderCreateSerializer = async () => {
    const data = await serviceView("chart");
    if (!data)
        return null;
    const id = await autoIncrement("orders");
    let total_tax = 0;
    let total_price = 0;
    data.map((el) => {
        total_tax += el.tax * el.quantity;
        total_price += el.price * el.quantity;
    });
    const payload = {
        id: id,
        total_tax: total_tax,
        total_price: total_price,
        created_at: new Date(),
    };
    return payload;
};
const OrderViewSerializer = async () => {
    const data = await serviceView("orders");
    if (!data)
        return null;
    const payload = [];
    data.map((el) => {
        const id = el.id.toString();
        const total_price = formatCurrency(el.total_price);
        const total_tax = formatCurrency(el.total_tax);
        payload.push({
            id: id,
            total_price: total_price,
            total_tax: total_tax,
        });
    });
    return payload;
};
const TransactionCreateSerializer = async (order) => {
    const data = await serviceView("chart");
    if (!data)
        return null;
    const id = (await autoIncrement("transactions")) || 1;
    const payload = [];
    data.map(async (el, index) => {
        payload.push({
            id: id + index,
            quantity: el.quantity,
            price: el.price,
            product_id: el.product_id,
            order_id: order,
            is_active: true,
        });
    });
    return payload;
};
export { OrderCreateSerializer, OrderViewSerializer, TransactionCreateSerializer, };
