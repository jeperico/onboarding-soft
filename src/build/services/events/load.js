import { baseEvent } from "../../utils/base-event.js";
import { createCategory, renderCategory } from "../category.js";
import { renderDetails } from "../details.js";
import { renderHistory } from "../history.js";
import { createProduct, renderProducts } from "../product.js";
import { createTransaction, renderTransaction } from "../transaction.js";
const loadTransactions = () => {
    baseEvent("transactions", renderTransaction, "delete", createTransaction);
};
const loadProducts = () => {
    baseEvent("products", renderProducts, "delete", createProduct);
};
const loadCategory = () => {
    baseEvent("categories", renderCategory, "delete", createCategory);
};
const loadHistory = () => {
    baseEvent("transactions", renderHistory, "view");
};
const loadDetails = () => {
    baseEvent("transactions", renderDetails, "none");
};
export { loadTransactions, loadProducts, loadCategory, loadHistory, loadDetails, };
