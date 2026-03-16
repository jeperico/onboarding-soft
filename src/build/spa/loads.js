import { renderContent } from "./proxy.js";
import { baseEvent } from "../utils/base-event.js";
import { createCategory, renderCategory } from "../services/category.js";
import { renderDetails } from "../services/details.js";
import { renderHistory } from "../services/history.js";
import { createProduct, renderProducts } from "../services/product.js";
import { renderSelect } from "../services/select.js";
import { createTransaction, renderTransaction, } from "../services/transaction.js";
const loadTransactions = async () => {
    await renderContent("/");
    await baseEvent("transactions", renderTransaction, "delete", createTransaction);
    await renderSelect("products", "#product", "name");
};
const loadProducts = async () => {
    await renderContent("/products");
    await baseEvent("products", renderProducts, "delete", createProduct);
    await renderSelect("categories", "#category", "name");
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
