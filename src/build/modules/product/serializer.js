import { autoIncrement } from "../../utils/auto-increment.js";
import { serviceView } from "../base/base-services.js";
import { formatCurrency } from "../../utils/format-currency.js";
const productSerializer = async (form) => {
    const id = await autoIncrement("products");
    const name = form.elements.namedItem("name");
    const stock = form.elements.namedItem("stock");
    const price = form.elements.namedItem("price");
    const category = form.elements.namedItem("category");
    const payload = {
        id: id,
        name: name.value.replace(/\s+/g, " ").trim(),
        stock: parseInt(stock.value),
        price: parseInt((parseFloat(price.value) * 100).toFixed(0)),
        category_id: parseInt(category.value),
        is_active: true,
    };
    return payload;
};
const productTableSerializer = async () => {
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
export { productSerializer, productTableSerializer };
