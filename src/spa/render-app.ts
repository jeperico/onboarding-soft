import renderPage from "./render-page.js";
import routes, { RouteKey } from "./routes.js";

const renderApp = async () => {
  const links = document.querySelectorAll(".proxy-route");

  links.forEach((item, index) => {
    item.addEventListener("click", () => {
      switch (index) {
        case 0:
          renderPage("/");
          break;
        case 1:
          renderPage("/products");
          break;
        case 2:
          renderPage("/categories");
          break;
        case 3:
          renderPage("/history");
          break;
        default:
          renderPage("/");
          break;
      }
    });
  });

  window.addEventListener("popstate", async () => {
    const path = location.pathname;

    if (path in routes) {
      renderPage(path as RouteKey);
    } else {
      await renderPage("/");
    }
  });

  await renderPage("/");
};

export default renderApp;
