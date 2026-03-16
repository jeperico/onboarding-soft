import { FormHandlerResponse } from "../../interfaces/form-handler-response";

const transactionFormHandler = (): FormHandlerResponse => {
  const errors = [];
  const product = (document.querySelector("#product") as HTMLSelectElement)
    .value;
  const amount = (document.querySelector("#amount") as HTMLInputElement).value;
  const tax = (document.querySelector("#tax") as HTMLInputElement).value;
  const price = (document.querySelector("#price") as HTMLInputElement).value;

  // TODO: VALIDATE FIELDS
  console.log(product, amount, tax, price);

  return {
    success: true,
    message: "Product added successfully",
    errors: null,
  };
};

export { transactionFormHandler };
