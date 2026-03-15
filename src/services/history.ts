import { ITransaction } from "../interfaces/transaction.js";
import { renderVoidTable } from "../spa/render-void-table.js";
import { baseServiceView } from "../utils/base-services.js";
import { formatCode } from "../utils/format-code.js";

/**
 * Renders category rows inside `<tbody>`.
 *
 * @returns void
 */
const renderHistory = async () => {
  // 1° - INPUT
  const data = await baseServiceView<ITransaction>("transactions");
  if (!data) {
    renderVoidTable("#tbody-history", 4);
    return;
  }

  const table = document.querySelector("#tbody-history");
  if (!table) return;

  // 2° - PROCESS /  OUTPUT
  if (!data || !table) return;

  const payload = data.filter((el: { is_active: boolean }) => {
    return el.is_active;
  });
  payload.forEach((el, index) => {
    const row = document.createElement("tr");
    const td = document.createElement("td");

    const code = td.cloneNode();
    code.textContent = formatCode(index);
    row.appendChild(code);

    const tax = td.cloneNode();
    tax.textContent = el.product_id.toString();
    row.appendChild(tax);

    const total = td.cloneNode();
    total.textContent = el.price.toString();
    row.appendChild(total);

    const button = document.createElement("button");
    button.textContent = "VIEW";
    button.className = "action-view button-secondary";
    button.id = el.id.toString();
    const action = td.cloneNode();
    action.appendChild(button);
    row.appendChild(action);

    table.appendChild(row);
  });

  const row = document.createElement("tr");
  for (let i = 0; i < 4; i++) row.appendChild(document.createElement("td"));
  table.appendChild(row);
};

export { renderHistory };
