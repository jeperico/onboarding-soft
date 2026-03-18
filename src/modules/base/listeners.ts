import renderPage from "../../spa/render-page.js";
import { Table } from "../../types/table.js";
import { serviceDelete, serviceRemove } from "./base-services.js";

interface EventListenerOptions {
  table: Table;
  variant: "delete" | "remove" | "view" | "none";
  render: () => void;
  handler: (event: SubmitEvent) => void;
  form?: string;
}

const formsEvents = async (
  handler: EventListenerOptions["handler"],
  form?: EventListenerOptions["form"],
) => {
  // setTimeout(() => {
  const element = document.querySelector<HTMLFormElement>(form || "form");
  console.log(element);
  if (!element) return;

  element.addEventListener("submit", handler);
  // }, 0.2 * 1000);
};

const tableEvents = async (
  table: EventListenerOptions["table"],
  variant: EventListenerOptions["variant"],
  render: EventListenerOptions["render"],
) => {
  if (render) await render();

  const buttons = document.querySelectorAll<HTMLButtonElement>(
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
