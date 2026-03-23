const routes = {
    "/": {
        title: "Home",
        href: "/src/app/chart.html",
        content: `
    <section>
      <!-- Base form -->
      <form id="home-form">
        <select name="product" id="product" name="product">
          <option value="" disabled selected hidden>Product</option>
        </select>
        <div>
          <input
            type="number"
            name="quantity"
            id="quantity"
            placeholder="Quantity"
            min="1"
          />
          <div class="currency-input">
            <p>R$</p>
            <input
              type="number"
              step="0.01"
              min="0.01"
              name="tax"
              id="tax"
              placeholder="Tax"
              disabled
            />
          </div>
          <div class="currency-input">
            <p>R$</p>
            <input
              type="number"
              min="0"
              name="price"
              id="price"
              step="0.01"
              min="0.01"
              placeholder="Unit Price"
              disabled
            />
          </div>
        </div>

        <button type="submit" class="button-primary">Add to Chart</button>
        <div class="errors-form-container"></div>
      </form>
    </section>

    <!-- Horizontal Line -->
    <span class="horizontal-line"></span>

    <!-- Cart Division -->
    <section id="chart-section">
      <!-- Base Table -->
      <table>
        <thead>
          <th class="font-bold">Product</th>
          <th class="font-bold">Unit Price</th>
          <th class="font-bold">Quantity</th>
          <th class="font-bold">Tax</th>
          <th class="font-bold">Total</th>
          <th class="font-bold">Action</th>
        </thead>
        <tbody id="tbody-chart"></tbody>
      </table>
      <!-- Finish buy form -->
      <form id="chart-details">
        <div>
          <div>
            <p class="font-bold">Tax</p>
            <p class="font-bold">Total:</p>
          </div>
          <div>
            <p id="render-tax">R$ 0,00</p>
            <p id="render-total">R$ 0,00</p>
          </div>
        </div>
        <div>
          <button class="button-secondary">Cancel</button>
          <button type="submit" class="button-primary">Finish</button>
        </div>
      </form>
    </section>
    `,
    },
    "/products": {
        title: "Products",
        href: "/src/app/products.html",
        content: `
    <section>
      <!-- Base form -->
      <form id="product-form">
        <div>
          <input type="text" id="name" name="name" placeholder="Product" />
        </div>
        <div>
          <select name="category" id="category">
            <option value="" disabled selected hidden>Category</option>
          </select>
          <div class="currency-input">
            <p>R$</p>
            <input
              type="number"
              name="price"
              id="price"
              max="99999999"
              min="0.01"
              step="0.01"
              placeholder="Price"
            />
          </div>
          <input
            type="number"
            name="stock"
            id="stock"
            placeholder="Stock"
            min="1"
            max="999999"
            step="1"
          />
        </div>

        <button type="submit" class="button-primary">Add Product</button>
        <div class="errors-form-container"></div>
      </form>
    </section>

    <!-- Horizontal Line -->
    <span class="horizontal-line"></span>

    <section>
      <!-- Base Table -->
      <table>
        <thead>
          <th class="font-bold">Code</th>
          <th class="font-bold">Product</th>
          <th class="font-bold">Stock</th>
          <th class="font-bold">Unit price</th>
          <th class="font-bold">Category</th>
          <th class="font-bold">Action</th>
        </thead>
        <tbody id="tbody-products"></tbody>
      </table>
    </section>
    `,
    },
    "/categories": {
        title: "Categories",
        href: "/src/app/categories.html",
        content: `
    <section>
      <!-- Base form -->
      <form id="category-form">
        <div>
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="Category"
          />
          <div class="percent-input">
            <p>%</p>
            <input
              type="number"
              min="1"
              max="100"
              id="tax"
              name="tax"
              required
              placeholder="Tax"
            />
          </div>
        </div>

        <button type="submit" class="button-primary">Add Category</button>
        <div class="errors-form-container"></div>
      </form>
    </section>

    <!-- Horizontal Line -->
    <span class="horizontal-line"></span>

    <!-- Base Table -->
    <section>
      <table>
        <thead>
          <th class="font-bold">Code</th>
          <th class="font-bold">Category</th>
          <th class="font-bold">Tax</th>
          <th class="font-bold">Action</th>
        </thead>
        <tbody id="tbody-category"></tbody>
      </table>
    </section>
    `,
    },
    "/history": {
        title: "History",
        href: "/src/app/history.html",
        content: `
    <section>
      <!-- Base Table -->
      <table>
        <thead>
          <th class="font-bold">Code</th>
          <th class="font-bold">Tax</th>
          <th class="font-bold">Total</th>
          <th class="font-bold">Action</th>
        </thead>
        <tbody id="tbody-history"></tbody>
      </table>
    </section>
    `,
    },
    "/details": {
        title: "Details",
        href: "/src/app/details.html",
        content: `
    <section>
      <!-- Base Table -->
      <table>
        <thead>
          <th class="font-bold">Code</th>
          <th class="font-bold">Produto</th>
          <th class="font-bold">Categoria</th>
          <th class="font-bold">Quantity</th>
          <th class="font-bold">Tax</th>
          <th class="font-bold">Total</th>
        </thead>
        <tbody id="tbody-details"></tbody>
      </table>
    </section>
    `,
    },
};
export default routes;
