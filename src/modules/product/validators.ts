import { ICategory } from "../../interfaces/category.js";
import { IProduct } from "../../interfaces/product.js";
import { serviceView } from "../base/base-services.js";
import {
  validateText,
  validateNumber,
  validateRelation,
} from "../base/validators.js";

const validateName = async (name: string): Promise<string | null> => {
  return validateText<IProduct>(name, "products", "Product");
};

const validateCategory = async (
  category_id: number,
): Promise<string | null> => {
  return validateRelation<ICategory>(category_id, "categories", "category");
};

const validateStock = (stock: number): string | null => {
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

const validatePrice = (price: number): string | null => {
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

const validateTax = async (
  tax: number,
  price: number,
  category_id: number,
): Promise<string | null> => {
  if (!tax) return "No tax";
  const category = (await serviceView<ICategory>("categories"))?.find(
    (el) => el.id === category_id,
  )?.tax;
  if (!category) return "No category found";

  const compare = (category * price) / 100;

  if (compare !== tax) return "Invalid tax value";

  return null;
};

export {
  validateName,
  validateStock,
  validatePrice,
  validateTax,
  validateCategory,
};
