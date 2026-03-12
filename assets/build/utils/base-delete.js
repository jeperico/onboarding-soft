import { baseView } from "./base-view";
const baseDelete = (table, options) => {
    // 1° - INPUT
    const raw = baseView(table, {
        variant: "list",
    });
    // 2° - PROCESS
    if (!raw)
        return;
    raw.map((el) => {
        if (el.id !== options.id)
            return;
        el.is_active = false;
    });
    // 3° - OUTPUT
    localStorage.setItem(table, JSON.stringify(raw));
};
export { baseDelete };
