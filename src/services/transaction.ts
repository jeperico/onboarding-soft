import { ITransaction } from "../interfaces/transaction.js";
import { baseView } from "../utils/base-view.js";

/**
 * Handles transaction form submission.
 *
 * @param event - Form submit event.
 * @returns void
 */
const createTransaction = (event: SubmitEvent) => {
  // 1° - ENVIRONMENT
  event.preventDefault();

  // 2° - INPUT
  const id = crypto.randomUUID();
  const form = event.target as HTMLFormElement;
  const product = (form.elements.namedItem("product") as HTMLSelectElement)
    .value;
  const amount = parseInt(
    (form.elements.namedItem("amount") as HTMLInputElement).value,
  );
  const tax = parseInt(
    (form.elements.namedItem("tax") as HTMLInputElement).value,
  );
  const price = parseInt(
    (form.elements.namedItem("price") as HTMLInputElement).value,
  );

  // 3° - PROCESS
  if (!product || !amount || !tax || !price) return;
  const current: Array<ITransaction> = baseView("transaction", {
    variant: "list",
  });

  const payload: ITransaction = {
    id: id,
    state: "active",
    amount: amount,
    price: price,
    product_id: product,
    created_at: new Date(),
    is_active: true,
  };

  // 4° - OUTPUT
  localStorage.setItem("transaction", JSON.stringify([...current, payload]));
  window.location.reload();
};

export { createTransaction };
