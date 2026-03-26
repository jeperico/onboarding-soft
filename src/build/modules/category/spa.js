import { renderContent } from "../../spa/proxy.js";
import { tableEvents, formsEvents, inputMutations } from "../base/listeners.js";
import { setFocus } from "../base/services.js";
import { createCategory, formatTaxInput, renderCategory } from "./services.js";
const loadCategory = async () => {
    await renderContent("/categories");
    await tableEvents("categories", "delete", renderCategory, "/categories");
    await formsEvents(createCategory);
    inputMutations();
    formatTaxInput();
    setFocus("#name");
};
export default loadCategory;
