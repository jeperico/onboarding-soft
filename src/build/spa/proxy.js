import renderApp from "./render-app.js";
import routes from "./routes.js";
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
};
// RENDER HEADER
renderApp();
export { renderContent };
