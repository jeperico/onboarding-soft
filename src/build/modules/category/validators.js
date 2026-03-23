import { validateNumber, validateText } from "../base/validators.js";
const validateName = async (value) => {
    return validateText(value, "categories", "Category");
};
const validateTax = (value) => {
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
