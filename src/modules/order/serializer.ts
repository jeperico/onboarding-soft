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
  const chart = await serviceView<IChart>("chart");
  if (!chart) return null;

  const products = await serviceView<IProduct>("products");
  if (!products) return null;

  const id = await autoIncrement("orders");
  let total_tax = 0;
  let total_price = 0;

  for (const el of chart) {
    total_tax += el.tax * el.quantity;
    total_price += el.price * el.quantity;

    const product = products.find((e) => e.id === el.product_id);
    if (product) {
      product.stock -= el.quantity;
    }
  }

  const filteredProducts = products.filter((p) => p.stock > 0);
  localStorage.setItem("products", JSON.stringify(filteredProducts));

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

  data.forEach((el, index) => {
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

  const transactions = (
    await serviceView<ITransaction>("transactions")
  )?.filter((el) => el.is_active && el.order_id === parseInt(id));
  if (!transactions) return null;

  const products = await serviceView<IProduct>("products");
  const categories = await serviceView<ICategory>("categories");

  return transactions.map((el) => {
    const product = products?.find((p) => p.id === el.product_id);
    const category = categories?.find((c) => c.id === product?.category_id);

    const tax = (product?.tax || 0) * el.quantity;
    const total = el.price * el.quantity;

    return {
      id: el.id.toString(),
      product: product?.name || "No data!",
      category: category?.name || "No data!",
      quantity: el.quantity.toString(),
      tax: formatCurrency(tax),
      total: formatCurrency(total),
    };
  });
};

export {
  OrderCreateSerializer,
  OrderViewSerializer,
  TransactionCreateSerializer,
  TransactionViewSerializer,
};
