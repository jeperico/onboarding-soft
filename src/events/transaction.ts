import {
  createTransaction,
  renderTransaction,
} from "../services/transaction.js";
import { baseEvent } from "../utils/base-event.js";

baseEvent("transactions", renderTransaction, "delete", createTransaction);
