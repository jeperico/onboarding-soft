import { ErrorResponse } from "../../interfaces/error-response.js";
import { validateCategoryName, validateCategoryTax } from "./validators.js";

const categoryHandler = async (
  name: string,
  tax: number,
): Promise<ErrorResponse> => {
  const errors = [];

  const nameError = await validateCategoryName(name);
  if (nameError) errors.push({ field: "#name", message: nameError });

  const taxError = validateCategoryTax(tax);
  if (taxError) errors.push({ field: "#tax", message: taxError });

  return errors;
};

export { categoryHandler };
