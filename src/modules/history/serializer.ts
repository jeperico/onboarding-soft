import {
  ITransaction,
  ITransactionRender,
} from "../../interfaces/transaction.js";
import { IProduct } from "../../interfaces/product.js";
import { ICategory } from "../../interfaces/category.js";

import { baseServiceView } from "../../utils/base-services.js";
import { formatCurrency } from "../../utils/format-currency.js";

const historyTableSerializer = async (): Promise<
  ITransactionRender[] | null
> => {
  const data = await baseServiceView<ITransaction>("transactions");
  if (!data) return null;

  const payload: ITransactionRender[] = [];
  data.map(async (el) => {
    const product = (await baseServiceView<IProduct>("products"))?.find(
      (e) => e.id === el.product_id,
    )?.category_id;
    const tax = (await baseServiceView<ICategory>("categories"))?.find(
      (e) => e.id === product,
    )?.tax;
    const total = el.price * el.quantity;

    payload.push({
      id: el.id.toString(),
      tax: tax ? tax.toString().concat("%") : "No data!",
      total: formatCurrency(total),
    });
  });

  return payload;
};

export { historyTableSerializer };
