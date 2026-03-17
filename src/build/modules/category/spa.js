import { renderContent } from "../../spa/proxy.js";
import { baseEvent } from "../../utils/base-event.js";
import { createCategory, renderCategory } from "./services.js";
const loadCategory = async () => {
    await renderContent("/categories");
    await baseEvent("categories", renderCategory, "delete", createCategory);
};
export default loadCategory;
