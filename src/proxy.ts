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

type RouteKey = keyof typeof routes;

// BASE
const app = document.querySelector("main");

const renderContent = async (path: RouteKey) => {
  if (!app) return;

  const route = routes[path];
  if (!route) {
    app.innerHTML = "<h1>404</h1>";
    return;
  }

  const res = await fetch(route.href);
  const html = await res.text();

  app.innerHTML = html;
  document.title = route.title;
  console.log(html);
};

renderContent("/");
renderContent("/products");
renderContent("/history");
renderContent("/details");

renderContent("/categories");
