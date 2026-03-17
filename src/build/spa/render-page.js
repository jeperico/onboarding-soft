import loadChart from "../modules/chart/spa.js";
import loadProducts from "../modules/product/spa.js";
import loadCategory from "../modules/category/spa.js";
import loadHistory from "../modules/history/spa.js";
import loadDetails from "../modules/details/spa.js";
const renderPage = (path) => {
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
