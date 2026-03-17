import { IChart, IChartRender } from "../../interfaces/chart.js";
import { IProduct } from "../../interfaces/product.js";
import { autoIncrement } from "../../utils/auto-increment.js";
import { baseServiceView } from "../../utils/base-services.js";
import { formatCurrency } from "../../utils/format-currency.js";

const chartSerializer = async (form: HTMLFormElement): Promise<IChart> => {
  const id = await autoIncrement("chart");
  const quantity = form.elements.namedItem("quantity") as HTMLInputElement;
  const price = form.elements.namedItem("price") as HTMLInputElement;
  const tax = form.elements.namedItem("tax") as HTMLInputElement;
  const product = form.elements.namedItem("product") as HTMLSelectElement;

  const payload: IChart = {
    id: id,
    quantity: parseInt(quantity.value),
    price: parseInt(price.value),
    tax: parseFloat(tax.value),
    product_id: parseInt(product.value),
  };

  return payload;
};

const chartTableSerializer = async (): Promise<IChartRender[] | null> => {
  const data = await baseServiceView<IChart>("chart");
  if (!data) return null;

  const payload: IChartRender[] = [];
  data.map(async (el) => {
    const product = (await baseServiceView<IProduct>("products"))?.find(
      (e) => e.id === el.product_id,
    )?.name;
    const total = el.price * el.quantity;

    payload.push({
      id: el.id.toString(),
      quantity: el.quantity.toString(),
      price: formatCurrency(el.price),
      tax: el.tax.toString().concat("%"),
      total: formatCurrency(total),
      product: product || "No data!",
    });
  });

  return payload;
};

export { chartSerializer, chartTableSerializer };
