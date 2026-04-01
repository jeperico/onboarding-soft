import { ICategory } from "../../interfaces/category.js";
import renderPage from "../../spa/render-page.js";
import { renderVoidTable } from "../../spa/render-void-table.js";
import { serviceView } from "../base/base-services.js";
import { formatCode } from "../../utils/format-code.js";
import { renderErrorMessage } from "../../utils/render-error-message.js";
import {
  renderActionButton,
  renderElement,
  setFocus,
} from "../base/services.js";
import { categoryHandler } from "./handlers.js";
import {
  CategoryCreateSerializer,
  CategoryViewSerializer,
} from "./serializer.js";

const createCategory = async (event: SubmitEvent) => {
  event.preventDefault();

  const { payload, requireds } = await CategoryCreateSerializer(
    event.target as HTMLFormElement,
  );

  if (requireds.length > 0) {
    renderErrorMessage(requireds);
    return;
  }

  const errors = await categoryHandler(payload.name, payload.tax);
  if (errors.length > 0) {
    renderErrorMessage(errors);
    setFocus(errors[0].field || "#name");
    return;
  }

  const currentData = await serviceView<ICategory>("categories");
  localStorage.setItem(
    "categories",
    JSON.stringify(currentData ? [...currentData, payload] : [payload]),
  );
  renderPage("/categories");
};

const renderCategory = async () => {
  const COLUMNS_COUNT = 4;

  const data = await CategoryViewSerializer();
  const table = document.querySelector("#tbody-category");
  if (!data || !table) {
    renderVoidTable("#tbody-category", COLUMNS_COUNT);
    return;
  }
  table.innerHTML = "";

  data.map((el) => {
    const row = document.createElement("tr");

    renderElement(row, formatCode(parseInt(el.id)));
    renderElement(row, el.name);
    renderElement(row, el.tax);
    renderActionButton(row, el.id, "delete");

    table.appendChild(row);
  });

  const row = document.createElement("tr");
  for (let i = 0; i < COLUMNS_COUNT; i++)
    row.appendChild(document.createElement("td"));
  table.appendChild(row);
};

const formatTaxInput = () => {
  const taxInput = document.querySelector<HTMLInputElement>("#tax");
  if (!taxInput) return;

  const regexTaxInput = (e: Event): void => {
    if (!e.target || !(e.target instanceof HTMLInputElement)) return;
    let value = (e.target as HTMLInputElement).value;

    value = value.replace(/[^0-9.,]/g, "");
    value = value.replace(",", ".");
    let [integer, decimal] = value.split(".");

    if (value.split(".").length > 2) {
      value = integer + "." + value.split(".").slice(1).join("");
      [integer, decimal] = value.split(".");
    }

    if (decimal !== undefined) {
      decimal = decimal.slice(0, 2);
      value = `${integer}.${decimal}`;
    }

    if (value.endsWith(".")) {
      e.target.value = value;
      return;
    }

    let number: number = parseFloat(value);
    if (!isNaN(number)) {
      if (number > 100) number = 100;
      if (number < 0) number = 0;

      value = number.toString();
    }

    e.target.value = value;
  };

  taxInput.addEventListener("input", regexTaxInput);
};

export { createCategory, renderCategory, formatTaxInput };
