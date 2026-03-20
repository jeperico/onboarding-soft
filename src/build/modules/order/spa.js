import { renderContent } from "../../spa/proxy.js";
import { formsEvents, tableEvents } from "../base/listeners.js";
import { finishPurchase, renderOrderDetails, renderOrders } from "./service.js";
const loadTransaction = async () => {
    await formsEvents(finishPurchase, "#chart-details");
    renderOrderDetails();
};
const loadHistory = async () => {
    await renderContent("/history");
    await tableEvents("orders", "view", renderOrders);
};
export default loadTransaction;
export { loadHistory };
