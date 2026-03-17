interface ITransaction {
  id: number;
  quantity: number;
  price: number;
  product_id: number;
  is_active: boolean;
}

interface ITransactionRender {
  id: string;
  tax: string;
  total: string;
}

export { ITransaction, ITransactionRender };
