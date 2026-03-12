interface IProduct {
  id: string;
  name: string;
  stock: number;
  price: number;
  category_id: string;
  is_active: boolean;
}

export { IProduct };
