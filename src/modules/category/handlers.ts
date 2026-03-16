import { FormHandlerResponse } from "../../interfaces/form-handler-response";

const categoryFormHandler = (): FormHandlerResponse => {
  const errors = [];
  const name = (document.querySelector("#category") as HTMLInputElement).value;
  const tax = (document.querySelector("#tax") as HTMLInputElement).value;

  // TODO: VALIDATE FIELDS
  console.log(name, tax);

  return {
    success: true,
    message: "Category created successfully",
    errors: null,
  };
};

export { categoryFormHandler };
