import renderPage from "../spa/render-page.js";
import { Table } from "../types/table.js";
import { baseServiceDelete, baseServiceRemove } from "./base-services.js";

interface EventListenerOptions {
  table: Table;
  render: () => void;
  variant: "delete" | "remove" | "view" | "none";
  handler?: (event: SubmitEvent) => void;
}

const baseEvent = async (
  table: EventListenerOptions["table"],
  render: EventListenerOptions["render"],
  variant: EventListenerOptions["variant"],
  handler?: EventListenerOptions["handler"],
) => {
  if (handler)
    document.querySelector("form")?.addEventListener("submit", handler);

  await render();

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
          baseServiceDelete(table, id);
          break;
        case "remove":
          baseServiceRemove(table, id);
          break;
        case "view":
          renderPage("/details");
          break;
      }
    });
  });
};

export { baseEvent };
