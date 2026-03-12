const createCategory = (event) => {
    event.preventDefault();
    console.log("event:", event);
    const form = event.target;
    const category = form.elements.namedItem("category")
        .value;
    const tax = form.elements.namedItem("tax").value;
    // // TODO: Validate inputs
    if (!category || !tax)
        return;
    // // TODO: Handle values
    const payload = {
        id: 1,
        name: category,
        tax: parseInt(tax) || 0,
        is_active: true,
    };
    localStorage.setItem("category", JSON.stringify(payload));
};
document.querySelector("form")?.addEventListener("submit", createCategory);
export default createCategory;
