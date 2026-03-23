import { ErrorResponse } from "../../interfaces/error-response.js";
import {
  validateProductName,
  validateProductStock,
  validateProductPrice,
  validateProductTax,
  validateProductCategory,
} from "./validators.js";

const productHandler = async (
  name: string,
  stock: number,
  price: number,
  tax: number,
  category: number,
): Promise<ErrorResponse> => {
  const errors = [];

  const nameError = await validateProductName(name);
  if (nameError) errors.push({ field: "#name", message: nameError });

  const stockError = validateProductStock(stock);
  if (stockError) errors.push({ field: "#stock", message: stockError });

  const priceError = validateProductPrice(price);
  if (priceError) errors.push({ field: "#price", message: priceError });

  const taxError = await validateProductTax(tax, price, category);
  if (taxError) errors.push({ field: "#price", message: taxError });

  const categoryError = await validateProductCategory(category);
  if (categoryError)
    errors.push({ field: "#category", message: categoryError });

  return errors;
};

export { productHandler };
