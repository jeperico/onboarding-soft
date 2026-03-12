import { renderProducts } from "../services/product.js";
import { baseDelete } from "../utils/base-delete.js";

// document.querySelector("form")?.addEventListener("submit", createCategory);

document.addEventListener("DOMContentLoaded", () => {
  renderProducts();

  const buttons =
    document.querySelectorAll<HTMLButtonElement>(".action-delete");
  buttons.forEach((el) => {
    el.addEventListener("click", () => {
      const id = el.id;
      baseDelete("category", { id: id });
    });
  });
});
