const createTransaction = async (event: SubmitEvent) => {
  // I - Environment
  event.preventDefault();

  // II - Inputs
  const payload = await transactionSerializer(event.target as HTMLFormElement);
};
