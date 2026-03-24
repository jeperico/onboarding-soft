import { validateNumber, validateText } from "../base/validators.js";
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
export { validateCategoryName, validateCategoryTax };
