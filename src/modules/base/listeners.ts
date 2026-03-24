import renderPage from "../../spa/render-page.js";
import { RouteKey } from "../../spa/routes.js";
import { Table } from "../../types/table.js";
import { serviceDelete, serviceRemove } from "./base-services.js";

interface EventListenerOptions {
  table: Table;
  variant: "delete" | "remove" | "view" | "none";
  render: () => void;
  handler: (event: SubmitEvent) => void;
  form?: string;
  page?: RouteKey;
}

const formsEvents = async (
  handler: EventListenerOptions["handler"],
  form?: EventListenerOptions["form"],
) => {
  const element = document.querySelector<HTMLFormElement>(form || "form");
  if (!element) return;

  element.addEventListener("submit", handler);
};

const tableEvents = async (
  table: EventListenerOptions["table"],
  variant: EventListenerOptions["variant"],
  render: EventListenerOptions["render"],
  page?: EventListenerOptions["page"],
) => {
  if (render) await render();

  const buttons = document.querySelectorAll<HTMLButtonElement>(
    `.action-${variant}`,
  );

  buttons.forEach((el) => {
    el.addEventListener("click", () => {
      const id = Number(el.id);

      switch (variant) {
        case "delete":
          serviceDelete(table, id);
          if (page) renderPage(page);
          break;
        case "remove":
          serviceRemove(table, id);
          if (page) renderPage(page);
          break;
        case "view":
          renderPage("/details", id);
          break;
      }
    });
  });
};

export { formsEvents, tableEvents };
