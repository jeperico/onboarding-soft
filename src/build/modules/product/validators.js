import { validateText, validateNumber, validateRelation, } from "../base/validators.js";
const validateName = async (value) => {
    return validateText(value, "products", "Product");
};
const validateCategory = async (value) => {
    return validateRelation(value, "categories", "category");
};
const validateStock = (value) => {
    return validateNumber(value, "Stock", {
        min: {
            value: 1,
            label: "1",
        },
        max: {
            value: 999999,
            label: "999.999",
        },
    });
};
const validatePrice = (value) => {
    return validateNumber(value, "Price", {
        min: {
            value: 1,
            label: "R$ 0.01",
        },
        max: {
            value: 99999999,
            label: "R$ 999.999,99",
        },
    });
};
export { validateName, validateStock, validatePrice, validateCategory };
