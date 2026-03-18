import { ICategory, ICategoryRender } from "../../interfaces/category.js";
import { autoIncrement } from "../../utils/auto-increment.js";
import { baseServiceView } from "../../utils/base-services.js";

const categorySerializer = async (
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

const categoryTableSerializer = async (): Promise<ICategoryRender[] | null> => {
  const data = await baseServiceView<ICategory>("categories");
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

export { categorySerializer, categoryTableSerializer };
