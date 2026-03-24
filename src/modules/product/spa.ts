import { ICategory } from "../../interfaces/category.js";
import { renderSelect } from "../base/services.js";
import { renderContent } from "../../spa/proxy.js";
import { formsEvents, tableEvents } from "../base/listeners.js";
import { renderProducts, createProduct } from "./services.js";

const loadProducts = async () => {
  await renderContent("/products");
  await tableEvents<IProduct>(
    "products",
    "delete",
    renderProducts,
    "/products",
  );
  await formsEvents(createProduct);
  await renderSelect<ICategory>("categories", "#category", "name", "id");
};

export default loadProducts;
