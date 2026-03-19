import { formsEvents } from "../base/listeners.js";
import { createTransaction, renderTransaction } from "./service.js";
const loadTransaction = async () => {
    await formsEvents(createTransaction, "#chart-details");
    renderTransaction();
};
export default loadTransaction;
