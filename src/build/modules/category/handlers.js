import { validateCategoryName, validateTax } from "./validators.js";
const categoryHandler = async () => {
    const errors = [];
    const name = document.querySelector("#category").value;
    const tax = Number(Number(document.querySelector("#tax").value).toFixed(2));
    const nameError = await validateCategoryName(name);
    if (nameError)
        errors.push({ field: "#category", message: nameError });
    const taxError = validateTax(tax);
    if (taxError)
        errors.push({ field: "#tax", message: taxError });
    return {
        success: !errors.length,
        message: !errors.length
            ? "Category created successfully"
            : "Unexpected error while creating new category",
        errors: errors,
    };
};
export { categoryHandler };
