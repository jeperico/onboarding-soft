import renderApp from "./render-app.js";
import routes from "./routes.js";
import { FEATURE_FLAG_ENABLE_ROUTES, FEATURE_FLAG_ENABLE_SERVER, } from "../feature-flags.js";
const renderContent = async (path, params) => {
    const app = await document.querySelector("main");
    if (!app)
        return;
    const route = routes[path];
    if (!route) {
        app.innerHTML = "<h1>404</h1>";
        return;
    }
    const searchParams = new URLSearchParams(params).toString();
    const url = searchParams ? `${path}?${searchParams}` : path;
    let html = "";
    if (FEATURE_FLAG_ENABLE_SERVER) {
        const res = await fetch(route.href, {
            cache: "no-store",
        });
        html = await res.text();
    }
    else {
        html = route.content;
    }
    app.innerHTML = html;
    document.title = route.title;
    if (FEATURE_FLAG_ENABLE_ROUTES)
        history.pushState({}, "", url);
    else if (FEATURE_FLAG_ENABLE_SERVER && path !== "/details")
        history.pushState({}, "", "/");
    else if (searchParams)
        history.pushState({}, "", `?${searchParams}`);
};
// RENDER HEADER
window.addEventListener("DOMContentLoaded", () => {
    renderApp();
});
export { renderContent };
