import { ErrorResponse } from "../../interfaces/error-response.js";
import {
  validateChartName,
  validateChartQuantity,
  validateChartPrice,
  validateChartTax,
  validateChartDuplicated,
} from "./validators.js";

const chartHandler = async (
  product: number,
  quantity: number,
  price: number,
  tax: number,
): Promise<{ errors: ErrorResponse; handled: boolean }> => {
  const errors = [];
  let handled = false;

  const productError = await validateChartName(product);
  if (productError) errors.push({ field: "#product", message: productError });

  const quantityError = await validateChartQuantity(quantity, product);
  if (quantityError)
    errors.push({ field: "#quantity", message: quantityError });

  const priceError = await validateChartPrice(price, product);
  if (priceError) errors.push({ field: "#price", message: priceError });

  const taxError = await validateChartTax(tax, product);
  if (taxError) errors.push({ field: "#tax", message: taxError });

  const duplicatedResult = await validateChartDuplicated(product, quantity);
  if (duplicatedResult.error)
    errors.push({ field: "#product", message: duplicatedResult.error });
  if (duplicatedResult.handled) handled = true;

  return { errors, handled };
};

export { chartHandler };
