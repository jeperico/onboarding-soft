import { validateName, validateStock, validatePrice, validateCategory, } from "./validators.js";
const productHandler = async (name, stock, price, category) => {
    const errors = [];
    const nameError = await validateName(name);
    if (nameError)
        errors.push({ field: "#name", message: nameError });
    const stockError = validateStock(stock);
    if (stockError)
        errors.push({ field: "#stock", message: stockError });
    const priceError = validatePrice(price);
    if (priceError)
        errors.push({ field: "#price", message: priceError });
    const categoryError = await validateCategory(category);
    if (categoryError)
        errors.push({ field: "#category", message: categoryError });
    return errors;
};
export { productHandler };
