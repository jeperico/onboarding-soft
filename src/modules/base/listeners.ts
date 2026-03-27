import renderPage from "../../spa/render-page.js";
import { RouteKey } from "../../spa/routes.js";
import { Table } from "../../types/table.js";
import { validateCategoryDelete } from "../category/validators.js";
import { validateProductDelete } from "../product/validators.js";
import { serviceDelete } from "./base-services.js";

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

  element.addEventListener("submit", (e: SubmitEvent) => {
    const finishButton = element.querySelector<HTMLButtonElement>("#finish");
    if (!finishButton) {
      handler(e);
      return;
    }

    const confirmFinish = window.confirm("Are you sure you want to finish?");
    if (confirmFinish) handler(e);
    e.preventDefault();
  });

  confirmCancel(element);
};

const confirmCancel = (element: HTMLFormElement) => {
  const cancelButton = element.querySelector<HTMLButtonElement>("#no-submit");
  if (!cancelButton) return;

  cancelButton.addEventListener("click", (e) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel?");
    if (!confirmCancel) return;

    e.preventDefault();
    const form = document.querySelector<HTMLFormElement>("form");
    form?.reset();

    localStorage.removeItem("chart");
    renderPage("/");
  });
};

const tableEvents = async <
  IValidate extends { id: number; is_active?: boolean },
>(
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
    el.addEventListener("click", async () => {
      const id = Number(el.id);

      let validator: ((id: number) => Promise<boolean>) | undefined;
      if (table === "categories") validator = validateCategoryDelete;
      if (table === "products") validator = validateProductDelete;

      switch (variant) {
        case "delete":
        case "remove":
          await serviceDelete<IValidate>(table, id, validator);
          if (page) renderPage(page);
          break;

        case "view":
          renderPage("/details", id);
          break;
      }
    });
  });
};

const inputMutations = () => {
  const inputs = document.querySelectorAll<HTMLInputElement>("input");

  inputs.forEach((input) => {
    const originalType = input.type;

    const config = {
      attributes: true,
      childList: false,
      subtree: false,
    };

    const callback: MutationCallback = (mutationsList) => {
      for (const mutation of mutationsList) {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "type"
        ) {
          observer.disconnect();

          const target = mutation.target as HTMLInputElement;
          target.type = originalType;
          target.value = "";

          observer.observe(target, config);
        }
      }
    };

    const observer = new MutationObserver(callback);
    observer.observe(input, config);
  });
};

export { formsEvents, tableEvents, inputMutations };
