import { renderContent } from "../../spa/proxy.js";
import { tableEvents } from "../base/listeners.js";
import { renderDetails } from "./services.js";

const loadDetails = async () => {
  await renderContent("/details");
  await tableEvents("transactions", "none", renderDetails);
};

export default loadDetails;
