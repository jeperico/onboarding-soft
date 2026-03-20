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

export { IOrder, IOrderRender };
