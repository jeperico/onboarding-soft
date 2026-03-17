import { IChart } from "../../interfaces/chart.js";
import { autoIncrement } from "../../utils/auto-increment.js";

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

export { chartSerializer };
