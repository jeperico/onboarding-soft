import renderPage from "../spa/render-page.js";
import { serviceDelete, serviceRemove } from "./base-services.js";
const formsEvents = async (handler) => {
  document.querySelector("form")?.addEventListener("submit", handler);
};
const tableEvents = async (table, variant, render) => {
  if (render) await render();
  const buttons = document.querySelectorAll(
    variant === "delete" || variant === "remove"
      ? ".action-delete"
      : ".action-view",
  );
  buttons.forEach((el) => {
    el.addEventListener("click", () => {
      const id = Number(el.id);
      switch (variant) {
        case "delete":
          serviceDelete(table, id);
          break;
        case "remove":
          serviceRemove(table, id);
          break;
        case "view":
          renderPage("/details");
          break;
      }
    });
  });
};
export { formsEvents, tableEvents };
