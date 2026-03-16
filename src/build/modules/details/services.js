import { renderVoidTable } from "../../spa/render-void-table.js";
import { baseServiceView } from "../../utils/base-services.js";
import { formatCode } from "../../utils/format-code.js";
/**
 * Renders category rows inside `<tbody>`.
 *
 * @returns void
 */
const renderDetails = async () => {
    // 1° - INPUT
    const data = await baseServiceView("transactions");
    if (!data) {
        renderVoidTable("#tbody-details", 4);
        return;
    }
    const table = document.querySelector("#tbody-details");
    if (!table)
        return;
    // 2° - PROCESS /  OUTPUT
    if (!data || !table)
        return;
    const payload = data.filter((el) => {
        return el.is_active;
    });
    payload.forEach((el, index) => {
        const row = document.createElement("tr");
        const td = document.createElement("td");
        const code = td.cloneNode();
        code.textContent = formatCode(index);
        row.appendChild(code);
        const product = td.cloneNode();
        product.textContent = "product";
        row.appendChild(product);
        const amount = td.cloneNode();
        amount.textContent = "amount";
        row.appendChild(amount);
        const category = td.cloneNode();
        category.textContent = "category";
        row.appendChild(category);
        const tax = td.cloneNode();
        tax.textContent = el.product_id.toString();
        row.appendChild(tax);
        const total = td.cloneNode();
        total.textContent = el.price.toString();
        row.appendChild(total);
        table.appendChild(row);
    });
    const row = document.createElement("tr");
    for (let i = 0; i < 6; i++)
        row.appendChild(document.createElement("td"));
    table.appendChild(row);
};
export { renderDetails };
