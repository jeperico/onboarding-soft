import { ICategory } from "../../interfaces/category.js";
import { IProduct } from "../../interfaces/product.js";
import {
  baseValidateString,
  baseValidateNumber,
  baseValidateRelation,
} from "../base/validators.js";

const validateName = async (value: string): Promise<string | null> => {
  return baseValidateString<IProduct>(value, "products", "Product");
};

const validateCategory = async (value: number): Promise<string | null> => {
  return baseValidateRelation<ICategory>(value, "categories", "category");
};

const validateStock = (value: number): string | null => {
  return baseValidateNumber(value, "Stock", {
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

const validatePrice = (value: number): string | null => {
  return baseValidateNumber(value, "Price", {
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

export { validateName, validateStock, validatePrice, validateCategory };
