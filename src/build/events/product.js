import { createProduct, renderProducts } from "../services/product.js";
import { baseEvent } from "./base-event.js";
baseEvent("products", createProduct, renderProducts);
