import renderPage from "../../spa/render-page.js";
import { renderVoidTable } from "../../spa/render-void-table.js";
import { serviceView } from "../base/base-services.js";
import { renderErrorMessage } from "../../utils/render-error-message.js";
import { chartSerializer, chartTableSerializer } from "./serializer.js";
import { chartHandler } from "./handlers.js";
import { IChart } from "../../interfaces/chart.js";
import { renderActionButton, renderElement } from "../base/services.js";
import { IProduct } from "../../interfaces/product.js";
import { ICategory } from "../../interfaces/category.js";

const createChart = async (event: SubmitEvent) => {
  // I - Environment
  event.preventDefault();

  // II - Inputs
  const payload = await chartSerializer(event.target as HTMLFormElement);
  if (
    !payload.product_id ||
    !payload.quantity ||
    !payload.price ||
    !payload.tax
  )
    return;

  // III - Errors handling
  const errors = await chartHandler(
    payload.product_id,
    payload.quantity,
    payload.price,
    payload.tax,
  );
  if (errors.length > 0) {
    renderErrorMessage(errors);
    return;
  }

  // IV - Output
  const currentData = await serviceView<IChart>("chart");
  localStorage.setItem(
    "chart",
    JSON.stringify(currentData ? [...currentData, payload] : [payload]),
  );
  renderPage("/");
};

const renderChart = async () => {
  // I - Environment
  const COLUMNS_COUNT = 6;

  // II - Inputs
  const data = await chartTableSerializer();
  const table = document.querySelector("#tbody-chart");
  if (!data || !table) {
    renderVoidTable("#tbody-chart", COLUMNS_COUNT);
    return;
  }

  // III - Rendering
  data.map((el) => {
    const row = document.createElement("tr");

    renderElement(row, el.product);
    renderElement(row, el.price);
    renderElement(row, el.quantity);
    renderElement(row, el.tax);
    renderElement(row, el.total);
    renderActionButton(row, el.id, "remove");

    table.appendChild(row);
  });

  // IV - Output
  const row = document.createElement("tr");
  for (let i = 0; i < COLUMNS_COUNT; i++)
    row.appendChild(document.createElement("td"));
  table.appendChild(row);
};

const fieldsListener = () => {
  const listener = document.querySelector<HTMLSelectElement>("#product");
  if (!listener) return;

  listener.addEventListener("change", async (e) => {
    const id = (e.target as HTMLSelectElement).value;
    const product = (await serviceView<IProduct>("products"))?.find(
      (el) => el.id === parseInt(id),
    );
    const tax = (await serviceView<ICategory>("categories"))?.find(
      (el) => el.id === product?.id,
    )?.tax;

    const taxField = document.querySelector<HTMLInputElement>("#tax");
    if (!taxField || !tax) return;
    taxField.value = tax.toString();

    const priceField = document.querySelector<HTMLInputElement>("#price");
    if (!priceField || !product?.price) return;
    priceField.value = product.price.toString();
  });
};

export { createChart, renderChart, fieldsListener };
