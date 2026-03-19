import { IChart } from "../../interfaces/chart.js";
import { ITransaction } from "../../interfaces/transaction.js";
import renderPage from "../../spa/render-page.js";
import { formatCurrency } from "../../utils/format-currency.js";
import { serviceView } from "../base/base-services.js";
import { transactionSerializer } from "./serializer.js";

const createTransaction = async (event: SubmitEvent) => {
  // I - Environment
  event.preventDefault();

  // II - Inputs
  const payload = await transactionSerializer();
  if (!payload) return;

  // III - Output
  const currentData = await serviceView<ITransaction>("transactions");
  localStorage.setItem(
    "transactions",
    JSON.stringify(currentData ? [...currentData, ...payload] : payload),
  );

  localStorage.setItem("chart", "");
  renderPage("/");
};

const renderTransaction = async () => {
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

export { createTransaction, renderTransaction };
