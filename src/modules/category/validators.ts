import { ICategory } from "../../interfaces/category.js";
import { baseValidateNumber, baseValidateString } from "../base/validators.js";

const validateName = async (value: string): Promise<string | null> => {
  return baseValidateString<ICategory>(value, "categories", "Category");
};

const validateTax = (value: number): string | null => {
  return baseValidateNumber(value, "Tax", {
    min: {
      value: 0.01,
      label: "0.01%",
    },
    max: {
      value: 100,
      label: "100%",
    },
  });
};

export { validateName, validateTax };
