import { renderContent } from "../../spa/proxy.js";
import { baseEvent } from "../../utils/base-event.js";
import { renderDetails } from "./services.js";

const loadDetails = async () => {
  await renderContent("/details");
  await baseEvent("transactions", renderDetails, "none");
};

export default loadDetails;
