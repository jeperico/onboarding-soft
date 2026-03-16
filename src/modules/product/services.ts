import { IProduct } from "../../interfaces/product.js";
import renderPage from "../../spa/render-page.js";
import { renderVoidTable } from "../../spa/render-void-table.js";
import { autoIncrement } from "../../utils/auto-increment.js";
import { baseServiceView } from "../../utils/base-services.js";
import { formatCode } from "../../utils/format-code.js";
import { productFormHandler } from "./handlers.js";

/**
 * Handles product form submission.
 *
 * @param event - Form submit event.
 * @returns void
 */
const createProduct = async (event: SubmitEvent) => {
  // 1° - ENVIRONMENT
  event.preventDefault();

  // 2° - INPUT
  const id = await autoIncrement("products");
  const form = event.target as HTMLFormElement;
  const product = (form.elements.namedItem("product") as HTMLInputElement)
    .value;
  const category = (form.elements.namedItem("category") as HTMLSelectElement)
    .value;
  const price = parseInt(
    (form.elements.namedItem("price") as HTMLInputElement).value,
  );
  const amount = parseInt(
    (form.elements.namedItem("amount") as HTMLInputElement).value,
  );

  // 3° - PROCESS
  const validate = productFormHandler();
  const current = await baseServiceView<IProduct>("products");
  if (!product || !category || !price || !amount) return;

  const payload: IProduct = {
    id: id,
    name: product,
    stock: amount,
    price: price,
    category_id: "1",
    is_active: true,
  };

  // 4° - OUTPUT
  localStorage.setItem(
    "products",
    JSON.stringify(current ? [...current, payload] : [payload]),
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

    const amount = td.cloneNode();
    amount.textContent = el.stock.toString();
    row.appendChild(amount);

    const price = td.cloneNode();
    price.textContent = el.price.toString();
    row.appendChild(price);

    const category = td.cloneNode();
    category.textContent = el.category_id;
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
