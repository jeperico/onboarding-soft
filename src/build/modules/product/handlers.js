const productFormHandler = () => {
    const errors = [];
    const product = document.querySelector("#product")
        .value;
    const category = document.querySelector("#category")
        .value;
    const price = document.querySelector("#price").value;
    const amount = document.querySelector("#amount").value;
    // TODO: VALIDATE FIELDS
    console.log(product, category, price, amount);
    return {
        success: true,
        message: "Product created successfully",
        errors: null,
    };
};
export { productFormHandler };
