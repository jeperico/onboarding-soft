import { serviceView } from "./base-services.js";
const validateText = async (value, table, name) => {
    const regex = /^\p{L}[\p{L}\p{N}]*(?: [\p{L}\p{N}]+)*$/u;
    if (!regex.test(value))
        return `${name} name must start with a letter and contain only letters and numbers.`;
    if (value.length > 100)
        return `${name} name cannot exceed 100 characters.`;
    if (value.length < 3)
        return `${name} name must contain at least 2 characters.`;
    const data = (await serviceView(table))?.filter((e) => e.is_active);
    if (data) {
        const exists = data.find((el) => el.name.toLowerCase() === value.toLowerCase());
        if (exists)
            return `A ${name.toLowerCase()} with this name already exists.`;
    }
    return null;
};
const validateNumber = (value, name, limits) => {
    if (typeof value !== "number" || Number.isNaN(value))
        return `${name} must be a valid number.`;
    if (value < limits.min.value)
        return `${name} must be at least ${limits.min.label}.`;
    if (value > limits.max.value)
        return `${name} cannot exceed ${limits.max.label}.`;
    return null;
};
const validateRelation = async (value, table, name) => {
    const data = (await serviceView(table))?.filter((e) => e.is_active);
    if (data) {
        const exist = data.find((el) => el.id === value);
        if (!exist)
            return `This ${name} doesn't exists.`;
    }
    return null;
};
export { validateText, validateNumber, validateRelation };
