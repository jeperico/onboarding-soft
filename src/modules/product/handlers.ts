import { FormHandlerResponse } from "../../interfaces/error-response";

const productFormHandler = (): FormHandlerResponse => {
  const errors = [];
  const product = (document.querySelector("#product") as HTMLSelectElement)
    .value;
  const category = (document.querySelector("#category") as HTMLSelectElement)
    .value;
  const price = (document.querySelector("#price") as HTMLInputElement).value;
  const amount = (document.querySelector("#amount") as HTMLInputElement).value;

  // TODO: VALIDATE FIELDS
  console.log(product, category, price, amount);

  return {
    success: true,
    message: "Product created successfully",
    errors: null,
  };
};

export { productFormHandler };
