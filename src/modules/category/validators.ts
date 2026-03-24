import { ICategory } from "../../interfaces/category.js";
import { validateNumber, validateText } from "../base/validators.js";

const validateCategoryName = async (name: string): Promise<string | null> => {
  return validateText<ICategory>(name, "categories", "Category");
};

const validateCategoryTax = (tax: number): string | null => {
  return validateNumber(tax, "Tax", {
    min: {
      value: 0,
      label: "0%",
    },
    max: {
      value: 100,
      label: "100%",
    },
  });
};

export { validateCategoryName, validateCategoryTax };
