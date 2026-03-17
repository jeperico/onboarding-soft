# Tech Onboarding - PDV

## Business Rules:

1. As seller: register categories with: tax;
2. As seller: register products with: categories | stock | price
3. As manager: view sales history by date
4. As client: add products on cart
5. As client: finish purchase with products

## Data Modeling:

> categories:

- id: uuid
- name: string
- tax: number
- is_active: boolean

> products:

- id: uuid
- name: string
- stock: int
- price: int
- category_id: uuid fk(categories)
- is_active: boolean

> transaction:

- id: uuid
- state: 'active' | 'bought'
- quantity: int
- price: int
- product_id: uuid fk(products)
- created_at: date
- is_active: boolean

## Test Cases:

### Transactions

> Product:

- [TYPE]: text string
- [SIZE]: max | min
- [RegEx]:

* must accept letters, and numbers only pre followed by a letter
* mustn't aceppt white spaces, special carachters or HTML tags
* must be a unique field (validate white spaces and letters case)

> Quantity:

- [TYPE]: numbers int
- [SIZE]: max | min
- [RegEx]:

* must accept integers numbers
* must be less than the product current stock
* mustn't accept white spaces, special carachters or HTML tags

> Tax:

- [TYPE]: int or decimal
- [SIZE]: max 100% | min 0.01
- [RegEx]: toFixed(2) decimal floats

* must match to the product category tax
* must accept integers or decimal with 2 decimal plates
* mustn't be edited
* mustn't accept white spaces, special carachters or HTML tags

> Price:

- [TYPE]: int presented by cents
- [SIZE]: max | min 001
- [RegEx]: R$ x,xx

* must accept integers (decimal with 2 decimal plates)
* must match to the product price
* mustn't be edited
* mustn't accept white spaces, special carachters or HTML tags

### Products

> Product:

- [TYPE]: text string
- [SIZE]: max | min
- [RegEx]:

* must accept letters, and numbers only pre followed by a letter
* mustn't aceppt white spaces, special carachters or HTML tags
* must be a unique field (validate white spaces and letters case)

> Category:

- [TYPE]: text string
- [SIZE]: max | min
- [RegEx]:

* must accept letters, and numbers only pre followed by a letter
* mustn't aceppt white spaces, special carachters or HTML tags

> Price:

- [TYPE]: int presented by cents
- [SIZE]: max | min 001
- [RegEx]: R$ x,xx

* must accept integers (decimal with 2 decimal plates)
* mustn't accept white spaces, special carachters or HTML tags

> Stock:

- [TYPE]: numbers int
- [SIZE]: max | min
- [RegEx]:

* must accept integers numbers
* mustn't accept white spaces, special carachters or HTML tags

### Categories

> Category:

- [TYPE]: text string
- [SIZE]: max 100 | min 2

* must accept letters, and numbers only pre followed by a letter
* mustn't aceppt white spaces, special carachters or HTML tags
* must be a unique field (validate white spaces and letters case)

> Tax

- [TYPE]: int or decimal
- [SIZE]: max 100% | min 0.01
- [RegEx]: toFixed(2) decimal floats

* must accept integers or decimal with 2 decimal plates
* mustn't accept white spaces, special carachters or HTML tags
