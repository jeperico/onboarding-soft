import { Table } from "../types/table.js";
import { baseView } from "../utils/base-view.js";

const renderSelect = (table: Table, select: string, field: string) => {
  // 1° - INPUT
  const parent = document.querySelector(select);
  const data = baseView(table, { variant: "list" });

  // 2° - PROCESS
  if (!parent || !data) return;
  data.forEach((el: Object) => {
    const option = document.createElement("option");
    option.innerText = el[field];
    option.value = el[field].toLowerCase();
    parent.appendChild(option);
  });
};

export { renderSelect };
