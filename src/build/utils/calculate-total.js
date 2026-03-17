const calculateTotal = (price, tax, quantity) => {
    const taxValue = (price * tax * quantity) / 100;
    console.log(taxValue, price, tax, quantity);
    return quantity * price + taxValue;
};
export { calculateTotal };
