import { IProduct } from "../../interfaces/product.js";
import renderPage from "../../spa/render-page.js";
import { renderVoidTable } from "../../spa/render-void-table.js";
import { baseServiceView } from "../../utils/base-services.js";
import { formatCode } from "../../utils/format-code.js";
import { renderErrorMessage } from "../../utils/render-error-message.js";
import { productSerializer } from "./serializer.js";
import { productHandler } from "./handlers.js";

const createProduct = async (event: SubmitEvent) => {
  // I - Environment
  event.preventDefault();

  // II - Inputs
  const payload = await productSerializer(event.target as HTMLFormElement);
  if (!payload.name || !payload.stock || !payload.price || !payload.category_id)
    return;

  // III - Errors handling
  const errors = await productHandler(
    payload.name,
    payload.stock,
    payload.price,
    payload.category_id,
  );
  if (errors.length > 0) {
    renderErrorMessage(errors);
    return;
  }

  // IV - Output
  const currentData = await baseServiceView<IProduct>("products");
  localStorage.setItem(
    "products",
    JSON.stringify(currentData ? [...currentData, payload] : [payload]),
  );
  renderPage("/products");
};

/**
 * Renders products rows inside `<tbody>`.
 *
 * @returns void
 */
const renderProducts = async () => {
  // 1° - INPUT
  const data = await baseServiceView<IProduct>("products");
  if (!data) {
    renderVoidTable("#tbody-products", 6);
    return;
  }

  const table = document.querySelector("#tbody-products");
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

    const product = td.cloneNode();
    product.textContent = el.name;
    row.appendChild(product);

    const stock = td.cloneNode();
    stock.textContent = el.stock.toString();
    row.appendChild(stock);

    const price = td.cloneNode();
    price.textContent = el.price.toString();
    row.appendChild(price);

    const category = td.cloneNode();
    category.textContent = el.category_id.toString();
    row.appendChild(category);

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

export { createProduct, renderProducts };
