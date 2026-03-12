/**
 * Formats a numeric index into a 3-digit code.
 *
 * @param index - Zero-based index.
 * @returns Formatted code string.
 */
const formatCode = (index) => {
    return String(index + 1).padStart(3, "0");
};
export { formatCode };
