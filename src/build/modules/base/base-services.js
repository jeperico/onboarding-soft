const serviceView = async (endpoint) => {
    const response = localStorage.getItem(endpoint);
    if (!response)
        return null;
    return JSON.parse(response);
};
const serviceDelete = async (endpoint, id) => {
    const response = await serviceView(endpoint);
    const payload = await response?.map((el) => {
        if (el.id === id)
            el.is_active = false;
    });
    if (!payload)
        return null;
    localStorage.setItem(endpoint, JSON.stringify(response));
    window.location.reload();
};
const serviceRemove = async (endpoint, id) => {
    const response = await serviceView(endpoint);
    if (!response)
        return null;
    const data = response.filter((el) => el.id !== id);
    if (data.length !== response.length - 1)
        return null;
    localStorage.setItem(endpoint, JSON.stringify(data));
    window.location.reload();
};
export { serviceView, serviceDelete, serviceRemove };
