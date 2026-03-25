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
    const category = (await serviceView("categories"))?.find((el) => el.id === category_id)?.tax;
    if (category === null || category === undefined)
        return "No category found";
    const compare = parseInt(((category * price) / 100).toFixed(0));
    if (compare !== tax)
        return "Invalid tax value";
    return null;
};
const validateProductDelete = async (productId) => {
    const charts = await serviceView("chart");
    const hasChart = charts?.some((c) => c.product_id === productId);
    if (hasChart) {
        alert("Cannot delete product because it is used in chart.");
        return false;
    }
    return true;
};
export { validateProductName, validateProductStock, validateProductPrice, validateProductTax, validateProductCategory, validateProductDelete, };
