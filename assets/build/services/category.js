const createCategory = (event) => {
    // ENVIRONMENT
    event.preventDefault();
    console.log("event:", event);
    // INPUT
    const id = crypto.randomUUID();
    const form = event.target;
    const category = form.elements.namedItem("category")
        .value;
    const tax = parseInt(form.elements.namedItem("tax").value);
    // PROCESS
    if (!category || !tax)
        return;
    const payload = {
        id: id,
        name: category,
        tax: tax,
        is_active: true,
    };
    // OUTPUT
    localStorage.setItem("category", JSON.stringify(payload));
};
document.querySelector("form")?.addEventListener("submit", createCategory);
export default createCategory;
