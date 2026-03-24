import { ICategory } from "../../interfaces/category.js";
import { IProduct } from "../../interfaces/product.js";
import { serviceView } from "../base/base-services.js";
import {
  validateText,
  validateNumber,
  validateRelation,
} from "../base/validators.js";

const validateProductName = async (name: string): Promise<string | null> => {
  return validateText<IProduct>(name, "products", "Product");
};

const validateProductCategory = async (
  category_id: number,
): Promise<string | null> => {
  return validateRelation<ICategory>(category_id, "categories", "category");
};

const validateProductStock = (stock: number): string | null => {
  return validateNumber(stock, "Stock", {
    min: {
      value: 1,
      label: "1",
    },
    max: {
      value: 999999,
      label: "999.999",
    },
  });
};

const validateProductPrice = (price: number): string | null => {
  return validateNumber(price, "Price", {
    min: {
      value: 1,
      label: "R$ 0.01",
    },
    max: {
      value: 99999999,
      label: "R$ 999.999,99",
    },
  });
};

const validateProductTax = async (
  tax: number,
  price: number,
  category_id: number,
): Promise<string | null> => {
  const category = (await serviceView<ICategory>("categories"))?.find(
    (el) => el.id === category_id,
  )?.tax;
  if (!category) return "No category found";

  const compare = parseInt(((category * price) / 100).toFixed(0));

  if (compare !== tax) return "Invalid tax value";

  return null;
};

export {
  validateProductName,
  validateProductStock,
  validateProductPrice,
  validateProductTax,
  validateProductCategory,
};
