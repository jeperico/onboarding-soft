import { ITransaction } from "../../interfaces/transaction.js";
import renderPage from "../../spa/render-page.js";
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

export { createTransaction };
