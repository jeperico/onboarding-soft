// - [TYPE]: text string
// - [SIZE]: max | min
// * must accept letters, and numbers only pre followed by a letter
// * mustn't aceppt white spaces, special carachters or HTML tags
// * must be a unique field (validate white spaces and letters case)
const validateName = async (value: string): Promise<string | null> => {
  return null;
};

// - [TYPE]: numbers int
// - [SIZE]: max | min
// * must accept integers numbers
// * mustn't accept white spaces, special carachters or HTML tags
const validateStock = (value: number): string | null => {
  return null;
};

// - [TYPE]: int presented by cents
// - [SIZE]: max | min 001
// - [RegEx]: R$ x,xx
// * must accept integers (decimal with 2 decimal plates)
// * mustn't accept white spaces, special carachters or HTML tags
const validatePrice = (value: number): string | null => {
  return null;
};

// - [TYPE]: text string
// - [SIZE]: max | min
// * must accept letters, and numbers only pre followed by a letter
// * mustn't aceppt white spaces, special carachters or HTML tags
const validateCategory = async (value: number): Promise<string | null> => {
  return null;
};

export { validateName, validateStock, validatePrice, validateCategory };
