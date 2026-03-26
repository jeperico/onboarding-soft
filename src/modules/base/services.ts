import { Table } from "../../types/table.js";
import { serviceView } from "./base-services.js";

const renderElement = (row: HTMLTableRowElement, text: string) => {
  try {
    const td = document.createElement("td");
    td.textContent = text;
    row.appendChild(td);
  } catch {
    renderVoidElement(row);
  }
};

const renderActionButton = (
  row: HTMLTableRowElement,
  id: string,
  variant: "delete" | "remove" | "view" | "none",
) => {
  try {
    const button = document.createElement("button");
    button.textContent = variant.toUpperCase();
    button.className = `action-${variant} button-secondary`;
    button.id = id;
    const td = document.createElement("td");
    td.appendChild(button);
    row.appendChild(td);
  } catch {
    renderVoidElement(row);
  }
};

const renderVoidElement = (row: HTMLTableRowElement) => {
  const td = document.createElement("td");
  td.textContent = "No data!";
  row.appendChild(td);
};

const renderSelect = async <IResponseData extends { is_active: boolean }>(
  table: Table,
  select: string,
  fieldText: keyof IResponseData,
  fieldValue: keyof IResponseData,
) => {
  const parent = document.querySelector<HTMLSelectElement>(select);
  const data = await serviceView<IResponseData>(table);

  if (!parent || !data) return;
  data.forEach((el: IResponseData) => {
    if (!el.is_active) return;
    const option = document.createElement("option");

    const text = el[fieldText];
    const value = el[fieldValue];

    option.innerText = String(text);
    option.value = String(value);

    parent.appendChild(option);
  });
};

const setFocus = (selector: string) => {
  const element = document.querySelector<HTMLInputElement | HTMLSelectElement>(
    selector,
  );
  if (element) element.focus();
};

export { renderElement, renderActionButton, renderSelect, setFocus };
