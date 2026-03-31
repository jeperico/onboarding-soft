import { ICategory } from "../../interfaces/category.js";
import { IProduct, IProductRender } from "../../interfaces/product.js";
import { autoIncrement } from "../../utils/auto-increment.js";
import { serviceView } from "../base/base-services.js";
import { formatCurrency } from "../../utils/format-currency.js";

const ProductCreateSerializer = async (
  form: HTMLFormElement,
): Promise<{ payload: IProduct; requireds: ErrorResponse }> => {
  const id = await autoIncrement("products");
  const name = form.elements.namedItem("name") as HTMLInputElement;
  const stock = form.elements.namedItem("stock") as HTMLInputElement;
  const category = form.elements.namedItem("category") as HTMLSelectElement;

  const priceField = form.elements.namedItem("price") as HTMLInputElement;
  const price = parseInt((parseFloat(priceField.value) * 100).toFixed(0));

  const percentTax = (await serviceView<ICategory>("categories"))?.find(
    (el) => el.id === parseInt(category.value),
  )?.tax;
  const tax = (((percentTax || 0) * price) / 100).toFixed(0);

  const payload: IProduct = {
    id: id,
    name: name.value.replace(/\s+/g, " ").trim(),
    stock: parseInt(stock.value),
    price: price,
    tax: parseInt(tax),
    category_id: parseInt(category.value),
    is_active: true,
  };

  const requireds: ErrorResponse = [];
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

const ProductViewSerializer = async (): Promise<IProductRender[] | null> => {
  const data = (await serviceView<IProduct>("products"))?.filter(
    (el) => el.is_active,
  );
  if (!data) return null;
  const categories = await serviceView<ICategory>("categories");

  const payload: IProductRender[] = [];
  data.map((el) => {
    const category = categories?.find((e) => e.id === el.category_id)?.name;

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

export { ProductCreateSerializer, ProductViewSerializer };
