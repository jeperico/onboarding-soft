import { createProduct, renderProducts } from "../services/product.js";
import { baseEvent } from "../utils/base-event.js";
baseEvent("products", renderProducts, "delete", createProduct);
