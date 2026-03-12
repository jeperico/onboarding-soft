import { createTransaction, renderTransaction, } from "../services/transaction.js";
import { baseEvent } from "./base-event.js";
baseEvent("transactions", createTransaction, renderTransaction);
