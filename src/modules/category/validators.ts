import { ICategory } from "../../interfaces/category.js";
import { validateNumber, validateText } from "../base/validators.js";

const validateName = async (value: string): Promise<string | null> => {
  return validateText<ICategory>(value, "categories", "Category");
};

const validateTax = (value: number): string | null => {
  return validateNumber(value, "Tax", {
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
