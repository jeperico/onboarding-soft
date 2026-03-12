const createCategory = (event) => {
    event.preventDefault();
    console.log("event:", event);
    const form = event.target;
    const category = form.elements.namedItem("category")
        .value;
    const tax = form.elements.namedItem("tax").value;
    const id = crypto.randomUUID();
    // // TODO: Validate inputs
    if (!category || !tax)
        return;
    // TODO:
    // // TODO: Handle values
    const payload = {
        id: id,
        name: category,
        tax: parseInt(tax) || 0,
        is_active: true,
    };
    localStorage.setItem("category", JSON.stringify(payload));
    console.log(JSON.stringify(payload));
};
document.querySelector("form")?.addEventListener("submit", createCategory);
export default createCategory;
