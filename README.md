# Onboarding Soft - Point of Sale System

A vanilla HTML project enhanced with Single Page Application (SPA) logic implemented in pure TypeScript. This Point of Sale system manages products, categories, shopping cart, and sales transactions using browser localStorage - no frameworks, no libraries, just clean TypeScript and the DOM API.

## Philosophy

This project demonstrates how to build a modern SPA experience without relying on frameworks like React, Vue, or Angular. Starting from vanilla HTML, we've implemented:

- **Client-side routing** - Navigate between pages without full reloads
- **Dynamic rendering** - Update the DOM based on application state
- **State management** - Handle data flow with localStorage
- **Modular architecture** - Organize code into reusable modules
- **Type safety** - Leverage TypeScript for robust development

All achieved with pure TypeScript and native browser APIs.

## Tech Stack

- **Frontend**: TypeScript, Vanilla JavaScript
- **Server**: Express.js (static file serving)
- **Storage**: Browser localStorage (no backend database)
- **Build**: TypeScript Compiler (tsc)

## Features

- **Category Management** - Create and manage product categories with custom tax rates
- **Product Catalog** - Add products with stock levels, pricing, and category assignment
- **Shopping Cart** - Add/remove products with real-time price and tax calculations
- **Order History** - View completed transactions and order details
- **Transaction Details** - Itemized receipts for each order

## Prerequisites

- **Node.js** (v14 or higher)
- **npm** (comes with Node.js)
- **Make** (optional, but recommended)
  - Linux/WSL: Usually pre-installed
  - macOS: Install via Xcode Command Line Tools
  - Windows: Use WSL or install via chocolatey

## Quick Start

### Option 1: Using Make (Recommended)

1. **First Time Setup**
   ```bash
   make start
   ```

2. **Daily Development**
   ```bash
   # Terminal 1: Auto-compile TypeScript
   make watch
   
   # Terminal 2: Run development server
   make serve
   ```

3. **Open Browser**
   - Navigate to `http://localhost:3000`
   - The app uses localStorage, so data persists in your browser

4. **Making Changes**
   - Edit TypeScript files in `src/`
   - Watch mode will auto-compile to `src/build/`
   - Refresh browser to see changes

### Option 2: Using npm

```bash
# Clone the repository
git clone https://github.com/jeperico/onboarding-soft
cd onboarding-soft

# Install dependencies
npm install

# Build TypeScript
npm run build

# Terminal 1: Watch mode
npm run dev

# Terminal 2: Start server
npm run serve

# Open browser at http://localhost:3000
```

## Makefile Commands

Run `make help` to see all available commands:

```bash
make help          # Show help menu with all commands
make start         # Install dependencies and build project
make install       # Install npm dependencies
make build         # Compile TypeScript once
make watch         # Auto-compile on file changes (development)
make dev           # Alias for 'make watch'
make serve         # Start Express server on port 3000
make clean         # Remove build artifacts and node_modules
make info          # Display detailed project information
```

## Project Structure

```
onboarding-soft/
├── src/
│   ├── interfaces/      # TypeScript interfaces (IProduct, ICategory, etc.)
│   ├── modules/         # Business logic modules
│   │   ├── base/        # Core services, validators, event listeners
│   │   ├── category/    # Category management
│   │   ├── product/     # Product catalog
│   │   ├── chart/       # Shopping cart
│   │   └── order/       # Order history
│   ├── spa/             # SPA routing and rendering
│   ├── types/           # Type definitions
│   ├── utils/           # Helper functions
│   ├── styles/          # CSS stylesheets
│   ├── app/             # HTML templates
│   ├── build/           # Compiled JavaScript (generated)
│   └── all-in-one.ts    # Main entry point
├── index.html           # Application entry point
├── server.js            # Express server
├── tsconfig.json        # TypeScript configuration
├── Makefile             # Build automation and documentation
└── package.json         # npm dependencies and scripts
```

## Application Routes

- `/` - Home (Shopping Cart)
- `/products` - Product Management
- `/categories` - Category Management
- `/history` - Order History
- `/details` - Transaction Details

## Data Storage

All data is stored in browser localStorage:

- `categories` - Product categories with tax rates
- `products` - Product catalog with stock levels
- `chart` - Active shopping cart items
- `orders` - Completed order summaries
- `transactions` - Individual order line items

## Validation Rules

- **Category Names**: 3-28 characters, letters/numbers, unique
- **Product Names**: 3-28 characters, letters/numbers, unique
- **Tax Rates**: 0-100%, up to 2 decimal places
- **Prices**: Stored as cents (integer), displayed as Brazilian Real (R$)
- **Stock**: Positive integers, validated against cart quantity

## Additional Resources

- Run `make info` for detailed project information
- Check `base.md` for business rules and test cases
- See `Makefile` for complete build documentation
