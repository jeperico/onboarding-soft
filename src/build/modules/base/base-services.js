const serviceView = async (endpoint) => {
    const response = localStorage.getItem(endpoint);
    if (!response)
        return null;
    return JSON.parse(response);
};
const serviceDelete = async (endpoint, id) => {
    const response = (await serviceView(endpoint))?.map((el) => {
        if (el.id === id)
            el.is_active = false;
    });
    if (!response)
        return null;
    localStorage.setItem(endpoint, JSON.stringify(response));
    window.location.reload();
};
const serviceRemove = async (endpoint, id) => {
    const response = (await serviceView(endpoint))?.filter((el) => {
        el.id !== id;
    });
    if (!response)
        return null;
    localStorage.setItem(endpoint, JSON.stringify(response));
    window.location.reload();
};
export { serviceView, serviceDelete, serviceRemove };
