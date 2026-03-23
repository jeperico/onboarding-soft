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

export { ITransaction, ITransactionRender };
