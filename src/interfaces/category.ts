interface ICategory {
  id: number;
  name: string;
  tax: number;
  is_active: boolean;
}

interface ICategoryRender {
  id: string;
  name: string;
  tax: string;
}

export { ICategory, ICategoryRender };
