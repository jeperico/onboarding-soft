import { renderVoidTable } from "../../spa/render-void-table.js";
import { formatCode } from "../../utils/format-code.js";
import { DetailsTableSerializer } from "./serializers.js";
import { renderElement } from "../base/services.js";

const renderDetails = async () => {
  // I - Environment
  const COLUMNS_COUNT = 6;

  // II - Inputs
  const data = await DetailsTableSerializer();
  const table = document.querySelector("#tbody-details");
  if (!data || !table) {
    renderVoidTable("#tbody-details", COLUMNS_COUNT);
    return;
  }

  // III - Rendering
  data.forEach((el) => {
    const row = document.createElement("tr");

    renderElement(row, formatCode(parseInt(el.id)));
    renderElement(row, el.product);
    renderElement(row, el.category);
    renderElement(row, el.quantity);
    renderElement(row, el.tax);
    renderElement(row, el.total);

    table.appendChild(row);
  });

  const row = document.createElement("tr");
  for (let i = 0; i < COLUMNS_COUNT; i++)
    row.appendChild(document.createElement("td"));
  table.appendChild(row);
};

export { renderDetails };
