import { baseServiceView } from "../../utils/base-services.js";
import { normalizeToCompare, normalizeToSave } from "../../utils/normalize.js";
const validateCategoryName = async (raw) => {
    const value = normalizeToSave(raw);
    // must accept letters, and numbers only pre followed by a letter
    // mustn't aceppt white spaces, special carachters or HTML tags
    const regex = /^[A-Za-z][A-Za-z0-9]*(?: [A-Za-z0-9]+)*$/;
    if (!regex.test(value))
        return "Category must start with a letter and contain only letters, numbers, and single spaces between words.";
    // max 100 | min 2
    if (value.length > 100)
        return "Category name cannot exceed 100 characters.";
    if (value.length < 3)
        return "Category name must contain at least 2 characters.";
    // must be a unique field (validate white spaces and letters case)
    const data = await baseServiceView("categories");
    if (data) {
        const exists = data.find((el) => normalizeToCompare(el.name) === normalizeToCompare(value));
        if (exists)
            return "A category with this name already exists.";
    }
    return null;
};
export { validateCategoryName };
