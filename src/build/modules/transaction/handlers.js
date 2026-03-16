const transactionFormHandler = () => {
    const errors = [];
    const product = document.querySelector("#product")
        .value;
    const amount = document.querySelector("#amount").value;
    const tax = document.querySelector("#tax").value;
    const price = document.querySelector("#price").value;
    // TODO: VALIDATE FIELDS
    console.log(product, amount, tax, price);
    return {
        success: true,
        message: "Product added successfully",
        errors: null,
    };
};
export { transactionFormHandler };
