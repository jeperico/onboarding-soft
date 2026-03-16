/**
 * Retrieves records from LocalStorage.
 *
 * @param table - LocalStorage table key.
 * @param options - View configuration.
 * @returns Stored data or empty array if not found.
 */
const baseView = (table, options) => {
    // 1° - INPUT
    const raw = localStorage.getItem(table);
    // 2° - PROCESS
    if (!raw)
        return [];
    const data = JSON.parse(raw);
    // 3° - OUTPUT
    if (options.variant === "single") {
        return data;
    }
    return data;
};
export { baseView };
