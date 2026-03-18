import { renderVoidTable } from "../../spa/render-void-table.js";
import { formatCode } from "../../utils/format-code.js";
import { renderActionButton, renderElement } from "../base/services.js";
import { historyTableSerializer } from "./serializer.js";

const renderHistory = async () => {
  // I - Environment
  const COLUMNS_COUNT = 4;

  // II - Inputs
  const data = await historyTableSerializer();
  const table = await document.querySelector("#tbody-history");
  if (!data || !table) {
    renderVoidTable("#tbody-history", COLUMNS_COUNT);
    return;
  }

  // III - Rendering
  data.map((el) => {
    const row = document.createElement("tr");

    renderElement(row, formatCode(parseInt(el.id)));
    renderElement(row, el.tax);
    renderElement(row, el.total);
    renderActionButton(row, el.id, true);

    table.appendChild(row);
  });

  // IV - Output
  const row = document.createElement("tr");
  for (let i = 0; i < COLUMNS_COUNT; i++)
    row.appendChild(document.createElement("td"));
  table.appendChild(row);
};

export { renderHistory };
