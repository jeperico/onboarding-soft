import { autoIncrement } from "../../utils/auto-increment.js";
import { serviceView } from "../base/base-services.js";
import { formatCurrency } from "../../utils/format-currency.js";
const ProductCreateSerializer = async (form) => {
    const id = await autoIncrement("products");
    const name = form.elements.namedItem("name");
    const stock = form.elements.namedItem("stock");
    const category = form.elements.namedItem("category");
    const priceField = form.elements.namedItem("price");
    const price = parseInt((parseFloat(priceField.value) * 100).toFixed(0));
    const percentTax = (await serviceView("categories"))?.find((el) => el.id === parseInt(category.value))?.tax;
    const tax = ((percentTax || 0) * price) / 100;
    const payload = {
        id: id,
        name: name.value.replace(/\s+/g, " ").trim(),
        stock: parseInt(stock.value),
        price: price,
        tax: tax,
        category_id: parseInt(category.value),
        is_active: true,
    };
    return payload;
};
const ProductViewSerializer = async () => {
    const data = (await serviceView("products"))?.filter((el) => el.is_active);
    if (!data)
        return null;
    const payload = [];
    data.map(async (el) => {
        const category = (await serviceView("categories"))?.find((e) => e.id === el.category_id)?.name;
        payload.push({
            id: el.id.toString(),
            name: el.name.toString(),
            stock: el.stock.toString(),
            price: formatCurrency(el.price),
            category: category || "No data!",
        });
    });
    return payload;
};
export { ProductCreateSerializer, ProductViewSerializer };
