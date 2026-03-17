import { validateProduct, validateQuantity, validatePrice, validateTax, } from "./validators.js";
const chartHandler = async (product, quantity, price, tax) => {
    const errors = [];
    const productError = await validateProduct(product);
    if (productError)
        errors.push({ field: "#product", message: productError });
    const quantityError = await validateQuantity(quantity, product);
    if (quantityError)
        errors.push({ field: "#quantity", message: quantityError });
    const priceError = await validatePrice(price, quantity, product);
    if (priceError)
        errors.push({ field: "#price", message: priceError });
    const taxError = await validateTax(tax, product);
    if (taxError)
        errors.push({ field: "#tax", message: taxError });
    return errors;
};
export { chartHandler };
