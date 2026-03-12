import { ICategory } from "../interfaces/category";

const createCategory = (event: SubmitEvent) => {
  event.preventDefault();
  console.log("event:", event);

  const form = event.target as HTMLFormElement;
  const category = (form.elements.namedItem("category") as HTMLInputElement)
    .value;
  const tax = (form.elements.namedItem("tax") as HTMLInputElement).value;

  // // TODO: Validate inputs
  if (!category || !tax) return;

  // // TODO: Handle values
  const payload: ICategory = {
    id: 1,
    name: category,
    tax: parseInt(tax) || 0,
    is_active: true,
  };

  localStorage.setItem("category", JSON.stringify(payload));
};

document.querySelector("form")?.addEventListener("submit", createCategory);

export default createCategory;
