interface ITransaction {
  id: number;
  state: "active" | "bought";
  amount: number;
  price: number;
  product_id: string;
  created_at: Date;
  is_active: boolean;
}

export { ITransaction };
