import { loadCategory, loadDetails, loadHistory, loadProducts, loadTransactions, } from "./loads.js";
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
