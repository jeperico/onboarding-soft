import { createCategory, renderCategory } from "../services/category.js";
import { baseEvent } from "../utils/base-event.js";

baseEvent("categories", renderCategory, "delete", createCategory);
