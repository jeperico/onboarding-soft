import { ICategory } from "../../interfaces/category.js";
import { autoIncrement } from "../../utils/auto-increment.js";

const categorySerializer = async (
  form: HTMLFormElement,
): Promise<ICategory> => {
  const id = await autoIncrement("categories");
  const name = form.elements.namedItem("name") as HTMLInputElement;
  const tax = form.elements.namedItem("tax") as HTMLInputElement;

  const payload: ICategory = {
    id: id,
    name: name.value.replace(/\s+/g, " ").trim(),
    tax: parseFloat(parseFloat(tax.value).toFixed(2)),
    is_active: true,
  };

  return payload;
};

export { categorySerializer };
