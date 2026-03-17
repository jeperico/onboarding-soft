import { baseValidateNumber, baseValidateString } from "../base/validators.js";
const validateName = async (value) => {
    return baseValidateString(value, "categories", "Category");
};
const validateTax = (value) => {
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
