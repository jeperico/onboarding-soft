import { renderContent } from "../../spa/proxy.js";
import { tableEvents, formsEvents } from "../base/listeners.js";
import { createCategory, formatTaxInput, renderCategory } from "./services.js";

const loadCategory = async () => {
  await renderContent("/categories");
  await tableEvents<ICategory>(
    "categories",
    "delete",
    renderCategory,
    "/categories",
  );
  await formsEvents(createCategory);
  formatTaxInput();
};

export default loadCategory;
