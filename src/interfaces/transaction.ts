interface ITransaction {
  id: number;
  state: "active" | "bought";
  quantity: number;
  price: number;
  product_id: number;
  created_at: Date;
  is_active: boolean;
}

export { ITransaction };
