import { renderHistory } from "../services/history.js";
import { baseEvent } from "../utils/base-event.js";

baseEvent("transactions", renderHistory, "view");
