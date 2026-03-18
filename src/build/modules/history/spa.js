import { renderContent } from "../../spa/proxy.js";
import { tableEvents } from "../base/listeners.js";
import { renderHistory } from "./services.js";
const loadHistory = async () => {
    await renderContent("/history");
    await tableEvents("transactions", "view", renderHistory);
};
export default loadHistory;
