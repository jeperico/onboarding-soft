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
