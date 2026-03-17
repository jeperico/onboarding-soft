const calculateTotal = (price: number, tax: number, quantity: number) => {
  const taxValue = (price * tax * quantity) / 100;
  console.log(taxValue, price, tax, quantity);
  return quantity * price + taxValue;
};

export { calculateTotal };
