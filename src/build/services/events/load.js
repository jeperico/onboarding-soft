import { renderContent } from "../../spa/proxy.js";
import { baseEvent } from "../../utils/base-event.js";
import { createCategory, renderCategory } from "../category.js";
import { renderDetails } from "../details.js";
import { renderHistory } from "../history.js";
import { createProduct, renderProducts } from "../product.js";
import { renderSelect } from "../select.js";
import { createTransaction, renderTransaction } from "../transaction.js";
const loadTransactions = async () => {
    await renderContent("/");
    baseEvent("transactions", renderTransaction, "delete", createTransaction);
    renderSelect("products", "#product", "name");
};
const loadProducts = async () => {
    await renderContent("/products");
    baseEvent("products", renderProducts, "delete", createProduct);
    renderSelect("categories", "#category", "name");
};
const loadCategory = async () => {
    await renderContent("/categories");
    baseEvent("categories", renderCategory, "delete", createCategory);
};
const loadHistory = async () => {
    await renderContent("/history");
    baseEvent("transactions", renderHistory, "view");
};
const loadDetails = async () => {
    await renderContent("/details");
    baseEvent("transactions", renderDetails, "none");
};
export { loadTransactions, loadProducts, loadCategory, loadHistory, loadDetails, };
