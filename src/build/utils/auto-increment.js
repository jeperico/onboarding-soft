import { serviceView } from "../modules/base/base-services.js";
const autoIncrement = async (table) => {
    const data = await serviceView(table);
    if (!data || data.length === 0)
        return 1;
    const lastActive = data
        .filter((item) => item.is_active)
        .sort((a, b) => b.id - a.id)[0];
    if (!lastActive || typeof lastActive.id !== "number") {
        return 1;
    }
    return lastActive.id + 1;
};
export { autoIncrement };
