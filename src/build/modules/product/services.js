import renderPage from "../../spa/render-page.js";
import { renderVoidTable } from "../../spa/render-void-table.js";
import { serviceView } from "../base/base-services.js";
import { formatCode } from "../../utils/format-code.js";
import { renderErrorMessage } from "../../utils/render-error-message.js";
import { ProductCreateSerializer, ProductViewSerializer, } from "./serializer.js";
import { productHandler } from "./handlers.js";
import { renderActionButton, renderElement, setFocus, } from "../base/services.js";
const createProduct = async (event) => {
    event.preventDefault();
    const { payload, requireds } = await ProductCreateSerializer(event.target);
    if (requireds.length > 0) {
        renderErrorMessage(requireds);
        return;
    }
    const errors = await productHandler(payload.name, payload.stock, payload.price, payload.tax, payload.category_id);
    if (errors.length > 0) {
        renderErrorMessage(errors);
        setFocus(errors[0].field || "#name");
        return;
    }
    const currentData = await serviceView("products");
    localStorage.setItem("products", JSON.stringify(currentData ? [...currentData, payload] : [payload]));
    renderPage("/products");
};
const renderProducts = async () => {
    const COLUMNS_COUNT = 6;
    const data = await ProductViewSerializer();
    const table = document.querySelector("#tbody-products");
    if (!data || !table) {
        renderVoidTable("#tbody-products", COLUMNS_COUNT);
        return;
    }
    table.innerHTML = "";
    data.map((el) => {
        const row = document.createElement("tr");
        renderElement(row, formatCode(parseInt(el.id)));
        renderElement(row, el.name);
        renderElement(row, el.stock);
        renderElement(row, el.price);
        renderElement(row, el.category);
        renderActionButton(row, el.id, "delete");
        table.appendChild(row);
    });
    const row = document.createElement("tr");
    for (let i = 0; i < COLUMNS_COUNT; i++)
        row.appendChild(document.createElement("td"));
    table.appendChild(row);
};
export { createProduct, renderProducts };
