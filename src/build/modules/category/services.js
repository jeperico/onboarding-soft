import renderPage from "../../spa/render-page.js";
import { renderVoidTable } from "../../spa/render-void-table.js";
import { serviceView } from "../base/base-services.js";
import { formatCode } from "../../utils/format-code.js";
import { renderErrorMessage } from "../../utils/render-error-message.js";
import { renderActionButton, renderElement } from "../base/services.js";
import { categoryHandler } from "./handlers.js";
import { CategoryCreateSerializer, CategoryViewSerializer, } from "./serializer.js";
const createCategory = async (event) => {
    // I - Environment
    event.preventDefault();
    // II - Inputs
    const payload = await CategoryCreateSerializer(event.target);
    if (!payload.name || !payload.tax)
        return;
    // III - Errors handling
    const errors = await categoryHandler(payload.name, payload.tax);
    if (errors.length > 0) {
        renderErrorMessage(errors);
        return;
    }
    // IV - Output
    const currentData = await serviceView("categories");
    localStorage.setItem("categories", JSON.stringify(currentData ? [...currentData, payload] : [payload]));
    renderPage("/categories");
};
const renderCategory = async () => {
    // I - Environment
    const COLUMNS_COUNT = 4;
    // II - Inputs
    const data = await CategoryViewSerializer();
    const table = document.querySelector("#tbody-category");
    if (!data || !table) {
        renderVoidTable("#tbody-category", COLUMNS_COUNT);
        return;
    }
    // III - Rendering
    data.map((el) => {
        const row = document.createElement("tr");
        renderElement(row, formatCode(parseInt(el.id)));
        renderElement(row, el.name);
        renderElement(row, el.tax);
        renderActionButton(row, el.id, "delete");
        table.appendChild(row);
    });
    // IV - Output
    const row = document.createElement("tr");
    for (let i = 0; i < COLUMNS_COUNT; i++)
        row.appendChild(document.createElement("td"));
    table.appendChild(row);
};
export { createCategory, renderCategory };
