const formatCurrency = (value: number) => {
  const price = value / 100;
  const data = price.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });

  return data;
};

export { formatCurrency };
