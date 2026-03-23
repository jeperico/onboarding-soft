import { validateNumber, validateText } from "../base/validators.js";
const validateCategoryName = async (value) => {
    return validateText(value, "categories", "Category");
};
const validateCategoryTax = (value) => {
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
export { validateCategoryName, validateCategoryTax };
