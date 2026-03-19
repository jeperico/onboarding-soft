import { ICategory } from "../../interfaces/category.js";
import { IProduct } from "../../interfaces/product.js";
import { serviceView } from "../base/base-services.js";
import {
  baseValidateNumber,
  baseValidateRelation,
} from "../base/validators.js";
import { IChart } from "../../interfaces/chart.js";
import { overwriteProduct } from "./services.js";

const validateProduct = async (product_id: number): Promise<string | null> => {
  return baseValidateRelation<IProduct>(product_id, "products", "Product");
};

const validateQuantity = async (
  quantity: number,
  product_id: number,
): Promise<string | null> => {
  const max = (await serviceView<IProduct>("products"))?.find(
    (el) => el.id === product_id && el.is_active,
  );
  if (!max) return `This product doesn't exists`;

  return baseValidateNumber(quantity, "Quantity", {
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

const validateTax = async (
  tax: number,
  product_id: number,
): Promise<string | null> => {
  const product = (await serviceView<IProduct>("products"))?.find(
    (el) => el.id === product_id && el.is_active,
  );
  if (!product) return `This product doesn't exists`;
  const category = (await serviceView<ICategory>("categories"))?.find(
    (el) => el.id === product.category_id,
  );
  if (!category) return `The product category doesn't exists`;

  if (tax !== category.tax) return "The tax is incorrect";

  return null;
};

const validateDuplicatedProduct = async (
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

export {
  validateProduct,
  validateQuantity,
  validatePrice,
  validateTax,
  validateDuplicatedProduct,
};
