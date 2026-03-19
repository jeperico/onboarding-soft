import { IChart } from "../../interfaces/chart.js";
import { IOrder } from "../../interfaces/order.js";
import { ITransaction } from "../../interfaces/transaction.js";
import renderPage from "../../spa/render-page.js";
import { formatCurrency } from "../../utils/format-currency.js";
import { serviceView } from "../base/base-services.js";
import { OrderSerializer, transactionSerializer } from "./serializer.js";

const finishPurchase = async (event: SubmitEvent) => {
  // I - Environment
  event.preventDefault();

  const order = await OrderSerializer();
  if (!order) return;

  const currentOrders = await serviceView<IOrder>("orders");
  localStorage.setItem(
    "orders",
    JSON.stringify(currentOrders ? [...currentOrders, order] : [order]),
  );

  // II - Inputs
  const transactions = await transactionSerializer(order.id);
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

  renderPage("/");
};

// TODO: Padronize tax atomic values
const renderOrderDetails = async () => {
  // I - Inputs
  const taxField = document.querySelector<HTMLParagraphElement>("#render-tax");
  const totalField =
    document.querySelector<HTMLParagraphElement>("#render-total");
  if (!taxField || !totalField) return;

  // II - Data
  const data = await serviceView<IChart>("chart");
  if (!data) return;
  console.log(data);

  const tax = data.reduce((sum, el) => (sum += el.tax * el.quantity), 0);
  const total = data.reduce((sum, el) => (sum += el.price * el.quantity), 0);

  taxField.innerText = formatCurrency(tax);
  totalField.innerText = formatCurrency(total);
};

export { finishPurchase, renderOrderDetails };
