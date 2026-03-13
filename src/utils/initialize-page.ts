import {
  loadCategory,
  loadDetails,
  loadHistory,
  loadProducts,
  loadTransactions,
} from "../services/events/load.js";
import { RouteKey } from "../types/route.js";

const initializePage = (path: RouteKey) => {
  console.log("PAGE CHANGED TO", path);
  switch (path) {
    case "/":
      loadTransactions();
      break;
    case "/products":
      loadProducts();
      break;
    case "/categories":
      loadCategory();
      break;
    case "/history":
      loadHistory();
      break;
    case "/details":
      loadDetails();
      break;
  }
};

export default initializePage;
