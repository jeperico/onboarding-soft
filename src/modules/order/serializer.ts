import { IChart } from "../../interfaces/chart.js";
import { IOrder, IOrderRender } from "../../interfaces/order.js";
import { ITransaction } from "../../interfaces/transaction.js";
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

export {
  OrderCreateSerializer,
  OrderViewSerializer,
  TransactionCreateSerializer,
};
