import { IChart } from "../../interfaces/chart.js";
import { ITransaction } from "../../interfaces/transaction.js";
import { autoIncrement } from "../../utils/auto-increment.js";
import { serviceView } from "../base/base-services.js";

const transactionSerializer = async (): Promise<ITransaction[] | null> => {
  const data = await serviceView<IChart>("chart");
  if (!data) return null;

  const payload: ITransaction[] = [];
  data.map(async (el) => {
    const id = await autoIncrement("transactions");

    payload.push({
      id: id,
      quantity: el.quantity,
      price: el.price,
      product_id: el.product_id,
      is_active: true,
    });
  });

  return payload;
};

export { transactionSerializer };
