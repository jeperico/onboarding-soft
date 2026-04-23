import { IProduct } from "../../interfaces/product.js";
import { serviceView } from "../base/base-services.js";
import { validateNumber, validateRelation } from "../base/validators.js";
import { IChart } from "../../interfaces/chart.js";
import { overwriteProduct } from "./services.js";

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
  if (error !== null) alert(error);

  return error;
};

const validateChartPrice = async (
  price: number,
  product_id: number,
): Promise<string | null> => {
  const raw = await serviceView<IProduct>("products");
  const product = raw?.find((el) => el.id === product_id && el.is_active);
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

export {
  validateChartName,
  validateChartQuantity,
  validateChartPrice,
  validateChartTax,
  validateChartDuplicated,
};
