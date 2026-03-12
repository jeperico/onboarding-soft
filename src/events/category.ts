import { createCategory, renderCategory } from "../services/category.js";
import { baseEvent } from "./base-event.js";

baseEvent("category", createCategory, renderCategory);
