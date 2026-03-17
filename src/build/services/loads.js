import { createChart, renderChart } from "../modules/chart/services.js";
import { renderContent } from "../spa/proxy.js";
import { baseEvent } from "../utils/base-event.js";
import { renderSelect } from "./select.js";
const loadChart = async () => {
    await renderContent("/");
    await baseEvent("chart", renderChart, "remove", createChart);
    await renderSelect("products", "#product", "name", "id");
};
export { loadChart };
