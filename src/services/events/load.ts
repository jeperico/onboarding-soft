import { baseEvent } from "../../utils/base-event.js";
import { createCategory, renderCategory } from "../category.js";
import { renderDetails } from "../details.js";
import { renderHistory } from "../history.js";
import { createProduct, renderProducts } from "../product.js";
import { renderSelect } from "../select.js";
import { createTransaction, renderTransaction } from "../transaction.js";

const loadTransactions = () => {
  baseEvent("transactions", renderTransaction, "delete", createTransaction);
  renderSelect("products", "#product", "name");
};

const loadProducts = () => {
  baseEvent("products", renderProducts, "delete", createProduct);
  renderSelect("categories", "#category", "name");
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

export {
  loadTransactions,
  loadProducts,
  loadCategory,
  loadHistory,
  loadDetails,
};
