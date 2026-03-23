import { ICategory } from "../../interfaces/category.js";
import renderPage from "../../spa/render-page.js";
import { renderVoidTable } from "../../spa/render-void-table.js";
import { serviceView } from "../base/base-services.js";
import { formatCode } from "../../utils/format-code.js";
import { renderErrorMessage } from "../../utils/render-error-message.js";
import { renderActionButton, renderElement } from "../base/services.js";
import { categoryHandler } from "./handlers.js";
import {
  CategoryCreateSerializer,
  CategoryViewSerializer,
} from "./serializer.js";

const createCategory = async (event: SubmitEvent) => {
  event.preventDefault();

  const payload = await CategoryCreateSerializer(
    event.target as HTMLFormElement,
  );
  if (!payload.name || !payload.tax) return;

  const errors = await categoryHandler(payload.name, payload.tax);
  if (errors.length > 0) {
    renderErrorMessage(errors);
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

export { createCategory, renderCategory };
