import { Table } from "../types/table.js";
import { baseServiceView } from "../utils/base-services.js";

const renderSelect = async <IResponseData extends { is_active: boolean }>(
  table: Table,
  select: string,
  fieldText: keyof IResponseData,
  fieldValue: keyof IResponseData,
) => {
  const parent = document.querySelector<HTMLSelectElement>(select);
  const data = await baseServiceView<IResponseData>(table);

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

export { renderSelect };
