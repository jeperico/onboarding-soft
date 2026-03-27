import { IProduct } from "../../interfaces/product.js";
import { renderSelect, setFocus } from "../base/services.js";
import { renderContent } from "../../spa/proxy.js";
import { tableEvents, formsEvents, inputMutations } from "../base/listeners.js";
import { renderChart, createChart, fieldsListener } from "./services.js";

const loadChart = async () => {
  await renderContent("/");
  await tableEvents<IChart>("chart", "remove", renderChart, "/");
  await formsEvents(createChart, "#home-form");
  await renderSelect<IProduct>("products", "#product", "name", "id");
  inputMutations();
  fieldsListener();
  setFocus("#product");
};

export default loadChart;
