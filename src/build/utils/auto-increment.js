import { serviceView } from "../modules/base/base-services.js";
const autoIncrement = async (table) => {
    const data = await serviceView(table);
    if (!data || data.length === 0)
        return 1;
    const lastItem = data[data.length - 1];
    if (!lastItem || typeof lastItem.id !== "number") {
        return 1;
        throw new Error(`[CODEBASE FAIL] Invalid id on ${table} table`);
    }
    return lastItem.id + 1;
};
export { autoIncrement };
