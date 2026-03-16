const categoryFormHandler = () => {
    const errors = [];
    const name = document.querySelector("#category").value;
    const tax = document.querySelector("#tax").value;
    // TODO: VALIDATE FIELDS
    console.log(name, tax);
    return {
        success: true,
        message: "Category create successfully",
        errors: null,
    };
};
export { categoryFormHandler };
