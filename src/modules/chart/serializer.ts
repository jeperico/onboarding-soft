import { IChart, IChartRender } from "../../interfaces/chart.js";
import { IProduct } from "../../interfaces/product.js";
import { autoIncrement } from "../../utils/auto-increment.js";
import { serviceView } from "../base/base-services.js";
import { formatCurrency } from "../../utils/format-currency.js";

const ChartCreateSerializer = async (
  form: HTMLFormElement,
): Promise<{ payload: IChart; requireds: ErrorResponse }> => {
  const id = await autoIncrement("chart");
  const quantity = form.elements.namedItem("quantity") as HTMLInputElement;
  const price = form.elements.namedItem("price") as HTMLInputElement;
  const tax = form.elements.namedItem("tax") as HTMLInputElement;
  const product = form.elements.namedItem("product") as HTMLSelectElement;

  const payload: IChart = await {
    id: id,
    quantity: parseInt(quantity.value),
    price: parseInt((parseFloat(price.value) * 100).toFixed(0)),
    tax: parseInt((parseFloat(tax.value) * 100).toFixed(0)),
    product_id: parseInt(product.value),
  };

  const requireds: ErrorResponse = [];
  if (!payload.quantity)
    requireds.push({ field: "#quantity", message: "Quantity is required." });
  if (!payload.price)
    requireds.push({ field: "#price", message: "Price is required." });
  if (payload.tax === null || payload.tax === undefined)
    requireds.push({ field: "#tax", message: "Tax is required." });
  const product_id = parseInt(product.value);
  if (!product.value || isNaN(product_id)) {
    requireds.push({ field: "#product", message: "Product is required." });
  }

  return { payload, requireds };
};

const ChartViewSerializer = async (): Promise<IChartRender[] | null> => {
  const data = await serviceView<IChart>("chart");
  if (!data) return null;

  const products = await serviceView<IProduct>("products");
  const payload: IChartRender[] = [];

  data.map(async (el) => {
    const product = products?.find((e) => e.id === el.product_id);
    const total = (el.price + el.tax) * el.quantity;

    const tax =
      product?.tax === null || product?.tax === undefined
        ? "No data!"
        : formatCurrency(product.tax * el.quantity);

    payload.push({
      id: el.id.toString(),
      quantity: el.quantity.toString(),
      price: formatCurrency(el.price),
      tax: tax,
      total: formatCurrency(total),
      product: product?.name || "No data!",
    });
  });

  return payload;
};

export { ChartCreateSerializer, ChartViewSerializer };
