"use strict";
// ROUTES
const routes = {
    "/": {
        title: "Home",
        href: "/src/app/home.html",
    },
    "/products": {
        title: "Products",
        href: "/src/app/products.html",
    },
    "/categories": {
        title: "Categories",
        href: "/src/app/categories.html",
    },
    "/history": {
        title: "History",
        href: "/src/app/history.html",
    },
    "/details": {
        title: "Details",
        href: "/src/app/details.html",
    },
};
// BASE
const app = document.querySelector("main");
const renderContent = async (path) => {
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
renderContent("/");
const links = document.querySelectorAll(".proxy-route");
links.forEach((item, index) => {
    item.addEventListener("click", () => {
        switch (index) {
            case 0:
                renderContent("/");
                break;
            case 1:
                renderContent("/products");
                break;
            case 2:
                renderContent("/categories");
                break;
            case 3:
                renderContent("/history");
                break;
            default:
                renderContent("/");
                break;
        }
    });
});
