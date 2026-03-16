const normalizeToCompare = (str) => str.replace(/\s+/g, " ").trim().toLowerCase();
const normalizeToSave = (str) => str.replace(/\s+/g, " ").trim();
export { normalizeToCompare, normalizeToSave };
