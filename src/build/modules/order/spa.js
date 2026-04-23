import { renderContent } from "../../spa/proxy.js";
import { formsEvents, tableEvents } from "../base/listeners.js";
import { finishPurchase, renderOrderDetails, renderOrders, renderTransactions, listenReturn, } from "./service.js";
const loadTransaction = async () => {
    await formsEvents(finishPurchase, "#chart-details");
    renderOrderDetails();
};
const loadHistory = async () => {
    await renderContent("/history");
    await tableEvents("orders", "view", renderOrders);
};
const loadDetails = async (id) => {
    await renderContent("/details", { order: id.toString() });
    await tableEvents("transactions", "none", renderTransactions);
    listenReturn();
};
export default loadTransaction;
export { loadHistory, loadDetails };
