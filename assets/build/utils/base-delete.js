import { baseView } from "./base-view.js";
/**
 * Soft deletes a record by setting `is_active` to false.
 *
 * @param table - LocalStorage table key.
 * @param options - Delete configuration.
 * @returns void
 */
const baseDelete = (table, options) => {
    console.log(options.id);
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
    window.location.reload();
};
export { baseDelete };
