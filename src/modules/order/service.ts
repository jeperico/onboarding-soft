import { IChart } from "../../interfaces/chart.js";
import { IOrder } from "../../interfaces/order.js";
import { ITransaction } from "../../interfaces/transaction.js";
import renderPage from "../../spa/render-page.js";
import { renderVoidTable } from "../../spa/render-void-table.js";
import { formatCode } from "../../utils/format-code.js";
import { formatCurrency } from "../../utils/format-currency.js";
import { serviceView } from "../base/base-services.js";
import { renderActionButton, renderElement } from "../base/services.js";
import {
  OrderCreateSerializer,
  OrderViewSerializer,
  TransactionCreateSerializer,
  TransactionViewSerializer,
} from "./serializer.js";

const finishPurchase = async (event: SubmitEvent) => {
  // I - Environment
  event.preventDefault();

  const order = await OrderCreateSerializer();
  if (!order) return;

  const currentOrders = await serviceView<IOrder>("orders");
  localStorage.setItem(
    "orders",
    JSON.stringify(currentOrders ? [...currentOrders, order] : [order]),
  );

  // II - Inputs
  const transactions = await TransactionCreateSerializer(order.id);
  if (!transactions) return;

  // III - Output
  const currentTransactions = await serviceView<ITransaction>("transactions");
  localStorage.setItem(
    "transactions",
    JSON.stringify(
      currentTransactions
        ? [...currentTransactions, ...transactions]
        : transactions,
    ),
  );

  localStorage.setItem("chart", "");

  renderPage("/history");
};

const renderOrders = async () => {
  const COLUMNS_COUNT = 4;

  const data = await OrderViewSerializer();
  const table = await document.querySelector("#tbody-history");
  if (!data || !table) {
    renderVoidTable("#tbody-history", COLUMNS_COUNT);
    return;
  }

  data.map((el) => {
    const row = document.createElement("tr");

    renderElement(row, formatCode(parseInt(el.id)));
    renderElement(row, el.total_tax);
    renderElement(row, el.total_price);
    renderActionButton(row, el.id, "view");

    table.appendChild(row);
  });

  const row = document.createElement("tr");
  for (let i = 0; i < COLUMNS_COUNT; i++)
    row.appendChild(document.createElement("td"));
  table.appendChild(row);
};

// TODO: Padronize tax atomic values
const renderOrderDetails = async () => {
  const taxField = document.querySelector<HTMLParagraphElement>("#render-tax");
  const totalField =
    document.querySelector<HTMLParagraphElement>("#render-total");
  if (!taxField || !totalField) return;

  const data = await serviceView<IChart>("chart");
  if (!data) {
    taxField.innerText = formatCurrency(0);
    totalField.innerText = formatCurrency(0);
    return;
  }

  const tax = data.reduce((sum, el) => (sum += el.tax * el.quantity), 0);
  const total = data.reduce((sum, el) => (sum += el.price * el.quantity), 0);

  taxField.innerText = formatCurrency(tax);
  totalField.innerText = formatCurrency(total);
};

const renderTransactions = async () => {
  // I - Environment
  const COLUMNS_COUNT = 6;

  // II - Inputs
  const data = await TransactionViewSerializer();
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

export { finishPurchase, renderOrders, renderOrderDetails, renderTransactions };
