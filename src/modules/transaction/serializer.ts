import { IChart } from "../../interfaces/chart.js";
import { ITransaction } from "../../interfaces/transaction.js";
import { autoIncrement } from "../../utils/auto-increment.js";
import { serviceView } from "../base/base-services.js";

const transactionSerializer = async (): Promise<ITransaction[] | null> => {
  const data = await serviceView<IChart>("chart");
  if (!data) return null;

  const id = (await autoIncrement("transactions")) || 1;
  const payload: ITransaction[] = [];

  data.map(async (el, index) => {
    payload.push({
      id: id + index,
      quantity: el.quantity,
      price: el.price,
      product_id: el.product_id,
      is_active: true,
    });
  });

  return payload;
};

export { transactionSerializer };
