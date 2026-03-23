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

export { IChart, IChartRender };
