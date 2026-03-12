import { ICategory } from "../interfaces/category";

const createCategory = (event: SubmitEvent) => {
  // ENVIRONMENT
  event.preventDefault();
  console.log("event:", event);

  // INPUT
  const id = crypto.randomUUID();
  const form = event.target as HTMLFormElement;
  const category = (form.elements.namedItem("category") as HTMLInputElement)
    .value;
  const tax = parseInt(
    (form.elements.namedItem("tax") as HTMLInputElement).value,
  );

  // PROCESS
  if (!category || !tax) return;

  const payload: ICategory = {
    id: id,
    name: category,
    tax: tax,
    is_active: true,
  };

  // OUTPUT
  localStorage.setItem("category", JSON.stringify(payload));
};

document.querySelector("form")?.addEventListener("submit", createCategory);

export default createCategory;
