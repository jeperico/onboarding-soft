const calculateTotal = (price, tax, quantity) => {
    const taxValue = (price * tax * quantity) / 100;
    const total = quantity * price + taxValue;
    return total;
};
export { calculateTotal };
