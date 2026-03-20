import {
  ITransaction,
  ITransactionRender,
} from "../../interfaces/transaction.js";
import { IProduct } from "../../interfaces/product.js";
import { ICategory } from "../../interfaces/category.js";

import { serviceView } from "../base/base-services.js";
import { formatCurrency } from "../../utils/format-currency.js";

const HistoryTableSerializer = async (): Promise<
  ITransactionRender[] | null
> => {
  const data = (await serviceView<ITransaction>("transactions"))?.filter(
    (el) => el.is_active,
  );
  if (!data) return null;

  const payload: ITransactionRender[] = [];
  data.map(async (el) => {
    const product = (await serviceView<IProduct>("products"))?.find(
      (e) => e.id === el.product_id,
    )?.category_id;
    const tax = (await serviceView<ICategory>("categories"))?.find(
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

export { HistoryTableSerializer };
