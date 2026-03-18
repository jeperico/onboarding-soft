import { renderContent } from "../../spa/proxy.js";
import { tableEvents, formsEvents } from "../base/listeners.js";
import { createCategory, renderCategory } from "./services.js";

const loadCategory = async () => {
  await renderContent("/categories");
  await tableEvents("categories", "delete", renderCategory);
  await formsEvents(createCategory);
};

export default loadCategory;
