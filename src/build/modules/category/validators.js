import { validateNumber, validateText } from "../base/validators.js";
import { serviceView } from "../base/base-services.js";
const validateCategoryName = async (name) => {
    return validateText(name, "categories", "Category");
};
const validateCategoryTax = (tax) => {
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
const validateCategoryDelete = async (categoryId) => {
    const products = await serviceView("products");
    const hasProducts = products?.some((p) => p.category_id === categoryId && p.is_active !== false);
    if (hasProducts) {
        alert("Cannot delete category because it has associated products.");
        return false;
    }
    return true;
};
export { validateCategoryName, validateCategoryTax, validateCategoryDelete };
