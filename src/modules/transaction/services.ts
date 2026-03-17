import { ITransaction } from "../../interfaces/transaction.js";
import renderPage from "../../spa/render-page.js";
import { renderVoidTable } from "../../spa/render-void-table.js";
import { baseServiceView } from "../../utils/base-services.js";
import { formatCode } from "../../utils/format-code.js";
import { renderErrorMessage } from "../../utils/render-error-message.js";
import { chartSerializer } from "./serializer.js";
import { chartHandler } from "./handlers.js";

const createChart = async (event: SubmitEvent) => {
  // I - Environment
  event.preventDefault();

  // II - Inputs
  const payload = await chartSerializer(event.target as HTMLFormElement);
  if (!payload.product_id || !payload.quantity || !payload.price) return;

  // III - Errors handling
  const errors = await chartHandler(
    payload.product_id,
    payload.quantity,
    payload.price,
  );
  if (errors.length > 0) {
    renderErrorMessage(errors);
    return;
  }

  // IV - Output
  const currentData = await baseServiceView<ITransaction>("transactions");
  localStorage.setItem(
    "transactions",
    JSON.stringify(currentData ? [...currentData, payload] : [payload]),
  );
  renderPage("/");
};

/**
 * Renders category rows inside `<tbody>`.
 *
 * @returns void
 */
const renderChart = async () => {
  // TODO: VALIDATE IF NOT SOME KEY IS UNDEFINED

  // 1° - INPUT
  const data = await baseServiceView<ITransaction>("transactions");
  if (!data) {
    renderVoidTable("#tbody-chart", 6);
    return;
  }

  const table = document.querySelector("#tbody-chart");
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
    product.textContent = el.product_id.toString();
    row.appendChild(product);

    const tax = td.cloneNode();
    tax.textContent = el.product_id.toString();
    row.appendChild(tax);

    const quantity = td.cloneNode();
    quantity.textContent = el.quantity.toString();
    row.appendChild(quantity);

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

export { createChart, renderChart };
