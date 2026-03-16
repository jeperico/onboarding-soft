import { ICategory } from "../../interfaces/category.js";
import { baseServiceView } from "../../utils/base-services.js";

const validateName = async (value: string): Promise<string | null> => {
  // must accept letters, and numbers only pre followed by a letter
  // mustn't aceppt white spaces, special carachters or HTML tags
  const regex = /^[A-Za-z][A-Za-z0-9]*(?: [A-Za-z0-9]+)*$/;
  if (!regex.test(value))
    return "Category must start with a letter and contain only letters and numbers.";

  // max 100 | min 2
  if (value.length > 100) return "Category name cannot exceed 100 characters.";
  if (value.length < 3)
    return "Category name must contain at least 2 characters.";

  // must be a unique field (validate white spaces and letters case)
  const data = (await baseServiceView<ICategory>("categories"))?.filter(
    (e) => e.is_active,
  );
  if (data) {
    const exists = data.find(
      (el) => el.name.toLowerCase() === value.toLowerCase(),
    );
    if (exists) return "A category with this name already exists.";
  }

  return null;
};

const validateTax = (value: number): string | null => {
  // must accept integers or decimal with 2 decimal plates
  // mustn't aceppt white spaces, special carachters or HTML tags
  if (typeof value !== "number" || Number.isNaN(value))
    return "Tax must be a valid number.";

  // max 100 | min 0.01
  if (value < 0.01) return "Tax must be at least 0.01%.";
  if (value > 100) return "Tax cannot exceed 100%.";

  return null;
};

export { validateName, validateTax };
