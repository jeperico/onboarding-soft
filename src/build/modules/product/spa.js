import { renderSelect } from "../../services/select.js";
import { renderContent } from "../../spa/proxy.js";
import { baseEvent } from "../../utils/base-event.js";
import { renderProducts, createProduct } from "./services.js";
const loadProducts = async () => {
    await renderContent("/products");
    await baseEvent("products", renderProducts, "delete", createProduct);
    await renderSelect("categories", "#category", "name", "id");
};
export default loadProducts;
