import { ITransaction } from "../../interfaces/transaction.js";
import { autoIncrement } from "../../utils/auto-increment.js";

const transactionSerializer = async (
  form: HTMLFormElement,
): Promise<ITransaction> => {
  const id = await autoIncrement("transactions");
  const product = form.elements.namedItem("product") as HTMLSelectElement;
  const quantity = form.elements.namedItem("quantity") as HTMLInputElement;
  const price = form.elements.namedItem("price") as HTMLInputElement;

  const payload: ITransaction = {
    id: id,
    state: "active",
    quantity: parseInt(quantity.value),
    price: parseInt(price.value),
    product_id: parseInt(product.value),
    created_at: new Date(),
    is_active: true,
  };

  return payload;
};

export { transactionSerializer };
