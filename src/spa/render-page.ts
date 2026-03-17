import {
  loadCategory,
  loadDetails,
  loadHistory,
  loadProducts,
  loadChart,
} from "../services/loads.js";
import { RouteKey } from "./routes.js";

const renderPage = (path: RouteKey) => {
  switch (path) {
    case "/":
      loadChart();
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
