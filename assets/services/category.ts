import { ICategory } from "../interfaces/category";

const createCategory = (event: SubmitEvent) => {
  // 1° - ENVIRONMENT
  event.preventDefault();
  console.log("event:", event);

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

  const payload: ICategory = {
    id: id,
    name: category,
    tax: tax,
    is_active: true,
  };

  // 4° - OUTPUT
  localStorage.setItem("category", JSON.stringify(payload));
};

document.querySelector("form")?.addEventListener("submit", createCategory);

export default createCategory;
