import { ICategory } from "../../interfaces/category.js";
import { IProduct } from "../../interfaces/product.js";
import { baseServiceView } from "../../utils/base-services.js";
import {
  baseValidateNumber,
  baseValidateRelation,
} from "../base/validators.js";

const validateProduct = async (value: number): Promise<string | null> => {
  return baseValidateRelation<IProduct>(value, "products", "Product");
};
const validateQuantity = async (
  value: number,
  product: number,
): Promise<string | null> => {
  const max = (await baseServiceView<IProduct>("products"))?.find(
    (el) => el.id === product && el.is_active,
  );
  if (!max) return `This product doesn't exists`;

  return baseValidateNumber(value, "Quantity", {
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

const validatePrice = async (
  value: number,
  quantity: number,
  product_id: number,
): Promise<string | null> => {
  const product = (await baseServiceView<IProduct>("products"))?.find(
    (el) => el.id === product_id && el.is_active,
  );
  if (!product) return `This product doesn't exists`;
  const category = (await baseServiceView<ICategory>("categories"))?.find(
    (el) => el.id === product.category_id,
  );
  if (!category) return `The product category doesn't exists`;

  // +--------------------------------------+
  // |   BUSINESS RULE TO CALCULATE PRICE   |
  // +--------------------------------------+
  const tax = (product.price * category.tax * quantity) / 100;
  const price = quantity * product.price + tax;

  if (value !== price) return "The price is incorrect";
  return null;
};

export { validateProduct, validateQuantity, validatePrice };
