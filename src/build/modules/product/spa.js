import { renderSelect } from "../base/services.js";
import { renderContent } from "../../spa/proxy.js";
import { formsEvents, inputMutations, tableEvents } from "../base/listeners.js";
import { renderProducts, createProduct } from "./services.js";
const loadProducts = async () => {
    await renderContent("/products");
    await tableEvents("products", "delete", renderProducts, "/products");
    await formsEvents(createProduct);
    await renderSelect("categories", "#category", "name", "id");
    inputMutations();
};
export default loadProducts;
