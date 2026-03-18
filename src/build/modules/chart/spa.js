import { renderSelect } from "../base/services.js";
import { renderContent } from "../../spa/proxy.js";
import { tableEvents, formsEvents } from "../base/listeners.js";
import { renderChart, createChart } from "./services.js";
import { serviceView } from "../base/base-services.js";
const loadChart = async () => {
    await renderContent("/");
    await tableEvents("chart", "remove", renderChart);
    await formsEvents(createChart, "#home-form");
    await renderSelect("products", "#product", "name", "id");
    const listener = document.querySelector("#product");
    if (!listener)
        return;
    listener.addEventListener("change", async (e) => {
        const id = e.target.value;
        const product = (await serviceView("products"))?.find((el) => el.id === parseInt(id));
        const tax = (await serviceView("categories"))?.find((el) => el.id === product?.id)?.tax;
        console.log(product?.price, tax);
        const taxField = document.querySelector("#tax");
        if (!taxField || !tax)
            return;
        taxField.value = tax.toString();
        const priceField = document.querySelector("#price");
        if (!priceField || !product?.price)
            return;
        priceField.value = product.price.toString();
    });
};
export default loadChart;
