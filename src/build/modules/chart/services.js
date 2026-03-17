import renderPage from "../../spa/render-page.js";
import { renderVoidTable } from "../../spa/render-void-table.js";
import { baseServiceView } from "../../utils/base-services.js";
import { formatCode } from "../../utils/format-code.js";
import { renderErrorMessage } from "../../utils/render-error-message.js";
import { chartSerializer } from "./serializer.js";
import { chartHandler } from "./handlers.js";
import { renderDeleteButton, renderElement } from "../base/services.js";
const createChart = async (event) => {
    // I - Environment
    event.preventDefault();
    // II - Inputs
    const payload = await chartSerializer(event.target);
    if (!payload.product_id ||
        !payload.quantity ||
        !payload.price ||
        !payload.tax)
        return;
    // III - Errors handling
    const errors = await chartHandler(payload.product_id, payload.quantity, payload.price, payload.tax);
    if (errors.length > 0) {
        renderErrorMessage(errors);
        return;
    }
    // IV - Output
    const currentData = await baseServiceView("chart");
    localStorage.setItem("chart", JSON.stringify(currentData ? [...currentData, payload] : [payload]));
    renderPage("/");
};
const renderChart = async () => {
    // I - Environment
    const COLUMNS_COUNT = 6;
    // II - Inputs
    const data = await baseServiceView("chart");
    const table = document.querySelector("#tbody-chart");
    if (!data || !table) {
        renderVoidTable("#tbody-chart", COLUMNS_COUNT);
        return;
    }
    // III - Rendering
    data.forEach((el, index) => {
        const row = document.createElement("tr");
        renderElement(row, formatCode(index));
        renderElement(row, el.product_id.toString());
        renderElement(row, el.product_id.toString());
        renderElement(row, el.quantity.toString());
        renderElement(row, el.price.toString());
        renderDeleteButton(row, el.id.toString());
        table.appendChild(row);
    });
    // IV - Output
    const row = document.createElement("tr");
    for (let i = 0; i < COLUMNS_COUNT; i++)
        row.appendChild(document.createElement("td"));
    table.appendChild(row);
};
export { createChart, renderChart };
