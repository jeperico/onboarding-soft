import { ITransaction } from "../interfaces/transaction.js";
import { renderVoidTable } from "../spa/render-void-table.js";
import { autoIncrement } from "../utils/auto-increment.js";
import { baseServiceView } from "../utils/base-services.js";
import { formatCode } from "../utils/format-code.js";

/**
 * Handles transaction form submission.
 *
 * @param event - Form submit event.
 * @returns void
 */
const createTransaction = async (event: SubmitEvent) => {
  // 1° - ENVIRONMENT
  event.preventDefault();

  // 2° - INPUT
  const id = await autoIncrement("transactions");
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
  const current = await baseServiceView<ITransaction>("transactions");
  if (!product || !amount || !tax || !price) return;

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
  localStorage.setItem(
    "transactions",
    JSON.stringify(current ? [...current, payload] : [payload]),
  );
  window.location.reload();
};

/**
 * Renders category rows inside `<tbody>`.
 *
 * @returns void
 */
const renderTransaction = async () => {
  // 1° - INPUT
  const data = await baseServiceView<ITransaction>("transactions");
  if (!data) {
    renderVoidTable("#tbody-transactions", 6);
    return;
  }

  const table = document.querySelector("#tbody-transactions");
  if (!table) return;

  const payload = data.filter((el: { is_active: boolean }) => {
    return el.is_active;
  });
  payload.forEach((el, index) => {
    const row = document.createElement("tr");
    const td = document.createElement("td");

    const code = td.cloneNode();
    code.textContent = formatCode(index);
    row.appendChild(code);

    const product = td.cloneNode();
    product.textContent = el.product_id;
    row.appendChild(product);

    const tax = td.cloneNode();
    tax.textContent = el.product_id.toString();
    row.appendChild(tax);

    const amount = td.cloneNode();
    amount.textContent = el.amount.toString();
    row.appendChild(amount);

    const total = td.cloneNode();
    total.textContent = el.price.toString();
    row.appendChild(total);

    const button = document.createElement("button");
    button.textContent = "DELETE";
    button.className = "action-delete button-secondary";
    button.id = el.id.toString();
    const action = td.cloneNode();
    action.appendChild(button);
    row.appendChild(action);

    table.appendChild(row);
  });

  const row = document.createElement("tr");
  for (let i = 0; i < 6; i++) row.appendChild(document.createElement("td"));
  table.appendChild(row);
};

export { createTransaction, renderTransaction };
