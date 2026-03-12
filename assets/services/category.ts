/* ======================================================
 * IMPORTS
 * ====================================================== */
import { ICategory } from "../interfaces/category";
import { baseDelete } from "../utils/base-delete";
import { baseView } from "../utils/base-view.js";

/**
 * Handles category form submission.
 *
 * @param event - Form submit event.
 * @returns void
 */
const createCategory = (event: SubmitEvent) => {
  // 1° - ENVIRONMENT
  event.preventDefault();

  // 2° - INPUT
  const id = crypto.randomUUID();
  const form = event.target as HTMLFormElement;
  const category = (form.elements.namedItem("category") as HTMLInputElement)
    .value;
  const tax = parseInt(
    (form.elements.namedItem("tax") as HTMLInputElement).value,
  );

  // 3° - PROCESS
  if (!category || !tax) return;
  const current: Array<ICategory> = baseView("category", { variant: "list" });
  console.log(current);

  const payload: ICategory = {
    id: id,
    name: category,
    tax: tax,
    is_active: true,
  };

  console.log();

  // 4° - OUTPUT
  localStorage.setItem("category", JSON.stringify([...current, payload]));
};

/* ======================================================
 * EVENT LISTENERS
 * ====================================================== */
document.querySelector("form")?.addEventListener("submit", createCategory);

const buttons = document.querySelectorAll<HTMLButtonElement>(".action-delete");
buttons.forEach((el) => {
  el.addEventListener("click", () => {
    baseDelete("category", { id: "123" });
  });
});

/* ======================================================
 * EXPORTS
 * ====================================================== */
export { createCategory, baseView };
