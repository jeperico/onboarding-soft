import { ICategory } from "../../interfaces/category.js";
import { IChart } from "../../interfaces/chart.js";
import { IOrder, IOrderRender } from "../../interfaces/order.js";
import { IProduct } from "../../interfaces/product.js";
import {
  ITransaction,
  ITransactionRender,
} from "../../interfaces/transaction.js";
import { autoIncrement } from "../../utils/auto-increment.js";
import { formatCurrency } from "../../utils/format-currency.js";
import { serviceView } from "../base/base-services.js";

const OrderCreateSerializer = async (): Promise<IOrder | null> => {
  const data = await serviceView<IChart>("chart");
  if (!data) return null;

  const id = await autoIncrement("orders");
  let total_tax = 0;
  let total_price = 0;

  data.map((el) => {
    total_tax += el.tax * el.quantity;
    total_price += el.price * el.quantity;
  });

  const payload: IOrder = {
    id: id,
    total_tax: total_tax,
    total_price: total_price,
    created_at: new Date(),
  };

  return payload;
};

const OrderViewSerializer = async (): Promise<IOrderRender[] | null> => {
  const data = await serviceView<IOrder>("orders");
  if (!data) return null;

  const payload: IOrderRender[] = [];

  data.map((el) => {
    const id = el.id.toString();
    const total_price = formatCurrency(el.total_price);
    const total_tax = formatCurrency(el.total_tax);

    payload.push({
      id: id,
      total_price: total_price,
      total_tax: total_tax,
    });
  });

  return payload;
};

const TransactionCreateSerializer = async (
  order: number,
): Promise<ITransaction[] | null> => {
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
      order_id: order,
      is_active: true,
    });
  });

  return payload;
};

const TransactionViewSerializer = async (): Promise<
  ITransactionRender[] | null
> => {
  const url = new URLSearchParams(window.location.search);
  const id = url.get("order");
  if (!id) return null;
  const data = (await serviceView<ITransaction>("transactions"))?.filter(
    (el) => el.is_active && el.order_id === parseInt(id),
  );
  if (!data) return null;

  const payload: ITransactionRender[] = [];
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

export {
  OrderCreateSerializer,
  OrderViewSerializer,
  TransactionCreateSerializer,
  TransactionViewSerializer,
};
