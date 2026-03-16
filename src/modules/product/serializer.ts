import { IProduct } from "../../interfaces/product.js";
import { autoIncrement } from "../../utils/auto-increment.js";

const productSerializer = async (form: HTMLFormElement): Promise<IProduct> => {
  const id = await autoIncrement("products");
  const name = form.elements.namedItem("name") as HTMLInputElement;
  const amount = form.elements.namedItem("amount") as HTMLInputElement;
  const price = form.elements.namedItem("price") as HTMLInputElement;
  const category = form.elements.namedItem("category") as HTMLSelectElement;

  const payload: IProduct = {
    id: id,
    name: name.value.replace(/\s+/g, " ").trim(),
    amount: parseInt(amount.value),
    price: parseInt(price.value),
    category_id: parseInt(category.value),
    is_active: true,
  };

  return payload;
};

export { productSerializer };
