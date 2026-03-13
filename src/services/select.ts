import { Table } from "../types/table.js";
import { baseServiceView } from "../utils/base-services.js";

const renderSelect = async <IResponseData extends object>(
  table: Table,
  select: string,
  field: keyof IResponseData,
) => {
  const parent = document.querySelector<HTMLSelectElement>(select);
  const data = await baseServiceView<IResponseData>(table);

  if (!parent || !data) return;
  data.forEach((el: IResponseData) => {
    const option = document.createElement("option");

    const value = el[field];

    option.innerText = String(value);
    option.value = String(value).toLowerCase();

    parent.appendChild(option);
  });
};

export { renderSelect };
