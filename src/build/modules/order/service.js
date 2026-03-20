import renderPage from "../../spa/render-page.js";
import { formatCurrency } from "../../utils/format-currency.js";
import { serviceView } from "../base/base-services.js";
import { OrderCreateSerializer, TransactionCreateSerializer, } from "./serializer.js";
const finishPurchase = async (event) => {
    // I - Environment
    event.preventDefault();
    const order = await OrderCreateSerializer();
    if (!order)
        return;
    const currentOrders = await serviceView("orders");
    localStorage.setItem("orders", JSON.stringify(currentOrders ? [...currentOrders, order] : [order]));
    // II - Inputs
    const transactions = await TransactionCreateSerializer(order.id);
    if (!transactions)
        return;
    // III - Output
    const currentTransactions = await serviceView("transactions");
    localStorage.setItem("transactions", JSON.stringify(currentTransactions
        ? [...currentTransactions, ...transactions]
        : transactions));
    localStorage.setItem("chart", "");
    renderPage("/");
};
// TODO: Padronize tax atomic values
const renderOrderDetails = async () => {
    const taxField = document.querySelector("#render-tax");
    const totalField = document.querySelector("#render-total");
    if (!taxField || !totalField)
        return;
    const data = await serviceView("chart");
    if (!data) {
        taxField.innerText = formatCurrency(0);
        totalField.innerText = formatCurrency(0);
        return;
    }
    const tax = data.reduce((sum, el) => (sum += el.tax * el.quantity), 0);
    const total = data.reduce((sum, el) => (sum += el.price * el.quantity), 0);
    taxField.innerText = formatCurrency(tax);
    totalField.innerText = formatCurrency(total);
};
export { finishPurchase, renderOrderDetails };
