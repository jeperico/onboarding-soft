import { validateName, validateTax } from "./validators.js";
const categoryHandler = async (name, tax) => {
    const errors = [];
    const nameError = await validateName(name);
    if (nameError)
        errors.push({ field: "#name", message: nameError });
    const taxError = validateTax(tax);
    if (taxError)
        errors.push({ field: "#tax", message: taxError });
    return errors;
};
export { categoryHandler };
