import {
  ErrorResponse,
  FormHandlerResponse,
} from "../../interfaces/form-handler-response.js";
import { validateCategoryName } from "./validators.js";

const categoryFormHandler = async (): Promise<FormHandlerResponse> => {
  const errors: ErrorResponse = [];
  const name = (document.querySelector("#category") as HTMLInputElement).value;
  const tax = (document.querySelector("#tax") as HTMLInputElement).value;

  const validateName = await validateCategoryName(name);
  if (validateName) errors.push({ field: "#category", message: validateName });

  return {
    success: !errors.length,
    message: !errors.length
      ? "Category created successfully"
      : "Unexpected error while creating new category",
    errors: errors.length ? null : errors,
  };
};

export { categoryFormHandler };
