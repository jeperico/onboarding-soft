const createCategory = (event) => {
    event.preventDefault();
    alert("TESTE");
    const category = document.querySelector("#category");
    const tax = document.querySelector("#tax");
    // TODO: Validate inputs
    if (!category || !tax)
        return;
    // TODO: Handle values
    const payload = {
        id: 1,
        name: category.value,
        tax: parseInt(tax.value) || 0,
        is_active: true,
    };
    localStorage.setItem("category", JSON.stringify(payload));
};
export {};
