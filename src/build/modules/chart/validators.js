import { serviceView } from "../base/base-services.js";
import { validateNumber, validateRelation } from "../base/validators.js";
import { overwriteProduct } from "./services.js";
const validateProduct = async (product_id) => {
    return validateRelation(product_id, "products", "Product");
};
const validateQuantity = async (quantity, product_id) => {
    const max = (await serviceView("products"))?.find((el) => el.id === product_id && el.is_active);
    if (!max)
        return `This product doesn't exists`;
    return validateNumber(quantity, "Quantity", {
        min: {
            value: 1,
            label: "1",
        },
        max: {
            value: max.stock,
            label: max.stock.toString(),
        },
    });
};
const validatePrice = async (price, product_id) => {
    const product = (await serviceView("products"))?.find((el) => el.id === product_id && el.is_active);
    if (!product)
        return `This product doesn't exists`;
    if (price !== product.price)
        return "The price is incorrect";
    return null;
};
const validateTax = async (tax, product_id) => {
    const product = (await serviceView("products"))?.find((el) => el.id === product_id && el.is_active);
    if (!product)
        return `This product doesn't exists`;
    const category = (await serviceView("categories"))?.find((el) => el.id === product.category_id);
    if (!category)
        return `The product category doesn't exists`;
    if (tax !== category.tax)
        return "The tax is incorrect";
    return null;
};
const validateDuplicatedProduct = async (product_id, quantity) => {
    const chart = await serviceView("chart");
    const duplicated = chart?.find((el) => el.product_id === product_id);
    if (!chart || !duplicated)
        return { handled: false };
    const error = await overwriteProduct(duplicated, quantity, chart);
    if (error)
        return { handled: false, error };
    return { handled: true };
};
export { validateProduct, validateQuantity, validatePrice, validateTax, validateDuplicatedProduct, };
