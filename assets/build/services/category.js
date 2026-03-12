const createCategory = (event) => {
    // 1° - ENVIRONMENT
    event.preventDefault();
    console.log("event:", event);
    // 2° - INPUT
    const id = crypto.randomUUID();
    const form = event.target;
    const category = form.elements.namedItem("category")
        .value;
    const tax = parseInt(form.elements.namedItem("tax").value);
    // 3° - PROCESS
    if (!category || !tax)
        return;
    const payload = {
        id: id,
        name: category,
        tax: tax,
        is_active: true,
    };
    // 4° - OUTPUT
    localStorage.setItem("category", JSON.stringify(payload));
};
document.querySelector("form")?.addEventListener("submit", createCategory);
export default createCategory;
