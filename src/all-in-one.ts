// -----------------------------------------
// FEATURE FLAGS
// -----------------------------------------
const FEATURE_FLAG_ENABLE_ROUTES = false;

// -----------------------------------------
// INTERFACES
// -----------------------------------------

// -----------------------
// interfaces/category.ts
// -----------------------
interface ICategory {
  id: number;
  name: string;
  tax: number;
  is_active: boolean;
}

interface ICategoryRender {
  id: string;
  name: string;
  tax: string;
}

// -----------------------
// interfaces/chart.ts
// -----------------------
interface IChart {
  id: number;
  quantity: number;
  price: number;
  tax: number;
  product_id: number;
}

interface IChartRender {
  id: string;
  quantity: string;
  price: string;
  tax: string;
  total: string;
  product: string;
}

// -----------------------
// interfaces/error-response.ts
// -----------------------
type ErrorResponse = {
  field: string;
  message: string;
}[];

// -----------------------
// interfaces/order.ts
// -----------------------
interface IOrder {
  id: number;
  total_price: number;
  total_tax: number;
  created_at: Date;
}

interface IOrderRender {
  id: string;
  total_price: string;
  total_tax: string;
}

// -----------------------
// interfaces/product.ts
// -----------------------
interface IProduct {
  id: number;
  name: string;
  stock: number;
  tax: number;
  price: number;
  category_id: number;
  is_active: boolean;
}

interface IProductRender {
  id: string;
  name: string;
  stock: string;
  price: string;
  category: string;
}

// -----------------------
// interfaces/transaction.ts
// -----------------------
interface ITransaction {
  id: number;
  quantity: number;
  price: number;
  product_id: number;
  order_id: number;
  is_active: boolean;
}

interface ITransactionRender {
  id: string;
  product: string;
  category: string;
  quantity: string;
  tax: string;
  total: string;
}

// -----------------------------------------
// TYPES
// -----------------------------------------

// -----------------------
// types/table.ts
// -----------------------
export type Table =
  | "categories"
  | "products"
  | "transactions"
  | "chart"
  | "orders";

// -----------------------------------------
// UTILS
// -----------------------------------------

// -----------------------
// utils/auto-increment.ts
// -----------------------
const autoIncrement = async (table: Table) => {
  const data = await serviceView<{
    id: number;
  }>(table);

  if (!data || data.length === 0) return 1;
  const lastItem = data[data.length - 1];

  if (!lastItem || typeof lastItem.id !== "number") {
    return 1;
  }

  return lastItem.id + 1;
};

// -----------------------
// utils/format-code.ts
// -----------------------
const formatCode = (index: number): string => {
  return String(index).padStart(3, "0");
};

// -----------------------
// utils/format-currency.ts
// -----------------------
const formatCurrency = (value: number) => {
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
const renderErrorMessage = (errors: ErrorResponse) => {
  const container = document.querySelector(".errors-form-container");
  if (!container) return;
  container.innerHTML = "";

  errors.map((error) => {
    const message = document.createElement("p");
    message.innerText = error.message;
    message.classList.add("error-form-message");

    container.appendChild(message);

    const clean = document.querySelector(error.field) as HTMLInputElement;
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
  },
  "/products": {
    title: "Products",
    href: "/src/app/products.html",
  },
  "/categories": {
    title: "Categories",
    href: "/src/app/categories.html",
  },
  "/history": {
    title: "History",
    href: "/src/app/history.html",
  },
  "/details": {
    title: "Details",
    href: "/src/app/details.html",
  },
};
type RouteKey = keyof typeof routes;

// -----------------------
// spa/proxy.ts
// -----------------------
type QueryParams = Record<string, string>;

const renderContent = async (path: RouteKey, params?: QueryParams) => {
  const app = await document.querySelector("main");
  if (!app) return;

  const route = routes[path];
  if (!route) {
    app.innerHTML = "<h1>404</h1>";
    return;
  }

  const searchParams = new URLSearchParams(params).toString();
  const url = searchParams ? `${path}?${searchParams}` : path;

  const res = await fetch(route.href, {
    cache: "no-store",
  });
  const html = await res.text();

  app.innerHTML = html;
  document.title = route.title;
  if (FEATURE_FLAG_ENABLE_ROUTES) history.pushState({}, "", url);
  else if (path !== "/details") history.pushState({}, "", "/");
  else if (searchParams) history.pushState({}, "", `?${searchParams}`);
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
      renderPage(path as RouteKey);
    } else {
      await renderPage(location.pathname as RouteKey);
    }
  });

  await renderPage(location.pathname as RouteKey);
};

