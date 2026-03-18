import { renderSelect } from "../base/services.js";
import { renderContent } from "../../spa/proxy.js";
import { baseEvent } from "../../utils/base-event.js";
import { renderChart, createChart } from "./services.js";
const loadChart = async () => {
    await renderContent("/");
    await baseEvent("chart", renderChart, "remove", createChart);
    await renderSelect("products", "#product", "name", "id");
};
export default loadChart;
