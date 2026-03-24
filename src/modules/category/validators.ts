import { ICategory } from "../../interfaces/category.js";
import { validateNumber, validateText } from "../base/validators.js";
import { serviceView } from "../base/base-services.js";

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

const validateCategoryDelete = async (categoryId: number) => {
  const products = await serviceView<IProduct>("products");

  const hasProducts = products?.some(
    (p) => p.category_id === categoryId && p.is_active !== false,
  );

  if (hasProducts) {
    alert("Cannot delete category because it has associated products.");
    return false;
  }

  return true;
};

export { validateCategoryName, validateCategoryTax, validateCategoryDelete };