// -----------------------
// spa/render-page.ts
// -----------------------
const renderPage = async (path: RouteKey, id?: number) => {
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
const renderVoidTable = (tableId: string, columns: number) => {
  const table = document.querySelector(tableId);
  if (!table) return;

  const row = document.createElement("tr");
  for (let i = 0; i < columns; i++)
    row.appendChild(document.createElement("td"));
  table.appendChild(row);
};

// RENDER HEADER
await renderApp();

// -----------------------------------------
// MODULES
// -----------------------------------------

// -----------------------------------------
// BASE
// -----------------------------------------

// -----------------------
// modules/base/base-services.ts
// -----------------------

const serviceView = async <IResponseData>(
  endpoint: Table,
): Promise<Array<IResponseData> | null> => {
  const response = localStorage.getItem(endpoint);
  if (!response) return null;
  return JSON.parse(response);
};

const serviceDelete = async (endpoint: Table, id: number) => {
  const response = await serviceView<{ id: number; is_active: boolean }>(
    endpoint,
  );
  const payload = await response?.map((el) => {
    if (el.id === id) el.is_active = false;
  });
  if (!payload) return null;

  localStorage.setItem(endpoint, JSON.stringify(response));
  // window.location.reload();
};

const serviceRemove = async (endpoint: Table, id: number) => {
  const response = await serviceView<{ id: number }>(endpoint);
  if (!response) return null;

  const data = response.filter((el) => el.id !== id);
  if (data.length !== response.length - 1) return null;

  localStorage.setItem(endpoint, JSON.stringify(data));
  // window.location.reload();
};

// -----------------------
// modules/base/listeners.ts
// -----------------------

interface EventListenerOptions {
  table: Table;
  variant: "delete" | "remove" | "view" | "none";
  render: () => void;
  handler: (event: SubmitEvent) => void;
  form?: string;
  page?: RouteKey;
}

const formsEvents = async (
  handler: EventListenerOptions["handler"],
  form?: EventListenerOptions["form"],
) => {
  const element = document.querySelector<HTMLFormElement>(form || "form");
  if (!element) return;

  element.addEventListener("submit", handler);
};

const tableEvents = async (
  table: EventListenerOptions["table"],
  variant: EventListenerOptions["variant"],
  render: EventListenerOptions["render"],
  page?: EventListenerOptions["page"],
) => {
  if (render) await render();

  const buttons = document.querySelectorAll<HTMLButtonElement>(
    `.action-${variant}`,
  );

  buttons.forEach((el) => {
    el.addEventListener("click", () => {
      const id = Number(el.id);

      switch (variant) {
        case "delete":
          serviceDelete(table, id);
          if (page) renderPage(page);
          break;
        case "remove":
          serviceRemove(table, id);
          if (page) renderPage(page);
          break;
        case "view":
          // TODO: HERE TO PUT ID
          renderPage("/details", id);
          break;
      }
    });
  });
};

// -----------------------
// modules/base/services.ts
// -----------------------

const renderElement = (row: HTMLTableRowElement, text: string) => {
  try {
    const td = document.createElement("td");
    td.textContent = text;
    row.appendChild(td);
  } catch {
    renderVoidElement(row);
  }
};

const renderActionButton = (
  row: HTMLTableRowElement,
  id: string,
  variant: "delete" | "remove" | "view" | "none",
) => {
  try {
    const button = document.createElement("button");
    button.textContent = variant.toUpperCase();
    button.className = `action-${variant} button-secondary`;
    button.id = id;
    const td = document.createElement("td");
    td.appendChild(button);
    row.appendChild(td);
  } catch {
    renderVoidElement(row);
  }
};

const renderVoidElement = (row: HTMLTableRowElement) => {
  const td = document.createElement("td");
  td.textContent = "No data!";
  row.appendChild(td);
};

const renderSelect = async <IResponseData extends { is_active: boolean }>(
  table: Table,
  select: string,
  fieldText: keyof IResponseData,
  fieldValue: keyof IResponseData,
) => {
  const parent = document.querySelector<HTMLSelectElement>(select);
  const data = await serviceView<IResponseData>(table);

  if (!parent || !data) return;
  data.forEach((el: IResponseData) => {
    if (!el.is_active) return;
    const option = document.createElement("option");

    const text = el[fieldText];
    const value = el[fieldValue];

    option.innerText = String(text);
    option.value = String(value);

    parent.appendChild(option);
  });
};

// -----------------------
// modules/base/validators.ts
// -----------------------

const validateText = async <
  IValidate extends { is_active: boolean; name: string },
>(
  value: string,
  table: Table,
  name: string,
): Promise<string | null> => {
  const regex = /^\p{L}[\p{L}\p{N}]*(?: [\p{L}\p{N}]+)*$/u;
  if (!regex.test(value))
    return `${name} name must start with a letter and contain only letters and numbers.`;

  if (value.length > 100) return `${name} name cannot exceed 100 characters.`;
  if (value.length < 3)
    return `${name} name must contain at least 2 characters.`;

  const data = (await serviceView<IValidate>(table))?.filter(
    (e) => e.is_active,
  );
  if (data) {
    const exists = data.find(
      (el) => el.name.toLowerCase() === value.toLowerCase(),
    );
    if (exists) return `A ${name.toLowerCase()} with this name already exists.`;
  }

  return null;
};

const validateNumber = (
  value: number,
  name: string,
  limits: {
    min: { value: number; label: string };
    max: { value: number; label: string };
  },
): string | null => {
  if (typeof value !== "number" || Number.isNaN(value))
    return `${name} must be a valid number.`;

  if (value < limits.min.value)
    return `${name} must be at least ${limits.min.label}.`;
  if (value > limits.max.value)
    return `${name} cannot exceed ${limits.max.label}.`;

  return null;
};

const validateRelation = async <
  IValidate extends { is_active: boolean; id: number },
>(
  value: number,
  table: Table,
  name: string,
): Promise<string | null> => {
  const data = (await serviceView<IValidate>(table))?.filter(
    (e) => e.is_active,
  );
  if (data) {
    const exist = data.find((el) => el.id === value);
    if (!exist) return `This ${name} doesn't exists.`;
  }

  return null;
};

// -----------------------------------------
// CATEGORY
// -----------------------------------------

// -----------------------
// modules/category/handlers.ts
// -----------------------

const categoryHandler = async (
  name: string,
  tax: number,
): Promise<ErrorResponse> => {
  const errors = [];

  const nameError = await validateCategoryName(name);
  if (nameError) errors.push({ field: "#name", message: nameError });

  const taxError = validateCategoryTax(tax);
  if (taxError) errors.push({ field: "#tax", message: taxError });

  return errors;
};

// -----------------------
// modules/category/serializers.ts
// -----------------------

const CategoryCreateSerializer = async (
  form: HTMLFormElement,
): Promise<ICategory> => {
  const id = await autoIncrement("categories");
  const name = form.elements.namedItem("name") as HTMLInputElement;
  const tax = form.elements.namedItem("tax") as HTMLInputElement;

  const payload: ICategory = {
    id: id,
    name: name.value.replace(/\s+/g, " ").trim(),
    tax: parseFloat(parseFloat(tax.value).toFixed(2)),
    is_active: true,
  };

  return payload;
};

const CategoryViewSerializer = async (): Promise<ICategoryRender[] | null> => {
  const data = (await serviceView<ICategory>("categories"))?.filter(
    (el) => el.is_active,
  );
  if (!data) return null;

  const payload: ICategoryRender[] = [];
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

const createCategory = async (event: SubmitEvent) => {
  event.preventDefault();

  const payload = await CategoryCreateSerializer(
    event.target as HTMLFormElement,
  );
  if (!payload.name || !payload.tax) return;

  const errors = await categoryHandler(payload.name, payload.tax);
  if (errors.length > 0) {
    renderErrorMessage(errors);
    return;
  }

  const currentData = await serviceView<ICategory>("categories");
  localStorage.setItem(
    "categories",
    JSON.stringify(currentData ? [...currentData, payload] : [payload]),
  );
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

// -----------------------
// modules/category/spa.ts
// -----------------------

const loadCategory = async () => {
  await renderContent("/categories");
  await tableEvents("categories", "delete", renderCategory, "/categories");
  await formsEvents(createCategory);
};

// -----------------------
// modules/base/validators.ts
// -----------------------

const validateCategoryName = async (value: string): Promise<string | null> => {
  return validateText<ICategory>(value, "categories", "Category");
};

const validateCategoryTax = (value: number): string | null => {
  return validateNumber(value, "Tax", {
    min: {
      value: 0.01,
      label: "0.01%",
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

const chartHandler = async (
  product: number,
  quantity: number,
  price: number,
  tax: number,
): Promise<{ errors: ErrorResponse; handled: boolean }> => {
  const errors = [];
  let handled = false;

  const productError = await validateChartName(product);
  if (productError) errors.push({ field: "#product", message: productError });

  const quantityError = await validateChartQuantity(quantity, product);
  if (quantityError)
    errors.push({ field: "#quantity", message: quantityError });

  const priceError = await validateChartPrice(price, product);
  if (priceError) errors.push({ field: "#price", message: priceError });

  const taxError = await validateChartTax(tax, product);
  if (taxError) errors.push({ field: "#tax", message: taxError });

  const duplicatedResult = await validateChartDuplicated(product, quantity);
  if (duplicatedResult.error)
    errors.push({ field: "#product", message: duplicatedResult.error });
  if (duplicatedResult.handled) handled = true;

  return { errors, handled };
};

// -----------------------
// modules/chart/serializers.ts
// -----------------------

const ChartCreateSerializer = async (
  form: HTMLFormElement,
): Promise<IChart> => {
  const id = await autoIncrement("chart");
  const quantity = form.elements.namedItem("quantity") as HTMLInputElement;
  const price = form.elements.namedItem("price") as HTMLInputElement;
  const tax = form.elements.namedItem("tax") as HTMLInputElement;
  const product = form.elements.namedItem("product") as HTMLSelectElement;

  const payload: IChart = {
    id: id,
    quantity: parseInt(quantity.value),
    price: parseInt((parseFloat(price.value) * 100).toFixed(0)),
    tax: parseInt((parseFloat(tax.value) * 100).toFixed(0)),
    product_id: parseInt(product.value),
  };

  return payload;
};

const ChartViewSerializer = async (): Promise<IChartRender[] | null> => {
  const data = await serviceView<IChart>("chart");
  if (!data) return null;

  const payload: IChartRender[] = [];
  data.map(async (el) => {
    const product = (await serviceView<IProduct>("products"))?.find(
      (e) => e.id === el.product_id,
    );
    const total = el.price * el.quantity;
    const tax = product?.tax
      ? formatCurrency(product.tax * el.quantity)
      : "No data!";

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

const createChart = async (event: SubmitEvent) => {
  event.preventDefault();

  const payload = await ChartCreateSerializer(event.target as HTMLFormElement);
  if (
    !payload.product_id ||
    !payload.quantity ||
    !payload.price ||
    !payload.tax
  )
    return;

  const { errors, handled } = await chartHandler(
    payload.product_id,
    payload.quantity,
    payload.price,
    payload.tax,
  );
  if (errors.length > 0) {
    renderErrorMessage(errors);
    return;
  }
  if (handled) {
    renderPage("/");
    return;
  }

  const currentData = await serviceView<IChart>("chart");
  localStorage.setItem(
    "chart",
    JSON.stringify(currentData ? [...currentData, payload] : [payload]),
  );
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

const overwriteProduct = async (
  duplicated: IChart,
  quantity: number,
  chart: IChart[],
): Promise<string | null> => {
  try {
    const maxStock = (await serviceView<IProduct>("products"))?.find(
      (el) => el.id === duplicated.product_id,
    );
    const currentQuantity = chart?.find(
      (el) => el.id === duplicated.id,
    )?.quantity;
    if (!currentQuantity) return null;

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
  } catch {
    return "Internal Error";
  }
};

const fieldsListener = () => {
  const listener = document.querySelector<HTMLSelectElement>("#product");
  if (!listener) return;

  listener.addEventListener("change", async (e) => {
    const id = (e.target as HTMLSelectElement).value;

    const product = (await serviceView<IProduct>("products"))?.find(
      (el) => el.id === parseInt(id),
    );
    const tax = product?.tax;
    const chart = (await serviceView<IChart>("chart"))?.find(
      (el) => el.product_id === product?.id,
    );

    const taxField = document.querySelector<HTMLInputElement>("#tax");
    if (!taxField || !tax) return;
    taxField.value = (tax / 100).toFixed(2);

    const priceField = document.querySelector<HTMLInputElement>("#price");
    if (!priceField || !product?.price) return;
    priceField.value = (product.price / 100).toFixed(2);

    const quantityField = document.querySelector<HTMLInputElement>("#quantity");
    if (!quantityField || !chart) return;
    const stock = product?.stock - chart?.quantity;
    quantityField.max = stock.toString();
  });
};

// -----------------------
// modules/chart/spa.ts
// -----------------------

const loadChart = async () => {
  await renderContent("/");
  await tableEvents("chart", "remove", renderChart, "/");
  await formsEvents(createChart, "#home-form");
  // TODO: Remove products without stock from selection
  await renderSelect<IProduct>("products", "#product", "name", "id");
  fieldsListener();
};

// -----------------------
// modules/chart/validators.ts
// -----------------------

const validateChartName = async (
  product_id: number,
): Promise<string | null> => {
  return validateRelation<IProduct>(product_id, "products", "Product");
};

const validateChartQuantity = async (
  quantity: number,
  product_id: number,
): Promise<string | null> => {
  const max = (await serviceView<IProduct>("products"))?.find(
    (el) => el.id === product_id && el.is_active,
  );
  if (!max) return `This product doesn't exists`;

  return validateNumber(quantity, "Quantity", {
    min: {
      value: 1,
      label: "1",
    },
    max: {
      value: max.stock,
      label: max.stock.toString(),
    },
  });
};

const validateChartPrice = async (
  price: number,
  product_id: number,
): Promise<string | null> => {
  const product = (await serviceView<IProduct>("products"))?.find(
    (el) => el.id === product_id && el.is_active,
  );
  if (!product) return `This product doesn't exists`;

  if (price !== product.price) return "The price is incorrect";
  return null;
};

const validateChartTax = async (
  tax: number,
  product_id: number,
): Promise<string | null> => {
  const product = (await serviceView<IProduct>("products"))?.find(
    (el) => el.id === product_id && el.is_active,
  );
  if (!product) return `This product doesn't exists`;

  if (tax !== product.tax) return "The tax is incorrect";

  return null;
};

const validateChartDuplicated = async (
  product_id: number,
  quantity: number,
): Promise<{ handled: boolean; error?: string }> => {
  const chart = await serviceView<IChart>("chart");
  const duplicated = chart?.find((el) => el.product_id === product_id);
  if (!chart || !duplicated) return { handled: false };

  const error = await overwriteProduct(duplicated, quantity, chart);
  if (error) return { handled: false, error };
  return { handled: true };
};

// -----------------------------------------
// ORDER
// -----------------------------------------

// -----------------------
// modules/order/serializers.ts
// -----------------------

const OrderCreateSerializer = async (): Promise<IOrder | null> => {
  const data = await serviceView<IChart>("chart");
  if (!data) return null;

  const id = await autoIncrement("orders");
  let total_tax = 0;
  let total_price = 0;

  data.map((el) => {
    total_tax += el.tax * el.quantity;
    total_price += el.price * el.quantity;
  });

  const payload: IOrder = {
    id: id,
    total_tax: total_tax,
    total_price: total_price,
    created_at: new Date(),
  };

  return payload;
};

const OrderViewSerializer = async (): Promise<IOrderRender[] | null> => {
  const data = await serviceView<IOrder>("orders");
  if (!data) return null;

  const payload: IOrderRender[] = [];

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

const TransactionCreateSerializer = async (
  order: number,
): Promise<ITransaction[] | null> => {
  const data = await serviceView<IChart>("chart");
  if (!data) return null;

  const id = (await autoIncrement("transactions")) || 1;
  const payload: ITransaction[] = [];

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

const TransactionViewSerializer = async (): Promise<
  ITransactionRender[] | null
> => {
  const url = new URLSearchParams(window.location.search);
  const id = url.get("order");
  if (!id) return null;
  const data = (await serviceView<ITransaction>("transactions"))?.filter(
    (el) => el.is_active && el.order_id === parseInt(id),
  );
  if (!data) return null;

  const payload: ITransactionRender[] = [];
  await data.map(async (el) => {
    const product = (await serviceView<IProduct>("products"))?.find(
      (e) => e.id === el.product_id,
    );
    const category = (await serviceView<ICategory>("categories"))?.find(
      (e) => e.id === product?.category_id,
    )?.name;
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

const finishPurchase = async (event: SubmitEvent) => {
  event.preventDefault();

  const order = await OrderCreateSerializer();
  if (!order) return;

  const currentOrders = await serviceView<IOrder>("orders");
  localStorage.setItem(
    "orders",
    JSON.stringify(currentOrders ? [...currentOrders, order] : [order]),
  );

  const transactions = await TransactionCreateSerializer(order.id);
  if (!transactions) return;

  const currentTransactions = await serviceView<ITransaction>("transactions");
  localStorage.setItem(
    "transactions",
    JSON.stringify(
      currentTransactions
        ? [...currentTransactions, ...transactions]
        : transactions,
    ),
  );

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
  const taxField = document.querySelector<HTMLParagraphElement>("#render-tax");
  const totalField =
    document.querySelector<HTMLParagraphElement>("#render-total");
  if (!taxField || !totalField) return;

  const data = await serviceView<IChart>("chart");
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

const loadDetails = async (id: number) => {
  await renderContent("/details", { order: id.toString() });
  await tableEvents("transactions", "none", renderTransactions);
};

// -----------------------------------------
// PRODUCT
// -----------------------------------------

// -----------------------
// modules/product/handlers.ts
// -----------------------

const productHandler = async (
  name: string,
  stock: number,
  price: number,
  tax: number,
  category: number,
): Promise<ErrorResponse> => {
  const errors = [];

  const nameError = await validateProductName(name);
  if (nameError) errors.push({ field: "#name", message: nameError });

  const stockError = validateProductStock(stock);
  if (stockError) errors.push({ field: "#stock", message: stockError });

  const priceError = validateProductPrice(price);
  if (priceError) errors.push({ field: "#price", message: priceError });

  const taxError = await validateProductTax(tax, price, category);
  if (taxError) errors.push({ field: "#price", message: taxError });

  const categoryError = await validateProductCategory(category);
  if (categoryError)
    errors.push({ field: "#category", message: categoryError });

  return errors;
};

// -----------------------
// modules/product/serializers.ts
// -----------------------

const ProductCreateSerializer = async (
  form: HTMLFormElement,
): Promise<IProduct> => {
  const id = await autoIncrement("products");
  const name = form.elements.namedItem("name") as HTMLInputElement;
  const stock = form.elements.namedItem("stock") as HTMLInputElement;
  const category = form.elements.namedItem("category") as HTMLSelectElement;

  const priceField = form.elements.namedItem("price") as HTMLInputElement;
  const price = parseInt((parseFloat(priceField.value) * 100).toFixed(0));

  const percentTax = (await serviceView<ICategory>("categories"))?.find(
    (el) => el.id === parseInt(category.value),
  )?.tax;
  const tax = ((percentTax || 0) * price) / 100;

  const payload: IProduct = {
    id: id,
    name: name.value.replace(/\s+/g, " ").trim(),
    stock: parseInt(stock.value),
    price: price,
    tax: tax,
    category_id: parseInt(category.value),
    is_active: true,
  };

  return payload;
};

const ProductViewSerializer = async (): Promise<IProductRender[] | null> => {
  const data = (await serviceView<IProduct>("products"))?.filter(
    (el) => el.is_active,
  );
  if (!data) return null;

  const payload: IProductRender[] = [];
  data.map(async (el) => {
    const category = (await serviceView<ICategory>("categories"))?.find(
      (e) => e.id === el.category_id,
    )?.name;

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

const createProduct = async (event: SubmitEvent) => {
  event.preventDefault();

  const payload = await ProductCreateSerializer(
    event.target as HTMLFormElement,
  );
  if (
    !payload.name ||
    !payload.stock ||
    !payload.price ||
    !payload.tax ||
    !payload.category_id
  )
    return;

  const errors = await productHandler(
    payload.name,
    payload.stock,
    payload.price,
    payload.tax,
    payload.category_id,
  );
  if (errors.length > 0) {
    renderErrorMessage(errors);
    return;
  }

  const currentData = await serviceView<IProduct>("products");
  localStorage.setItem(
    "products",
    JSON.stringify(currentData ? [...currentData, payload] : [payload]),
  );
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
  await renderSelect<ICategory>("categories", "#category", "name", "id");
};

// -----------------------
// modules/product/validators.ts
// -----------------------

const validateProductName = async (name: string): Promise<string | null> => {
  return validateText<IProduct>(name, "products", "Product");
};

const validateProductCategory = async (
  category_id: number,
): Promise<string | null> => {
  return validateRelation<ICategory>(category_id, "categories", "category");
};

const validateProductStock = (stock: number): string | null => {
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

const validateProductPrice = (price: number): string | null => {
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

const validateProductTax = async (
  tax: number,
  price: number,
  category_id: number,
): Promise<string | null> => {
  if (!tax) return "No tax";
  const category = (await serviceView<ICategory>("categories"))?.find(
    (el) => el.id === category_id,
  )?.tax;
  if (!category) return "No category found";

  const compare = (category * price) / 100;

  if (compare !== tax) return "Invalid tax value";

  return null;
};
