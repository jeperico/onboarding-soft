interface ITransaction {
  id: number;
  state: "active" | "bought";
  amount: number;
  product_id: number;
  created_at: Date;
  is_active: boolean;
}

export { ITransaction };
