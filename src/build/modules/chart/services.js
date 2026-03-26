import renderPage from "../../spa/render-page.js";
import { renderVoidTable } from "../../spa/render-void-table.js";
import { serviceView } from "../base/base-services.js";
import { renderErrorMessage } from "../../utils/render-error-message.js";
import { ChartCreateSerializer, ChartViewSerializer } from "./serializer.js";
import { chartHandler } from "./handlers.js";
import { renderActionButton, renderElement } from "../base/services.js";
const createChart = async (event) => {
    event.preventDefault();
    const { payload, requireds } = await ChartCreateSerializer(event.target);
    if (requireds.length > 0) {
        renderErrorMessage(requireds);
        return;
    }
    const { errors, handled } = await chartHandler(payload.product_id, payload.quantity, payload.price, payload.tax);
    if (errors.length > 0) {
        renderErrorMessage(errors);
        setFocus(errors[0].field || "#quantity");
        return;
    }
    if (handled) {
        renderPage("/");
        return;
    }
    const currentData = await serviceView("chart");
    localStorage.setItem("chart", JSON.stringify(currentData ? [...currentData, payload] : [payload]));
    renderPage("/");
};
const renderChart = async () => {
    const COLUMNS_COUNT = 6;
    const data = await ChartViewSerializer();
    const table = document.querySelector("#tbody-chart");
    if (!data || !table) {
        renderVoidTable("#tbody-chart", COLUMNS_COUNT);
        return;
    }
    data.map((el) => {
        const row = document.createElement("tr");
        renderElement(row, el.product);
        renderElement(row, el.price);
        renderElement(row, el.quantity);
        renderElement(row, el.tax);
        renderElement(row, el.total);
        renderActionButton(row, el.id, "remove");
        table.appendChild(row);
    });
    const row = document.createElement("tr");
    for (let i = 0; i < COLUMNS_COUNT; i++)
        row.appendChild(document.createElement("td"));
    table.appendChild(row);
};
const overwriteProduct = async (duplicated, quantity, chart) => {
    try {
        const maxStock = (await serviceView("products"))?.find((el) => el.id === duplicated.product_id);
        const currentQuantity = chart?.find((el) => el.id === duplicated.id)?.quantity;
        if (!currentQuantity)
            return null;
        if (currentQuantity + quantity > (maxStock?.stock || 0))
            return "Doesn't exist that quantity in stock";
        const payload = chart.map((el) => {
            if (el.id === duplicated.id) {
                el.quantity += quantity;
            }
            return el;
        });
        localStorage.setItem("chart", JSON.stringify(payload));
        renderPage("/");
        return null;
    }
    catch {
        return "Internal Error";
    }
};
const fieldsListener = () => {
    const listener = document.querySelector("#product");
    if (!listener)
        return;
    listener.addEventListener("change", async (e) => {
        const id = e.target.value;
        const product = (await serviceView("products"))?.find((el) => el.id === parseInt(id));
        const tax = product?.tax;
        const taxField = document.querySelector("#tax");
        if (!taxField || tax === null || tax === undefined)
            return;
        taxField.value = (tax / 100).toFixed(2);
        const priceField = document.querySelector("#price");
        if (!priceField || !product?.price)
            return;
        priceField.value = (product.price / 100).toFixed(2);
        const chart = (await serviceView("chart"))?.find((el) => el.product_id === product?.id);
        const quantityField = document.querySelector("#quantity");
        if (!quantityField || !chart)
            return;
        const stock = product?.stock - chart?.quantity;
        quantityField.max = stock.toString();
    });
};
export { createChart, renderChart, overwriteProduct, fieldsListener };
