import { baseEvent } from "../../utils/base-event.js";
import { createCategory, renderCategory } from "../category.js";

const loadCategory = () => {
  baseEvent("categories", renderCategory, "delete", createCategory);
};

export { loadCategory };
