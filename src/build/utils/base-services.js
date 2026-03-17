const baseServiceView = async (endpoint) => {
    const response = localStorage.getItem(endpoint);
    if (!response)
        return null;
    return JSON.parse(response);
};
const baseServiceDelete = async (endpoint, id) => {
    const response = (await baseServiceView(endpoint))?.map((el) => {
        if (el.id === id)
            el.is_active = false;
    });
    if (!response)
        return null;
    localStorage.setItem(endpoint, JSON.stringify(response));
    window.location.reload();
};
const baseServiceRemove = async (endpoint, id) => {
    const response = (await baseServiceView(endpoint))?.filter((el) => {
        el.id !== id;
    });
    if (!response)
        return null;
    localStorage.setItem(endpoint, JSON.stringify(response));
    window.location.reload();
};
export { baseServiceView, baseServiceDelete, baseServiceRemove };
