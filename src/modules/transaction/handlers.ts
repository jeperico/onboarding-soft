import { ErrorResponse } from "../../interfaces/error-response.js";
import {
  validateProduct,
  validateQuantity,
  validatePrice,
} from "./validators.js";

const transactionHandler = async (
  product: number,
  quantity: number,
  price: number,
): Promise<ErrorResponse> => {
  const errors = [];

  const productError = await validateProduct(product);
  if (productError) errors.push({ field: "#product", message: productError });

  const quantityError = await validateQuantity(quantity);
  if (quantityError)
    errors.push({ field: "#quantity", message: quantityError });

  const priceError = await validatePrice(price);
  if (priceError) errors.push({ field: "#price", message: priceError });

  return errors;
};

export { transactionHandler };
