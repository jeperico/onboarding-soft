import { serviceView } from "../modules/base/base-services.js";
const autoIncrement = async (table) => {
    const data = await serviceView(table);
    if (!data || data.length === 0)
        return 1;
    const lastItem = data[data.length - 1];
    if (!lastItem || typeof lastItem.id !== "number") {
        return 1;
    }
    return lastItem.id + 1;
};
export { autoIncrement };
