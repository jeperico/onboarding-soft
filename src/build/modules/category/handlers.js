import { validateCategoryName } from "./validators.js";
const categoryFormHandler = async () => {
    const errors = [];
    const name = document.querySelector("#category").value;
    const tax = document.querySelector("#tax").value;
    const validateName = await validateCategoryName(name);
    if (validateName)
        errors.push({ field: "#category", message: validateName });
    return {
        success: !errors.length,
        message: !errors.length
            ? "Category created successfully"
            : "Unexpected error while creating new category",
        errors: errors.length ? null : errors,
    };
};
export { categoryFormHandler };
