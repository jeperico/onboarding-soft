import { serviceView } from "../base/base-services.js";
import { validateText, validateNumber, validateRelation, } from "../base/validators.js";
const validateProductName = async (name) => {
    return validateText(name, "products", "Product");
};
const validateProductCategory = async (category_id) => {
    return validateRelation(category_id, "categories", "category");
};
const validateProductStock = (stock) => {
    return validateNumber(stock, "Stock", {
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
const validateProductPrice = (price) => {
    return validateNumber(price, "Price", {
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
const validateProductTax = async (tax, price, category_id) => {
    if (!tax)
        return "No tax";
    const category = (await serviceView("categories"))?.find((el) => el.id === category_id)?.tax;
    if (!category)
        return "No category found";
    const compare = parseInt((category * (price / 100)).toFixed(0));
    if (compare !== tax)
        return "Invalid tax value";
    return null;
};
export { validateProductName, validateProductStock, validateProductPrice, validateProductTax, validateProductCategory, };
