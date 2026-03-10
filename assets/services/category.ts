import { ICategory } from "../interfaces/category";

const createCategory = (event: SubmitEvent) => {
  event.preventDefault();
  alert("TESTE");

  const category = document.querySelector("#category") as HTMLInputElement;
  const tax = document.querySelector("#tax") as HTMLInputElement;

  // TODO: Validate inputs
  if (!category || !tax) return;

  // TODO: Handle values

  const payload: ICategory = {
    id: 1,
    name: category.value,
    tax: parseInt(tax.value) || 0,
    is_active: true,
  };

  localStorage.setItem("category", JSON.stringify(payload));
};
