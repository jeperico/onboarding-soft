import loadSPA from "./services/events/spa.js";
import { loadTransactions, loadProducts, loadCategory, loadHistory, loadDetails, } from "./services/events/load.js";
import routes from "./types/route.js";
const renderContent = async (path) => {
    const app = document.querySelector("main");
    if (!app)
        return;
    const route = routes[path];
    if (!route) {
        app.innerHTML = "<h1>404</h1>";
        return;
    }
    const res = await fetch(route.href);
    const html = await res.text();
    app.innerHTML = html;
    document.title = route.title;
    initializePage(path);
};
const initializePage = (path) => {
    console.log(path, "- initializing... ");
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
loadSPA();
export { renderContent };
