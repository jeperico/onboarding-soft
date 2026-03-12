import { renderDetails } from "../services/details.js";
import { baseEvent } from "../utils/base-event.js";
baseEvent("transactions", renderDetails, "none");
