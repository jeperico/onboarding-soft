import { loadCategory, loadDetails, loadHistory, loadProducts, loadTransactions, } from "../services/events/load.js";
const renderPage = (path) => {
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
