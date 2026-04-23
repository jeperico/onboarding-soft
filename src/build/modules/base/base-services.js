const serviceView = async (endpoint) => {
    const response = localStorage.getItem(endpoint);
    if (!response)
        return null;
    return JSON.parse(response);
};
const serviceDelete = async (endpoint, id, beforeDelete) => {
    const confirm = window.confirm("Are you sure you want to delete this item?");
    if (!confirm)
        return;
    if (beforeDelete) {
        const canDelete = await beforeDelete(id);
        if (!canDelete)
            return;
    }
    const data = await serviceView(endpoint);
    if (!data)
        return null;
    const hasIsActive = data.some((item) => "is_active" in item);
    let updatedData = [];
    if (hasIsActive) {
        updatedData = data.map((item) => item.id === id ? { ...item, is_active: false } : item);
    }
    else {
        updatedData = data.filter((item) => item.id !== id);
    }
    const stillExists = updatedData.find((item) => item.id === id);
    if (!hasIsActive && stillExists) {
        alert("Error removing item.");
        return;
    }
    localStorage.setItem(endpoint, JSON.stringify(updatedData));
};
export { serviceView, serviceDelete };
