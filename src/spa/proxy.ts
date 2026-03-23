import renderApp from "./render-app.js";
import routes, { RouteKey } from "./routes.js";
import { FEATURE_FLAG_ENABLE_ROUTES } from "../feature-flags.js";

type QueryParams = Record<string, string>;

const renderContent = async (path: RouteKey, params?: QueryParams) => {
  const app = await document.querySelector("main");
  if (!app) return;

  const route = routes[path];
  if (!route) {
    app.innerHTML = "<h1>404</h1>";
    return;
  }

  const searchParams = new URLSearchParams(params).toString();
  const url = searchParams ? `${path}?${searchParams}` : path;

  const res = await fetch(route.href, {
    cache: "no-store",
  });
  const html = await res.text();

  app.innerHTML = html;
  document.title = route.title;
  if (FEATURE_FLAG_ENABLE_ROUTES) history.pushState({}, "", url);
  else if (path !== "/details") history.pushState({}, "", "/");
  else if (searchParams) history.pushState({}, "", `?${searchParams}`);
};

// RENDER HEADER
await renderApp();

export { renderContent };
