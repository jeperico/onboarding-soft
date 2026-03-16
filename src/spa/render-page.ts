import {
  loadCategory,
  loadDetails,
  loadHistory,
  loadProducts,
  loadTransactions,
} from "./load.js";
import { RouteKey } from "./routes.js";

const renderPage = (path: RouteKey) => {
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

export default renderPage;
