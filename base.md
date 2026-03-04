# Tech Onboarding - PDV

## Business Rules:

1. As seller: register categories with: tax;
2. As seller: register products with: categories | amount | price
3. As manager: view sales history by date
4. As client: add products on cart
5. As client: finish purchase with products

## Data Modeling:

> categories:

- id: int
- name: string
- tax: number
- is_active: boolean

> products:

- id: int
- name: string
- stock: int
- price: int
- category_id: uuid fk(categories)
- is_active: boolean

> transaction:

- id: int
- product_id: uuid fk(products)
- amount: int
- created_at: date
