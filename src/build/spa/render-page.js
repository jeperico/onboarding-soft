import loadTransaction, { loadHistory, loadDetails, } from "../modules/order/spa.js";
import loadChart from "../modules/chart/spa.js";
import loadProducts from "../modules/product/spa.js";
import loadCategory from "../modules/category/spa.js";
const renderPage = async (path, id) => {
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
            if (!id) {
                loadHistory();
                break;
            }
            loadDetails(id);
            break;
    }
};
export default renderPage;
