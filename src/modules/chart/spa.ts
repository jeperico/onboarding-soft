import { IProduct } from "../../interfaces/product.js";
import { renderSelect } from "../base/services.js";
import { renderContent } from "../../spa/proxy.js";
import { tableEvents, formsEvents } from "../base/listeners.js";
import { renderChart, createChart } from "./services.js";
import { serviceView } from "../base/base-services.js";
import { ICategory } from "../../interfaces/category.js";
import { formatCurrency } from "../../utils/format-currency.js";

const loadChart = async () => {
  await renderContent("/");
  await tableEvents("chart", "remove", renderChart);
  await formsEvents(createChart, "#home-form");
  await renderSelect<IProduct>("products", "#product", "name", "id");

  const listener = document.querySelector<HTMLSelectElement>("#product");
  if (!listener) return;

  listener.addEventListener("change", async (e) => {
    const id = (e.target as HTMLSelectElement).value;
    const product = (await serviceView<IProduct>("products"))?.find(
      (el) => el.id === parseInt(id),
    );
    const tax = (await serviceView<ICategory>("categories"))?.find(
      (el) => el.id === product?.id,
    )?.tax;

    console.log(product?.price, tax);

    const taxField = document.querySelector<HTMLInputElement>("#tax");
    if (!taxField || !tax) return;
    taxField.value = tax.toString();

    const priceField = document.querySelector<HTMLInputElement>("#price");
    if (!priceField || !product?.price) return;
    priceField.value = product.price.toString();
  });
};

export default loadChart;
