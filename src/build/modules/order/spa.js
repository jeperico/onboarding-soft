import { formsEvents } from "../base/listeners.js";
import { finishPurchase, renderOrderDetails } from "./service.js";
const loadTransaction = async () => {
    await formsEvents(finishPurchase, "#chart-details");
    renderOrderDetails();
};
export default loadTransaction;
