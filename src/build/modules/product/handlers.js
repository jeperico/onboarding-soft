import { validateName, validateAmount, validatePrice, validateCategory, } from "./validators.js";
const productHandler = async (name, amount, price, category) => {
    const errors = [];
    const nameError = await validateName(name);
    if (nameError)
        errors.push({ field: "#name", message: nameError });
    const amountError = validateAmount(amount);
    if (amountError)
        errors.push({ field: "#amount", message: amountError });
    const priceError = validatePrice(price);
    if (priceError)
        errors.push({ field: "#price", message: priceError });
    const categoryError = await validateCategory(category);
    if (categoryError)
        errors.push({ field: "#category", message: categoryError });
    return errors;
};
export { productHandler };
