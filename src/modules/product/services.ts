import { IProduct } from "../../interfaces/product.js";
import renderPage from "../../spa/render-page.js";
import { renderVoidTable } from "../../spa/render-void-table.js";
import { serviceView } from "../base/base-services.js";
import { formatCode } from "../../utils/format-code.js";
import { renderErrorMessage } from "../../utils/render-error-message.js";
import { ProductSerializer, ProductTableSerializer } from "./serializer.js";
import { productHandler } from "./handlers.js";
import { renderActionButton, renderElement } from "../base/services.js";

const createProduct = async (event: SubmitEvent) => {
  // I - Environment
  event.preventDefault();

  // II - Inputs
  const payload = await ProductSerializer(event.target as HTMLFormElement);
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
  const currentData = await serviceView<IProduct>("products");
  localStorage.setItem(
    "products",
    JSON.stringify(currentData ? [...currentData, payload] : [payload]),
  );
  renderPage("/products");
};

const renderProducts = async () => {
  // I - Environment
  const COLUMNS_COUNT = 6;

  // II - Inputs
  const data = await ProductTableSerializer();
  const table = document.querySelector("#tbody-products");
  if (!data || !table) {
    renderVoidTable("#tbody-products", COLUMNS_COUNT);
    return;
  }

  // III - Rendering
  data.map((el) => {
    const row = document.createElement("tr");

    renderElement(row, formatCode(parseInt(el.id)));
    renderElement(row, el.name);
    renderElement(row, el.stock);
    renderElement(row, el.price);
    renderElement(row, el.category);
    renderActionButton(row, el.id, "delete");

    table.appendChild(row);
  });

  // IV - Output
  const row = document.createElement("tr");
  for (let i = 0; i < COLUMNS_COUNT; i++)
    row.appendChild(document.createElement("td"));
  table.appendChild(row);
};

export { createProduct, renderProducts };
