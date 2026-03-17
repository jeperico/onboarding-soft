import { renderContent } from "../../spa/proxy.js";
import { baseEvent } from "../../utils/base-event.js";
import { renderHistory } from "./services.js";
const loadHistory = async () => {
    await renderContent("/history");
    await baseEvent("transactions", renderHistory, "view");
};
export default loadHistory;
