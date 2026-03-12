import { baseView } from "../utils/base-view.js";
/**
 * Handles transaction form submission.
 *
 * @param event - Form submit event.
 * @returns void
 */
const createTransaction = (event) => {
    // 1° - ENVIRONMENT
    event.preventDefault();
    // 2° - INPUT
    const id = crypto.randomUUID();
    const form = event.target;
    const product = form.elements.namedItem("product")
        .value;
    const amount = parseInt(form.elements.namedItem("amount").value);
    const tax = parseInt(form.elements.namedItem("tax").value);
    const price = parseInt(form.elements.namedItem("price").value);
    // 3° - PROCESS
    if (!product || !amount || !tax || !price)
        return;
    const current = baseView("transaction", {
        variant: "list",
    });
    const payload = {
        id: id,
        state: "active",
        amount: amount,
        price: price,
        product_id: product,
        created_at: new Date(),
        is_active: true,
    };
    // 4° - OUTPUT
    localStorage.setItem("transaction", JSON.stringify([...current, payload]));
    window.location.reload();
};
export { createTransaction };
