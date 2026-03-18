import { formsEvents } from "../base/listeners.js";
import { createTransaction } from "./service.js";
const loadTransaction = async () => {
    await formsEvents(createTransaction, "#chart-details");
};
export default loadTransaction;
