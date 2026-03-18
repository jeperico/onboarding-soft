import { renderVoidTable } from "../../spa/render-void-table.js";
import { formatCode } from "../../utils/format-code.js";
import { renderDeleteButton, renderElement } from "../base/services.js";
import { historyTableSerializer } from "./serializer.js";

const renderHistory = async () => {
  // I - Environment
  const COLUMNS_COUNT = 4;

  // II - Inputs
  const data = await historyTableSerializer();
  const table = document.querySelector("#tbody-history");
  if (!data || !table) {
    renderVoidTable("#tbody-history", 4);
    return;
  }

  // III - Rendering
  console.log("data: ", data);
  data.map((el) => {
    console.log(el);
    const row = document.createElement("tr");

    renderElement(row, formatCode(parseInt(el.id)));
    renderElement(row, el.tax);
    renderElement(row, el.total);
    renderDeleteButton(row, el.id);

    table.appendChild(row);
  });
  console.log("data: ", data);

  // IV - Output
  const row = document.createElement("tr");
  for (let i = 0; i < COLUMNS_COUNT; i++)
    row.appendChild(document.createElement("td"));
  table.appendChild(row);
};

export { renderHistory };
