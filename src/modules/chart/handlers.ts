import { ErrorResponse } from "../../interfaces/error-response.js";
import {
  validateProduct,
  validateQuantity,
  validatePrice,
  validateTax,
  validateDuplicatedProduct,
} from "./validators.js";

const chartHandler = async (
  product: number,
  quantity: number,
  price: number,
  tax: number,
): Promise<{ errors: ErrorResponse; handled: boolean }> => {
  const errors = [];
  let handled = false;

  const productError = await validateProduct(product);
  if (productError) errors.push({ field: "#product", message: productError });

  const quantityError = await validateQuantity(quantity, product);
  if (quantityError)
    errors.push({ field: "#quantity", message: quantityError });

  const priceError = await validatePrice(price, product);
  if (priceError) errors.push({ field: "#price", message: priceError });

  const taxError = await validateTax(tax, product);
  if (taxError) errors.push({ field: "#tax", message: taxError });

  const duplicatedResult = await validateDuplicatedProduct(product, quantity);
  if (duplicatedResult.error)
    errors.push({ field: "#product", message: duplicatedResult.error });
  if (duplicatedResult.handled) handled = true;

  return { errors, handled };
};

export { chartHandler };
