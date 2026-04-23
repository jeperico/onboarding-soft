import { ICategory } from "../../interfaces/category.js";
import { renderSelect, setFocus } from "../base/services.js";
import { renderContent } from "../../spa/proxy.js";
import { formsEvents, inputMutations, tableEvents } from "../base/listeners.js";
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
  inputMutations();
  setFocus("#name");
};

export default loadProducts;
