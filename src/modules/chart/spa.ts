import { IProduct } from "../../interfaces/product.js";
import { renderSelect } from "../base/services.js";
import { renderContent } from "../../spa/proxy.js";
import { tableEvents, formsEvents } from "../base/listeners.js";
import { renderChart, createChart, fieldsListener } from "./services.js";

const loadChart = async () => {
  await renderContent("/");
  await tableEvents("chart", "remove", renderChart, "/");
  await formsEvents(createChart, "#home-form");
  // TODO: Remove products without stock from selection
  await renderSelect<IProduct>("products", "#product", "name", "id");
  fieldsListener();
};

export default loadChart;
