import { ICategory } from "../../interfaces/category.js";
import { IProduct, IProductRender } from "../../interfaces/product.js";
import { autoIncrement } from "../../utils/auto-increment.js";
import { serviceView } from "../base/base-services.js";
import { formatCurrency } from "../../utils/format-currency.js";

const productSerializer = async (form: HTMLFormElement): Promise<IProduct> => {
  const id = await autoIncrement("products");
  const name = form.elements.namedItem("name") as HTMLInputElement;
  const stock = form.elements.namedItem("stock") as HTMLInputElement;
  // TODO: RegEx on field to R$ x,xx
  const price = form.elements.namedItem("price") as HTMLInputElement;
  const category = form.elements.namedItem("category") as HTMLSelectElement;

  const payload: IProduct = {
    id: id,
    name: name.value.replace(/\s+/g, " ").trim(),
    stock: parseInt(stock.value),
    price: parseInt(price.value),
    category_id: parseInt(category.value),
    is_active: true,
  };

  return payload;
};

const productTableSerializer = async (): Promise<IProductRender[] | null> => {
  const data = await serviceView<IProduct>("products");
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

export { productSerializer, productTableSerializer };
