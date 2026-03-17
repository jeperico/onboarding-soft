const calculateTotal = (price: number, tax: number, quantity: number) => {
  const taxValue = (price * tax * quantity) / 100;
  const total = quantity * price + taxValue;

  return total;
};

export { calculateTotal };
