import { baseDelete } from "../utils/base-delete.js";

interface EventListenerOptions {
  table: string;
  handler: (event: SubmitEvent) => void;
  render: () => void;
}

const baseEvent = (
  table: EventListenerOptions["table"],
  handler: EventListenerOptions["handler"],
  render: EventListenerOptions["render"],
) => {
  document.querySelector("form")?.addEventListener("submit", handler);

  document.addEventListener("DOMContentLoaded", () => {
    render();

    const buttons =
      document.querySelectorAll<HTMLButtonElement>(".action-delete");
    buttons.forEach((el) => {
      el.addEventListener("click", () => {
        const id = el.id;
        baseDelete(table, { id: id });
      });
    });
  });
};

export { baseEvent };
