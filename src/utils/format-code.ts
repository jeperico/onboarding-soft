const formatCode = (index: number): string => {
  return String(index + 1).padStart(3, "0");
};

export { formatCode };
