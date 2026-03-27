"use strict";
// +---------------------------------------------------------------------------------------------------------+
// |                                               ATENTION!!!                                               |
// +---------------------------------------------------------------------------------------------------------+
// | This file is a single entry point for the entire application.                                           |
// | It contains all the code, interfaces, types, utils, and modules.                                        |
// | It is not recommended to edit this file directly, as it may cause conflicts with the original files.    |
// | If you need to edit any part of the code, please edit the original files in their respective folders.   |
// +---------------------------------------------------------------------------------------------------------+
// -----------------------------------------
// FEATURE FLAGS
// -----------------------------------------
const FEATURE_FLAG_ENABLE_ROUTES = false;
const FEATURE_FLAG_ENABLE_SERVER = false;
// -----------------------------------------
// UTILS
// -----------------------------------------
// -----------------------
// utils/auto-increment.ts
// -----------------------
const autoIncrement = async (table) => {
    const data = await serviceView(table);
    if (!data || data.length === 0)
        return 1;
    const hasIsActive = data.some((item) => "is_active" in item);
    if (!hasIsActive)
        return data.length + 1;
    const lastActive = data
        .filter((item) => item.is_active)
        .sort((a, b) => b.id - a.id)[0];
    if (!lastActive || typeof lastActive.id !== "number") {
        return 1;
    }
    return lastActive.id + 1;
};
// -----------------------
// utils/format-code.ts
// -----------------------
const formatCode = (index) => {
    return String(index).padStart(3, "0");
};
// -----------------------
// utils/format-currency.ts
// -----------------------
const formatCurrency = (value) => {
    const price = value / 100;
    const data = price.toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
    });
    return data;
};
// -----------------------
// utils/render-error-message.ts
// -----------------------
const renderErrorMessage = (errors) => {
    const container = document.querySelector(".errors-form-container");
    if (!container)
        return;
    container.innerHTML = "";
    errors.map((error) => {
        const message = document.createElement("p");
        message.innerText = error.message;
        message.classList.add("error-form-message");
        container.appendChild(message);
        if (!error.field)
            return;
        const clean = document.querySelector(error.field);
        clean.value = "";
    });
};
// -----------------------------------------
// SPA
// -----------------------------------------
// -----------------------
// spa/routes.ts
// -----------------------
const routes = {
    "/": {
        title: "Home",
        href: "/src/app/chart.html",
        content: `
    <section>
      <!-- Base form -->
      <form id="home-form">
        <select name="product" id="product" name="product" required>
          <option value="" disabled selected hidden>Product</option>
        </select>
        <div>
          <input
            type="number"
            name="quantity"
            id="quantity"
            placeholder="Quantity"
            min="1"
          />
          <div class="currency-input">
            <p>R$</p>
            <input
              type="number"
              step="0.01"
              min="0.01"
              name="tax"
              id="tax"
              placeholder="Tax"
              disabled
              required
            />
          </div>
          <div class="currency-input">
            <p>R$</p>
            <input
              type="number"
              min="0"
              name="price"
              id="price"
              step="0.01"
              min="0.01"
              placeholder="Unit Price"
              disabled
              required
            />
          </div>
        </div>

        <button type="submit" class="button-primary">Add to Chart</button>
        <div class="errors-form-container"></div>
      </form>
    </section>

    <!-- Horizontal Line -->
    <span class="horizontal-line"></span>

    <!-- Cart Division -->
    <section id="chart-section">
      <!-- Base Table -->
      <table>
        <thead>
          <th class="font-bold">Product</th>
          <th class="font-bold">Unit Price</th>
          <th class="font-bold">Quantity</th>
          <th class="font-bold">Tax</th>
          <th class="font-bold">Total</th>
          <th class="font-bold">Action</th>
        </thead>
        <tbody id="tbody-chart"></tbody>
      </table>
      <!-- Finish buy form -->
      <form id="chart-details">
        <div>
          <div>
            <p class="font-bold">Tax</p>
            <p class="font-bold">Total:</p>
          </div>
          <div>
            <p id="render-tax">R$ 0,00</p>
            <p id="render-total">R$ 0,00</p>
          </div>
        </div>
        <div>
          <button type="button" class="button-secondary" id="no-submit">
            Cancel
          </button>
          <button type="submit" class="button-primary" id="finish">Finish</button>
        </div>
      </form>
    </section>
    `,
    },
    "/products": {
        title: "Products",
        href: "/src/app/products.html",
        content: `
    <section>
      <!-- Base form -->
      <form id="product-form">
        <div>
          <input type="text" id="name" name="name" placeholder="Product" required />
        </div>
        <div>
          <select name="category" id="category" required>
            <option value="" disabled selected hidden>Category</option>
          </select>
          <div class="currency-input">
            <p>R$</p>
            <input
              type="number"
              name="price"
              id="price"
              max="99999999"
              min="0.01"
              step="0.01"
              placeholder="Price"
              required
            />
          </div>
          <input
            type="number"
            name="stock"
            id="stock"
            placeholder="Stock"
            min="1"
            max="999999"
            step="1"
            required
          />
        </div>

        <button type="submit" class="button-primary">Add Product</button>
        <div class="errors-form-container"></div>
      </form>
    </section>

    <!-- Horizontal Line -->
    <span class="horizontal-line"></span>

    <section>
      <!-- Base Table -->
      <table>
        <thead>
          <th class="font-bold">Code</th>
          <th class="font-bold">Product</th>
          <th class="font-bold">Stock</th>
          <th class="font-bold">Unit price</th>
          <th class="font-bold">Category</th>
          <th class="font-bold">Action</th>
        </thead>
        <tbody id="tbody-products"></tbody>
      </table>
    </section>
    `,
    },
    "/categories": {
        title: "Categories",
        href: "/src/app/categories.html",
        content: `
    <section>
      <!-- Base form -->
      <form id="category-form">
        <div>
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="Category"
          />
          <div class="percent-input">
            <p>%</p>
            <input type="text" id="tax" name="tax" required placeholder="Tax" />
          </div>
        </div>

        <button type="submit" class="button-primary">Add Category</button>
        <div class="errors-form-container"></div>
      </form>
    </section>

    <!-- Horizontal Line -->
    <span class="horizontal-line"></span>

    <!-- Base Table -->
    <section>
      <table>
        <thead>
          <th class="font-bold">Code</th>
          <th class="font-bold">Category</th>
          <th class="font-bold">Tax</th>
          <th class="font-bold">Action</th>
        </thead>
        <tbody id="tbody-category"></tbody>
      </table>
    </section>
    `,
    },
    "/history": {
        title: "History",
        href: "/src/app/history.html",
        content: `
    <section>
      <!-- Base Table -->
      <table>
        <thead>
          <th class="font-bold">Code</th>
          <th class="font-bold">Tax</th>
          <th class="font-bold">Total</th>
          <th class="font-bold">Action</th>
        </thead>
        <tbody id="tbody-history"></tbody>
      </table>
    </section>
    `,
    },
    "/details": {
        title: "Details",
        href: "/src/app/details.html",
        content: `
    <section id="details-section">
      <button class="button-primary" id="return">RETURN</button>
      <!-- Base Table -->
      <table>
        <thead>
          <th class="font-bold">Code</th>
          <th class="font-bold">Produto</th>
          <th class="font-bold">Categoria</th>
          <th class="font-bold">Quantity</th>
          <th class="font-bold">Tax</th>
          <th class="font-bold">Total</th>
        </thead>
        <tbody id="tbody-details"></tbody>
      </table>
    </section>
    `,
    },
};
const renderContent = async (path, params) => {
    const app = await document.querySelector("main");
    if (!app)
        return;
    const route = routes[path];
    if (!route) {
        app.innerHTML = "<h1>404</h1>";
        return;
    }
    const searchParams = new URLSearchParams(params).toString();
    const url = searchParams ? `${path}?${searchParams}` : path;
    let html = "";
    if (FEATURE_FLAG_ENABLE_SERVER) {
        const res = await fetch(route.href, {
            cache: "no-store",
        });
        html = await res.text();
    }
    else {
        html = route.content;
    }
    app.innerHTML = html;
    document.title = route.title;
    if (FEATURE_FLAG_ENABLE_ROUTES)
        history.pushState({}, "", url);
    else if (FEATURE_FLAG_ENABLE_SERVER && path !== "/details")
        history.pushState({}, "", "/");
    else if (searchParams)
        history.pushState({}, "", `?${searchParams}`);
};
// -----------------------
// spa/render-app.ts
// -----------------------
const renderApp = async () => {
    const links = document.querySelectorAll(".proxy-route");
    links.forEach((item, index) => {
        item.addEventListener("click", () => {
            switch (index) {
                case 0:
                    renderPage("/");
                    break;
                case 1:
                    renderPage("/products");
                    break;
                case 2:
                    renderPage("/categories");
                    break;
                case 3:
                    renderPage("/history");
                    break;
                default:
                    renderPage("/");
                    break;
            }
        });
    });
    window.addEventListener("popstate", async () => {
        const path = location.pathname;
        if (path in routes) {
            renderPage(path);
        }
        else {
            await renderPage(location.pathname);
        }
    });
    if (FEATURE_FLAG_ENABLE_SERVER)
        await renderPage(location.pathname);
    else
        renderPage("/");
};
// -----------------------
// spa/render-page.ts
// -----------------------
const renderPage = async (path, id) => {
    switch (path) {
        case "/":
            await loadChart();
            loadTransaction();
            break;
        case "/products":
            loadProducts();
            break;
        case "/categories":
            loadCategory();
            break;
        case "/history":
            await loadHistory();
            break;
        case "/details":
            if (!id) {
                loadHistory();
                break;
            }
            loadDetails(id);
            break;
    }
};
// -----------------------
// spa/render-void-table.ts
// -----------------------
const renderVoidTable = (tableId, columns) => {
    const table = document.querySelector(tableId);
    if (!table)
        return;
    const row = document.createElement("tr");
    for (let i = 0; i < columns; i++)
        row.appendChild(document.createElement("td"));
    table.appendChild(row);
};
// -----------------------------------------
// MODULES
// -----------------------------------------
// -----------------------------------------
// BASE
// -----------------------------------------
// -----------------------
// modules/base/base-services.ts
// -----------------------
const serviceView = async (endpoint) => {
    const response = localStorage.getItem(endpoint);
    if (!response)
        return null;
    return JSON.parse(response);
};
const serviceDelete = async (endpoint, id, beforeDelete) => {
    const confirm = window.confirm("Are you sure you want to delete this item?");
    if (!confirm)
        return;
    if (beforeDelete) {
        const canDelete = await beforeDelete(id);
        if (!canDelete)
            return;
    }
    const data = await serviceView(endpoint);
    if (!data)
        return null;
    const hasIsActive = data.some((item) => "is_active" in item);
    let updatedData = [];
    if (hasIsActive) {
        updatedData = data.map((item) => item.id === id ? { ...item, is_active: false } : item);
    }
    else {
        updatedData = data.filter((item) => item.id !== id);
    }
    const stillExists = updatedData.find((item) => item.id === id);
    if (!hasIsActive && stillExists) {
        alert("Error removing item.");
        return;
    }
    localStorage.setItem(endpoint, JSON.stringify(updatedData));
};
const formsEvents = async (handler, form) => {
    const element = document.querySelector(form || "form");
    if (!element)
        return;
    element.addEventListener("submit", (e) => {
        const finishButton = element.querySelector("#finish");
        if (!finishButton) {
            handler(e);
            return;
        }
        const confirmFinish = window.confirm("Are you sure you want to finish?");
        if (confirmFinish)
            handler(e);
        e.preventDefault();
    });
    confirmCancel(element);
};
const confirmCancel = (element) => {
    const cancelButton = element.querySelector("#no-submit");
    if (!cancelButton)
        return;
    cancelButton.addEventListener("click", (e) => {
        const confirmCancel = window.confirm("Are you sure you want to cancel?");
        if (!confirmCancel)
            return;
        e.preventDefault();
        const form = document.querySelector("form");
        form?.reset();
        localStorage.removeItem("chart");
        renderPage("/");
    });
};
const tableEvents = async (table, variant, render, page) => {
    if (render)
        await render();
    const buttons = document.querySelectorAll(`.action-${variant}`);
    buttons.forEach((el) => {
        el.addEventListener("click", async () => {
            const id = Number(el.id);
            let validator;
            if (table === "categories")
                validator = validateCategoryDelete;
            if (table === "products")
                validator = validateProductDelete;
            switch (variant) {
                case "delete":
                case "remove":
                    await serviceDelete(table, id, validator);
                    if (page)
                        renderPage(page);
                    break;
                case "view":
                    renderPage("/details", id);
                    break;
            }
        });
    });
};
const inputMutations = () => {
    const inputs = document.querySelectorAll("input");
    inputs.forEach((input) => {
        const originalType = input.type;
        const config = {
            attributes: true,
            childList: false,
            subtree: false,
        };
        const callback = (mutationsList) => {
            for (const mutation of mutationsList) {
                if (mutation.type === "attributes" &&
                    mutation.attributeName === "type") {
                    observer.disconnect();
                    const target = mutation.target;
                    target.type = originalType;
                    target.value = "";
                    observer.observe(target, config);
                }
            }
        };
        const observer = new MutationObserver(callback);
        observer.observe(input, config);
    });
};
// -----------------------
// modules/base/services.ts
// -----------------------
const renderElement = (row, text) => {
    try {
        const td = document.createElement("td");
        td.textContent = text;
        row.appendChild(td);
    }
    catch {
        renderVoidElement(row);
    }
};
const renderActionButton = (row, id, variant) => {
    try {
        const button = document.createElement("button");
        button.textContent = variant.toUpperCase();
        button.className = `action-${variant} button-secondary`;
        button.id = id;
        const td = document.createElement("td");
        td.appendChild(button);
        row.appendChild(td);
    }
    catch {
        renderVoidElement(row);
    }
};
const renderVoidElement = (row) => {
    const td = document.createElement("td");
    td.textContent = "No data!";
    row.appendChild(td);
};
const renderSelect = async (table, select, fieldText, fieldValue) => {
    const parent = document.querySelector(select);
    const data = await serviceView(table);
    if (!parent || !data)
        return;
    parent.innerHTML =
        "<option value='' disabled selected hidden>Product</option>";
    data.forEach((el) => {
        if (!el.is_active)
            return;
        const option = document.createElement("option");
        const text = el[fieldText];
        const value = el[fieldValue];
        option.innerText = String(text);
        option.value = String(value);
        parent.appendChild(option);
    });
};
const setFocus = (selector) => {
    const element = document.querySelector(selector);
    if (element)
        element.focus();
};
// -----------------------
// modules/base/validators.ts
// -----------------------
const validateText = async (value, table, name) => {
    const regex = /^\p{L}[\p{L}\p{N}]*(?: [\p{L}\p{N}]+)*$/u;
    if (!regex.test(value))
        return `${name} name must start with a letter and contain only letters and numbers.`;
    if (value.length > 28)
        return `${name} name cannot exceed 28 characters.`;
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
// -----------------------------------------
// CATEGORY
// -----------------------------------------
// -----------------------
// modules/category/handlers.ts
// -----------------------
const categoryHandler = async (name, tax) => {
    const errors = [];
    const nameError = await validateCategoryName(name);
    if (nameError)
        errors.push({ field: "#name", message: nameError });
    const taxError = validateCategoryTax(tax);
    if (taxError)
        errors.push({ field: "#tax", message: taxError });
    return errors;
};
const validateCategoryDelete = async (categoryId) => {
    const products = await serviceView("products");
    const hasProducts = products?.some((p) => p.category_id === categoryId && p.is_active !== false);
    if (hasProducts) {
        alert("Cannot delete category because it has associated products.");
        return false;
    }
    return true;
};
// -----------------------
// modules/category/serializers.ts
// -----------------------
const CategoryCreateSerializer = async (form) => {
    const id = await autoIncrement("categories");
    const name = form.elements.namedItem("name");
    const tax = form.elements.namedItem("tax");
    const payload = {
        id: id,
        name: name.value.replace(/\s+/g, " ").trim(),
        tax: parseFloat(parseFloat(tax.value).toFixed(2)),
        is_active: true,
    };
    const requireds = [];
    if (!payload.name)
        requireds.push({ field: "#name", message: "Category name is required." });
    return { payload, requireds };
};
const CategoryViewSerializer = async () => {
    const data = (await serviceView("categories"))?.filter((el) => el.is_active);
    if (!data)
        return null;
    const payload = [];
    data.map((el) => {
        payload.push({
            id: el.id.toString(),
            name: el.name,
            tax: el.tax.toString().concat("%"),
        });
    });
    return payload;
};
// -----------------------
// modules/category/services.ts
// -----------------------
const createCategory = async (event) => {
    event.preventDefault();
    const { payload, requireds } = await CategoryCreateSerializer(event.target);
    if (requireds.length > 0) {
        renderErrorMessage(requireds);
        return;
    }
    const errors = await categoryHandler(payload.name, payload.tax);
    if (errors.length > 0) {
        renderErrorMessage(errors);
        setFocus(errors[0].field || "#name");
        return;
    }
    const currentData = await serviceView("categories");
    localStorage.setItem("categories", JSON.stringify(currentData ? [...currentData, payload] : [payload]));
    renderPage("/categories");
};
const renderCategory = async () => {
    const COLUMNS_COUNT = 4;
    const data = await CategoryViewSerializer();
    const table = document.querySelector("#tbody-category");
    if (!data || !table) {
        renderVoidTable("#tbody-category", COLUMNS_COUNT);
        return;
    }
    data.map((el) => {
        const row = document.createElement("tr");
        renderElement(row, formatCode(parseInt(el.id)));
        renderElement(row, el.name);
        renderElement(row, el.tax);
        renderActionButton(row, el.id, "delete");
        table.appendChild(row);
    });
    const row = document.createElement("tr");
    for (let i = 0; i < COLUMNS_COUNT; i++)
        row.appendChild(document.createElement("td"));
    table.appendChild(row);
};
const formatTaxInput = () => {
    const taxInput = document.querySelector("#tax");
    if (!taxInput)
        return;
    const regexTaxInput = (e) => {
        if (!e.target || !(e.target instanceof HTMLInputElement))
            return;
        let value = e.target.value;
        value = value.replace(/[^0-9.,]/g, "");
        value = value.replace(",", ".");
        let [integer, decimal] = value.split(".");
        if (value.split(".").length > 2) {
            value = integer + "." + value.split(".").slice(1).join("");
            [integer, decimal] = value.split(".");
        }
        if (decimal !== undefined) {
            decimal = decimal.slice(0, 2);
            value = `${integer}.${decimal}`;
        }
        if (value.endsWith(".")) {
            e.target.value = value;
            return;
        }
        let number = parseFloat(value);
        if (!isNaN(number)) {
            if (number > 100)
                number = 100;
            if (number < 0)
                number = 0;
            value = number.toString();
        }
        e.target.value = value;
    };
    taxInput.addEventListener("input", regexTaxInput);
};
// -----------------------
// modules/category/spa.ts
// -----------------------
const loadCategory = async () => {
    await renderContent("/categories");
    await tableEvents("categories", "delete", renderCategory, "/categories");
    await formsEvents(createCategory);
    inputMutations();
    formatTaxInput();
    setFocus("#name");
};
// -----------------------
// modules/base/validators.ts
// -----------------------
const validateCategoryName = async (name) => {
    return validateText(name, "categories", "Category");
};
const validateCategoryTax = (tax) => {
    return validateNumber(tax, "Tax", {
        min: {
            value: 0,
            label: "0%",
        },
        max: {
            value: 100,
            label: "100%",
        },
    });
};
// -----------------------------------------
// CHART
// -----------------------------------------
// -----------------------
// modules/chart/handlers.ts
// -----------------------
const chartHandler = async (product, quantity, price, tax) => {
    const errors = [];
    let handled = false;
    const productError = await validateChartName(product);
    if (productError)
        errors.push({ field: "#product", message: productError });
    const quantityError = await validateChartQuantity(quantity, product);
    if (quantityError)
        errors.push({ field: "#quantity", message: quantityError });
    const priceError = await validateChartPrice(price, product);
    if (priceError)
        errors.push({ field: "#price", message: priceError });
    const taxError = await validateChartTax(tax, product);
    if (taxError)
        errors.push({ field: "#tax", message: taxError });
    const duplicatedResult = await validateChartDuplicated(product, quantity);
    if (duplicatedResult.error)
        errors.push({ field: "#product", message: duplicatedResult.error });
    if (duplicatedResult.handled)
        handled = true;
    return { errors, handled };
};
// -----------------------
// modules/chart/serializers.ts
// -----------------------
const ChartCreateSerializer = async (form) => {
    const id = await autoIncrement("chart");
    const quantity = form.elements.namedItem("quantity");
    const price = form.elements.namedItem("price");
    const tax = form.elements.namedItem("tax");
    const product = form.elements.namedItem("product");
    const payload = await {
        id: id,
        quantity: parseInt(quantity.value),
        price: parseInt((parseFloat(price.value) * 100).toFixed(0)),
        tax: parseInt((parseFloat(tax.value) * 100).toFixed(0)),
        product_id: parseInt(product.value),
    };
    const requireds = [];
    if (!payload.quantity)
        requireds.push({ field: "#quantity", message: "Quantity is required." });
    if (!payload.price)
        requireds.push({ field: "#price", message: "Price is required." });
    if (payload.tax === null || payload.tax === undefined)
        requireds.push({ field: "#tax", message: "Tax is required." });
    console.log(payload.product_id);
    if (!payload.product_id)
        requireds.push({ field: "#product", message: "Product is required." });
    return { payload, requireds };
};
const ChartViewSerializer = async () => {
    const data = await serviceView("chart");
    if (!data)
        return null;
    const payload = [];
    data.map(async (el) => {
        const product = (await serviceView("products"))?.find((e) => e.id === el.product_id);
        const total = el.price * el.quantity;
        const tax = product?.tax === null || product?.tax === undefined
            ? "No data!"
            : formatCurrency(product.tax * el.quantity);
        payload.push({
            id: el.id.toString(),
            quantity: el.quantity.toString(),
            price: formatCurrency(el.price),
            tax: tax,
            total: formatCurrency(total),
            product: product?.name || "No data!",
        });
    });
    return payload;
};
// -----------------------
// modules/chart/services.ts
// -----------------------
const createChart = async (event) => {
    event.preventDefault();
    const { payload, requireds } = await ChartCreateSerializer(event.target);
    if (requireds.length > 0) {
        renderErrorMessage(requireds);
        return;
    }
    const { errors, handled } = await chartHandler(payload.product_id, payload.quantity, payload.price, payload.tax);
    if (errors.length > 0) {
        renderErrorMessage(errors);
        setFocus(errors[0].field || "#quantity");
        return;
    }
    if (handled) {
        renderPage("/");
        return;
    }
    const currentData = await serviceView("chart");
    localStorage.setItem("chart", JSON.stringify(currentData ? [...currentData, payload] : [payload]));
    renderPage("/");
};
const renderChart = async () => {
    const COLUMNS_COUNT = 6;
    const data = await ChartViewSerializer();
    const table = document.querySelector("#tbody-chart");
    if (!data || !table) {
        renderVoidTable("#tbody-chart", COLUMNS_COUNT);
        return;
    }
    data.map((el) => {
        const row = document.createElement("tr");
        renderElement(row, el.product);
        renderElement(row, el.price);
        renderElement(row, el.quantity);
        renderElement(row, el.tax);
        renderElement(row, el.total);
        renderActionButton(row, el.id, "remove");
        table.appendChild(row);
    });
    const row = document.createElement("tr");
    for (let i = 0; i < COLUMNS_COUNT; i++)
        row.appendChild(document.createElement("td"));
    table.appendChild(row);
};
const overwriteProduct = async (duplicated, quantity, chart) => {
    try {
        const maxStock = (await serviceView("products"))?.find((el) => el.id === duplicated.product_id);
        const currentQuantity = chart?.find((el) => el.id === duplicated.id)?.quantity;
        if (!currentQuantity)
            return null;
        if (currentQuantity + quantity > (maxStock?.stock || 0))
            return "Doesn't exist that quantity in stock";
        const payload = chart.map((el) => {
            if (el.id === duplicated.id) {
                el.quantity += quantity;
            }
            return el;
        });
        localStorage.setItem("chart", JSON.stringify(payload));
        renderPage("/");
        return null;
    }
    catch {
        return "Internal Error";
    }
};
const fieldsListener = () => {
    const listener = document.querySelector("#product");
    if (!listener)
        return;
    listener.addEventListener("change", async (e) => {
        const id = e.target.value;
        const product = (await serviceView("products"))?.find((el) => el.id === parseInt(id));
        const tax = product?.tax;
        const taxField = document.querySelector("#tax");
        if (!taxField || tax === null || tax === undefined)
            return;
        taxField.value = (tax / 100).toFixed(2);
        const priceField = document.querySelector("#price");
        if (!priceField || !product?.price)
            return;
        priceField.value = (product.price / 100).toFixed(2);
    });
};
// -----------------------
// modules/chart/spa.ts
// -----------------------
const loadChart = async () => {
    await renderContent("/");
    await tableEvents("chart", "remove", renderChart, "/");
    await formsEvents(createChart, "#home-form");
    await renderSelect("products", "#product", "name", "id");
    inputMutations();
    fieldsListener();
    setFocus("#product");
};
// -----------------------
// modules/chart/validators.ts
// -----------------------
const validateChartName = async (product_id) => {
    return validateRelation(product_id, "products", "Product");
};
const validateChartQuantity = async (quantity, product_id) => {
    const max = (await serviceView("products"))?.find((el) => el.id === product_id && el.is_active);
    if (!max)
        return `This product doesn't exists`;
    const error = await validateNumber(quantity, "Quantity", {
        min: {
            value: 1,
            label: "1",
        },
        max: {
            value: max.stock,
            label: max.stock.toString(),
        },
    });
    if (error !== null)
        alert(error);
    return error;
};
const validateChartPrice = async (price, product_id) => {
    const raw = await serviceView("products");
    const product = raw?.find((el) => el.id === product_id && el.is_active);
    if (!product)
        return `This product doesn't exists`;
    if (price !== product.price)
        return "The price is incorrect";
    return null;
};
const validateChartTax = async (tax, product_id) => {
    const product = (await serviceView("products"))?.find((el) => el.id === product_id && el.is_active);
    if (!product)
        return `This product doesn't exists`;
    if (tax !== product.tax)
        return "The tax is incorrect";
    return null;
};
const validateChartDuplicated = async (product_id, quantity) => {
    const chart = await serviceView("chart");
    const duplicated = chart?.find((el) => el.product_id === product_id);
    if (!chart || !duplicated)
        return { handled: false };
    const error = await overwriteProduct(duplicated, quantity, chart);
    if (error)
        return { handled: false, error };
    return { handled: true };
};
// -----------------------------------------
// ORDER
// -----------------------------------------
// -----------------------
// modules/order/serializers.ts
// -----------------------
const OrderCreateSerializer = async () => {
    const data = await serviceView("chart");
    if (!data)
        return null;
    const id = await autoIncrement("orders");
    let total_tax = 0;
    let total_price = 0;
    data.map(async (el) => {
        total_tax += el.tax * el.quantity;
        total_price += el.price * el.quantity;
        const products = await serviceView("products");
        if (!products)
            return;
        products?.map((e) => {
            if (e.id === el.product_id)
                e.stock -= el.quantity;
        });
        const data = products.filter((e) => e.stock > 0);
        if (!data)
            return;
        localStorage.setItem("products", JSON.stringify(data));
    });
    const payload = {
        id: id,
        total_tax: total_tax,
        total_price: total_price,
        created_at: new Date(),
    };
    return payload;
};
const OrderViewSerializer = async () => {
    const data = await serviceView("orders");
    if (!data)
        return null;
    const payload = [];
    data.map((el) => {
        const id = el.id.toString();
        const total_price = formatCurrency(el.total_price);
        const total_tax = formatCurrency(el.total_tax);
        payload.push({
            id: id,
            total_price: total_price,
            total_tax: total_tax,
        });
    });
    return payload;
};
const TransactionCreateSerializer = async (order) => {
    const data = await serviceView("chart");
    if (!data)
        return null;
    const id = (await autoIncrement("transactions")) || 1;
    const payload = [];
    data.map(async (el, index) => {
        payload.push({
            id: id + index,
            quantity: el.quantity,
            price: el.price,
            product_id: el.product_id,
            order_id: order,
            is_active: true,
        });
    });
    return payload;
};
const TransactionViewSerializer = async () => {
    const url = new URLSearchParams(window.location.search);
    const id = url.get("order");
    if (!id)
        return null;
    const data = (await serviceView("transactions"))?.filter((el) => el.is_active && el.order_id === parseInt(id));
    if (!data)
        return null;
    const payload = [];
    await data.map(async (el) => {
        const product = (await serviceView("products"))?.find((e) => e.id === el.product_id);
        const category = (await serviceView("categories"))?.find((e) => e.id === product?.category_id)?.name;
        const tax = (product?.tax || 0) * el.quantity;
        const total = el.price * el.quantity;
        payload.push({
            id: el.id.toString(),
            product: product?.name || "No data!",
            category: category || "No data!",
            quantity: el.quantity.toString(),
            tax: formatCurrency(tax),
            total: formatCurrency(total),
        });
    });
    return payload;
};
// -----------------------
// modules/order/services.ts
// -----------------------
const finishPurchase = async (event) => {
    event.preventDefault();
    const order = await OrderCreateSerializer();
    if (!order)
        return;
    const currentOrders = await serviceView("orders");
    localStorage.setItem("orders", JSON.stringify(currentOrders ? [...currentOrders, order] : [order]));
    const transactions = await TransactionCreateSerializer(order.id);
    if (!transactions)
        return;
    const currentTransactions = await serviceView("transactions");
    localStorage.setItem("transactions", JSON.stringify(currentTransactions
        ? [...currentTransactions, ...transactions]
        : transactions));
    localStorage.setItem("chart", "");
    renderPage("/history");
};
const renderOrders = async () => {
    const COLUMNS_COUNT = 4;
    const data = await OrderViewSerializer();
    const table = await document.querySelector("#tbody-history");
    if (!data || !table) {
        renderVoidTable("#tbody-history", COLUMNS_COUNT);
        return;
    }
    data.map((el) => {
        const row = document.createElement("tr");
        renderElement(row, formatCode(parseInt(el.id)));
        renderElement(row, el.total_tax);
        renderElement(row, el.total_price);
        renderActionButton(row, el.id, "view");
        table.appendChild(row);
    });
    const row = document.createElement("tr");
    for (let i = 0; i < COLUMNS_COUNT; i++)
        row.appendChild(document.createElement("td"));
    table.appendChild(row);
};
const renderOrderDetails = async () => {
    const taxField = document.querySelector("#render-tax");
    const totalField = document.querySelector("#render-total");
    if (!taxField || !totalField)
        return;
    const data = await serviceView("chart");
    if (!data) {
        taxField.innerText = formatCurrency(0);
        totalField.innerText = formatCurrency(0);
        return;
    }
    const tax = data.reduce((sum, el) => (sum += el.tax * el.quantity), 0);
    const total = data.reduce((sum, el) => (sum += el.price * el.quantity), 0);
    taxField.innerText = formatCurrency(tax);
    totalField.innerText = formatCurrency(total);
};
const renderTransactions = async () => {
    const COLUMNS_COUNT = 6;
    const data = await TransactionViewSerializer();
    const table = document.querySelector("#tbody-details");
    if (!data || !table) {
        renderVoidTable("#tbody-details", COLUMNS_COUNT);
        return;
    }
    data.forEach((el) => {
        const row = document.createElement("tr");
        renderElement(row, formatCode(parseInt(el.id)));
        renderElement(row, el.product);
        renderElement(row, el.category);
        renderElement(row, el.quantity);
        renderElement(row, el.tax);
        renderElement(row, el.total);
        table.appendChild(row);
    });
    const row = document.createElement("tr");
    for (let i = 0; i < COLUMNS_COUNT; i++)
        row.appendChild(document.createElement("td"));
    table.appendChild(row);
};
const listenReturn = () => {
    const returnButton = document.querySelector("#return");
    if (!returnButton)
        return;
    returnButton.addEventListener("click", () => {
        renderPage("/history");
    });
};
// -----------------------
// modules/order/spa.ts
// -----------------------
const loadTransaction = async () => {
    await formsEvents(finishPurchase, "#chart-details");
    renderOrderDetails();
};
const loadHistory = async () => {
    await renderContent("/history");
    await tableEvents("orders", "view", renderOrders);
};
const loadDetails = async (id) => {
    await renderContent("/details", { order: id.toString() });
    await tableEvents("transactions", "none", renderTransactions);
    listenReturn();
};
// -----------------------------------------
// PRODUCT
// -----------------------------------------
// -----------------------
// modules/product/handlers.ts
// -----------------------
const productHandler = async (name, stock, price, tax, category) => {
    const errors = [];
    const nameError = await validateProductName(name);
    if (nameError)
        errors.push({ field: "#name", message: nameError });
    const stockError = validateProductStock(stock);
    if (stockError)
        errors.push({ field: "#stock", message: stockError });
    const priceError = validateProductPrice(price);
    if (priceError)
        errors.push({ field: "#price", message: priceError });
    const taxError = await validateProductTax(tax, price, category);
    if (taxError)
        errors.push({ field: "#price", message: taxError });
    const categoryError = await validateProductCategory(category);
    if (categoryError)
        errors.push({ field: "#category", message: categoryError });
    return errors;
};
// -----------------------
// modules/product/serializers.ts
// -----------------------
const ProductCreateSerializer = async (form) => {
    const id = await autoIncrement("products");
    const name = form.elements.namedItem("name");
    const stock = form.elements.namedItem("stock");
    const category = form.elements.namedItem("category");
    const priceField = form.elements.namedItem("price");
    const price = parseInt((parseFloat(priceField.value) * 100).toFixed(0));
    const percentTax = (await serviceView("categories"))?.find((el) => el.id === parseInt(category.value))?.tax;
    const tax = (((percentTax || 0) * price) / 100).toFixed(0);
    const payload = {
        id: id,
        name: name.value.replace(/\s+/g, " ").trim(),
        stock: parseInt(stock.value),
        price: price,
        tax: parseInt(tax),
        category_id: parseInt(category.value),
        is_active: true,
    };
    const requireds = [];
    if (!payload.name)
        requireds.push({ field: "#name", message: "Name is required." });
    if (!payload.category_id)
        requireds.push({ field: "#category", message: "Category is required." });
    if (!payload.stock)
        requireds.push({ field: "#stock", message: "Stock is required." });
    if (!payload.price)
        requireds.push({ field: "#price", message: "Price is required." });
    if (payload.tax === null || payload.tax === undefined)
        requireds.push({ field: "#tax", message: "Tax is required." });
    return { payload, requireds };
};
const ProductViewSerializer = async () => {
    const data = (await serviceView("products"))?.filter((el) => el.is_active);
    if (!data)
        return null;
    const payload = [];
    data.map(async (el) => {
        const category = (await serviceView("categories"))?.find((e) => e.id === el.category_id)?.name;
        payload.push({
            id: el.id.toString(),
            name: el.name.toString(),
            stock: el.stock.toString(),
            price: formatCurrency(el.price),
            category: category || "No data!",
        });
    });
    return payload;
};
// -----------------------
// modules/product/services.ts
// -----------------------
const createProduct = async (event) => {
    event.preventDefault();
    const { payload, requireds } = await ProductCreateSerializer(event.target);
    if (requireds.length > 0) {
        renderErrorMessage(requireds);
        return;
    }
    const errors = await productHandler(payload.name, payload.stock, payload.price, payload.tax, payload.category_id);
    if (errors.length > 0) {
        renderErrorMessage(errors);
        setFocus(errors[0].field || "#name");
        return;
    }
    const currentData = await serviceView("products");
    localStorage.setItem("products", JSON.stringify(currentData ? [...currentData, payload] : [payload]));
    renderPage("/products");
};
const renderProducts = async () => {
    const COLUMNS_COUNT = 6;
    const data = await ProductViewSerializer();
    const table = document.querySelector("#tbody-products");
    if (!data || !table) {
        renderVoidTable("#tbody-products", COLUMNS_COUNT);
        return;
    }
    data.map((el) => {
        const row = document.createElement("tr");
        renderElement(row, formatCode(parseInt(el.id)));
        renderElement(row, el.name);
        renderElement(row, el.stock);
        renderElement(row, el.price);
        renderElement(row, el.category);
        renderActionButton(row, el.id, "delete");
        table.appendChild(row);
    });
    const row = document.createElement("tr");
    for (let i = 0; i < COLUMNS_COUNT; i++)
        row.appendChild(document.createElement("td"));
    table.appendChild(row);
};
// -----------------------
// modules/product/spa.ts
// -----------------------
const loadProducts = async () => {
    await renderContent("/products");
    await tableEvents("products", "delete", renderProducts, "/products");
    await formsEvents(createProduct);
    await renderSelect("categories", "#category", "name", "id");
    inputMutations();
    setFocus("#name");
};
// -----------------------
// modules/product/validators.ts
// -----------------------
const validateProductName = async (name) => {
    return validateText(name, "products", "Product");
};
const validateProductCategory = async (category_id) => {
    return validateRelation(category_id, "categories", "category");
};
const validateProductStock = (stock) => {
    return validateNumber(stock, "Stock", {
        min: {
            value: 1,
            label: "1",
        },
        max: {
            value: 999999,
            label: "999.999",
        },
    });
};
const validateProductPrice = (price) => {
    return validateNumber(price, "Price", {
        min: {
            value: 1,
            label: "R$ 0.01",
        },
        max: {
            value: 99999999,
            label: "R$ 999.999,99",
        },
    });
};
const validateProductTax = async (tax, price, category_id) => {
    const category = (await serviceView("categories"))?.find((el) => el.id === category_id)?.tax;
    if (category === null || category === undefined)
        return "No category found";
    const compare = parseInt(((category * price) / 100).toFixed(0));
    if (compare !== tax)
        return "Invalid tax value";
    return null;
};
const validateProductDelete = async (productId) => {
    const charts = await serviceView("chart");
    const hasChart = charts?.some((c) => c.product_id === productId);
    if (hasChart) {
        alert("Cannot delete product because it is used in chart.");
        return false;
    }
    return true;
};
// RENDER HEADER
window.addEventListener("DOMContentLoaded", () => {
    renderApp();
});
