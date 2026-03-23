import { autoIncrement } from "../../utils/auto-increment.js";
import { serviceView } from "../base/base-services.js";
const CategoryCreateSerializer = async (form) => {
    const id = await autoIncrement("categories");
    const name = form.elements.namedItem("name");
    const tax = form.elements.namedItem("tax");
    const payload = {
        id: id,
        name: name.value.replace(/\s+/g, " ").trim(),
        tax: parseFloat(parseFloat(tax.value).toFixed(2)),
        is_active: true,
    };
    return payload;
};
const CategoryViewSerializer = async () => {
    const data = (await serviceView("categories"))?.filter((el) => el.is_active);
    if (!data)
        return null;
    const payload = [];
    data.map((el) => {
        payload.push({
            id: el.id.toString(),
            name: el.name,
            tax: el.tax.toString().concat("%"),
        });
    });
    return payload;
};
export { CategoryCreateSerializer, CategoryViewSerializer };
