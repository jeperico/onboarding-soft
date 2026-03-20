import loadChart from "../modules/chart/spa.js";
import loadProducts from "../modules/product/spa.js";
import loadCategory from "../modules/category/spa.js";
import loadDetails from "../modules/details/spa.js";
import { RouteKey } from "./routes.js";
import loadTransaction, { loadHistory } from "../modules/order/spa.js";

const renderPage = async (path: RouteKey) => {
  switch (path) {
    case "/":
      await loadChart();
      loadTransaction();
      break;
    case "/products":
      loadProducts();
      break;
    case "/categories":
      loadCategory();
      break;
    case "/history":
      await loadHistory();
      break;
    case "/details":
      loadDetails();
      break;
  }
};

export default renderPage;
