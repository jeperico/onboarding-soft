/**
 * Retrieves records from LocalStorage.
 *
 * @param endpoint - LocalStorage table key.
 * @returns Stored data or null if not found.
 */
const baseServiceView = async (endpoint) => {
    // 1° - INPUT
    const raw = localStorage.getItem(endpoint);
    // 2° - PROCESS
    if (!raw)
        return null;
    const data = JSON.parse(raw);
    // 3° - OUTPUT
    return data;
};
/**
 * Soft deletes a record by setting `is_active` to false.
 *
 * @param endpoint - LocalStorage table key.
 * @param id - Item to be deleted.
 * @returns void
 */
const baseServiceDelete = async (endpoint, id) => {
    // 1° - INPUT
    const response = await baseServiceView(endpoint);
    // 2° - PROCESS
    if (!response)
        return null;
    response.map((el) => {
        if (el.id != id)
            return;
        el.is_active = false;
    });
    // 3° - OUTPUT
    localStorage.setItem(endpoint, JSON.stringify(response));
};
export { baseServiceView, baseServiceDelete };
