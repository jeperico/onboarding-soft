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
export type RouteKey = keyof typeof routes;

export default routes;
