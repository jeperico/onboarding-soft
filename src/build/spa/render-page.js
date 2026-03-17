import { loadCategory, loadDetails, loadHistory, loadProducts, loadChart, } from "../services/loads.js";
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
