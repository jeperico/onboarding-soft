import { createProduct, renderProducts } from "../modules/product/services.js";
import { createTransaction, renderTransaction, } from "../modules/transaction/services.js";
import { createCategory, renderCategory, } from "../modules/category/services.js";
import { renderDetails } from "../modules/details/services.js";
import { renderHistory } from "../modules/history/services.js";
import { renderContent } from "../spa/proxy.js";
import { baseEvent } from "../utils/base-event.js";
import { renderSelect } from "./select.js";
const loadTransactions = async () => {
    await renderContent("/");
    await baseEvent("transactions", renderTransaction, "delete", createTransaction);
    await renderSelect("products", "#product", "name", "id");
};
const loadProducts = async () => {
    await renderContent("/products");
    await baseEvent("products", renderProducts, "delete", createProduct);
    await renderSelect("categories", "#category", "name", "id");
};
const loadCategory = async () => {
    await renderContent("/categories");
    await baseEvent("categories", renderCategory, "delete", createCategory);
};
const loadHistory = async () => {
    await renderContent("/history");
    await baseEvent("transactions", renderHistory, "view");
};
const loadDetails = async () => {
    await renderContent("/details");
    await baseEvent("transactions", renderDetails, "none");
};
export { loadTransactions, loadProducts, loadCategory, loadHistory, loadDetails, };
