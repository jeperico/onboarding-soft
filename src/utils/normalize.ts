const normalizeToCompare = (str: string) =>
  str.replace(/\s+/g, " ").trim().toLowerCase();

const normalizeToSave = (str: string) => str.replace(/\s+/g, " ").trim();

export { normalizeToCompare, normalizeToSave };
