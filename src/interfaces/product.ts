interface IProduct {
  id: number;
  name: string;
  stock: number;
  tax: number;
  price: number;
  category_id: number;
  is_active: boolean;
}

interface IProductRender {
  id: string;
  name: string;
  stock: string;
  price: string;
  category: string;
}

export { IProduct, IProductRender };
