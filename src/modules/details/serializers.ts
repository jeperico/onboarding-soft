import { ICategory } from "../../interfaces/category.js";
import { IProduct } from "../../interfaces/product.js";
import { IDetailsRender, ITransaction } from "../../interfaces/transaction.js";
import { formatCurrency } from "../../utils/format-currency.js";
import { serviceView } from "../base/base-services.js";

const detailsTableSerializer = async (): Promise<IDetailsRender[] | null> => {
  const data = (await serviceView<ITransaction>("transactions"))?.filter(
    (el) => el.is_active,
  );
  if (!data) return null;

  const payload: IDetailsRender[] = [];
  await data.map(async (el) => {
    const product = (await serviceView<IProduct>("products"))?.find(
      (e) => e.id === el.product_id,
    );
    const category = (await serviceView<ICategory>("categories"))?.find(
      (e) => e.id === product?.category_id,
    );
    const total = el.price * el.quantity;

    payload.push({
      id: el.id.toString(),
      product: product?.name || "No data!",
      category: category?.name || "No data!",
      quantity: el.quantity.toString(),
      tax: category?.tax.toString().concat("%") || "No data!",
      total: formatCurrency(total),
    });
  });

  return payload;
};

export { detailsTableSerializer };
