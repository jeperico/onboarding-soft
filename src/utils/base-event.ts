import initializePage from "../spa/initialize-page.js";
import { Table } from "../types/table.js";
import { baseDelete } from "./base-delete.js";

interface EventListenerOptions {
  table: Table;
  render: () => void;
  variant: "delete" | "view" | "none";
  handler?: (event: SubmitEvent) => void;
}

const baseEvent = (
  table: EventListenerOptions["table"],
  render: EventListenerOptions["render"],
  variant: EventListenerOptions["variant"],
  handler?: EventListenerOptions["handler"],
) => {
  if (handler)
    document.querySelector("form")?.addEventListener("submit", handler);

  render();

  const buttons = document.querySelectorAll<HTMLButtonElement>(
    variant === "delete" ? ".action-delete" : ".action-view",
  );

  buttons.forEach((el) => {
    el.addEventListener("click", () => {
      const id = Number(el.id);

      switch (variant) {
        case "delete":
          baseDelete(table, { id: id });
          break;
        case "view":
          initializePage("/details");
          break;
      }
    });
  });
};

export { baseEvent };
