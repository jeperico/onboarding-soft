import {
  ErrorResponse,
  FormHandlerResponse,
} from "../../interfaces/form-handler-response.js";
import { validateCategoryName, validateTax } from "./validators.js";

const categoryHandler = async (): Promise<FormHandlerResponse> => {
  const errors: ErrorResponse = [];
  const name = (document.querySelector("#category") as HTMLInputElement).value;
  const tax = Number(
    Number((document.querySelector("#tax") as HTMLInputElement).value).toFixed(
      2,
    ),
  );

  const nameError = await validateCategoryName(name);
  if (nameError) errors.push({ field: "#category", message: nameError });

  const taxError = validateTax(tax);
  if (taxError) errors.push({ field: "#tax", message: taxError });

  return {
    success: !errors.length,
    message: !errors.length
      ? "Category created successfully"
      : "Unexpected error while creating new category",
    errors: errors,
  };
};

export { categoryHandler };
