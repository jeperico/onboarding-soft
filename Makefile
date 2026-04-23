# ============================================================================
# Onboarding Soft - Point of Sale (PDV) System
# ============================================================================
# A TypeScript-based Single Page Application (SPA) for managing products,
# categories, shopping cart, and sales transactions using localStorage.
#
# ARCHITECTURE:
#   - Frontend: TypeScript SPA with modular structure
#   - Storage: Browser localStorage (no backend database)
#   - Build: TypeScript compiler (tsc)
#   - Server: Express.js for static file serving
#   - Bundling: All-in-one compiled file (src/build/all-in-one.js)
#
# PROJECT STRUCTURE:
#   src/
#   ├── interfaces/     - TypeScript interfaces (IProduct, ICategory, etc.)
#   ├── modules/        - Business logic modules (product, category, chart, order)
#   ├── spa/            - SPA routing and rendering logic
#   ├── types/          - Type definitions
#   ├── utils/          - Helper functions (currency, validation, etc.)
#   ├── styles/         - CSS stylesheets
#   └── all-in-one.ts   - Main entry point (compiles all modules)
#
# MODULES:
#   - base:     Core services (CRUD operations, event listeners, validators)
#   - category: Category management with tax rates
#   - product:  Product catalog with stock and pricing
#   - chart:    Shopping cart functionality
#   - order:    Order history and transaction management
#
# ============================================================================

.PHONY: help start install build dev watch serve clean info test

# Default target - show help
help:
	@echo "╔════════════════════════════════════════════════════════════════╗"
	@echo "║          Onboarding Soft - PDV System Makefile                 ║"
	@echo "╚════════════════════════════════════════════════════════════════╝"
	@echo ""
	@echo "QUICK START:"
	@echo "  make start          - Install dependencies and start development"
	@echo "  make serve          - Start the Express server (port 3000)"
	@echo ""
	@echo "DEVELOPMENT:"
	@echo "  make install        - Install npm dependencies"
	@echo "  make build          - Compile TypeScript once"
	@echo "  make watch          - Watch mode: auto-compile on file changes"
	@echo "  make dev            - Alias for 'make watch'"
	@echo ""
	@echo "UTILITIES:"
	@echo "  make clean          - Remove compiled files and node_modules"
	@echo "  make info           - Display project information"
	@echo "  make help           - Show this help message"
	@echo ""
	@echo "WORKFLOW:"
	@echo "  1. make start       - First time setup"
	@echo "  2. make watch       - In terminal 1: auto-compile TypeScript"
	@echo "  3. make serve       - In terminal 2: run development server"
	@echo "  4. Open browser     - Navigate to http://localhost:3000"
	@echo ""

# ============================================================================
# MAIN TARGETS
# ============================================================================

# Complete setup and start development
start: install build
	@echo "✓ Setup complete! Next steps:"
	@echo "  1. Run 'make watch' in one terminal (auto-compile)"
	@echo "  2. Run 'make serve' in another terminal (dev server)"
	@echo "  3. Open http://localhost:3000 in your browser"

# Install dependencies
install:
	@echo "📦 Installing dependencies..."
	npm install
	@echo "✓ Dependencies installed"

# Build TypeScript once
build:
	@echo "🔨 Compiling TypeScript..."
	tsc
	@echo "✓ Build complete: src/build/all-in-one.js"

# Watch mode - auto-compile on changes
watch:
	@echo "👀 Watching for TypeScript changes..."
	@echo "   Press Ctrl+C to stop"
	tsc -w

# Alias for watch
dev: watch

# Start Express server
serve:
	@echo "🚀 Starting development server..."
	@echo "   Server: http://localhost:3000"
	@echo "   Press Ctrl+C to stop"
	node server.js

# ============================================================================
# UTILITY TARGETS
# ============================================================================

# Clean build artifacts and dependencies
clean:
	@echo "🧹 Cleaning project..."
	rm -rf node_modules
	rm -rf src/build
	@echo "✓ Clean complete"

# Display project information
info:
	@echo "╔════════════════════════════════════════════════════════════════╗"
	@echo "║                    PROJECT INFORMATION                         ║"
	@echo "╚════════════════════════════════════════════════════════════════╝"
	@echo ""
	@echo "PROJECT: Onboarding Soft - Point of Sale System"
	@echo "TYPE:    Single Page Application (SPA)"
	@echo "TECH:    TypeScript, Express.js, localStorage"
	@echo ""
	@echo "FEATURES:"
	@echo "  • Category Management (with tax rates)"
	@echo "  • Product Catalog (stock, pricing, categories)"
	@echo "  • Shopping Cart (add/remove products)"
	@echo "  • Order History (view past transactions)"
	@echo "  • Transaction Details (itemized receipts)"
	@echo ""
	@echo "DATA STORAGE:"
	@echo "  • categories   - Product categories with tax rates"
	@echo "  • products     - Product catalog with stock levels"
	@echo "  • chart        - Active shopping cart items"
	@echo "  • orders       - Completed order summaries"
	@echo "  • transactions - Individual order line items"
	@echo ""
	@echo "ROUTES:"
	@echo "  /              - Home (Shopping Cart)"
	@echo "  /products      - Product Management"
	@echo "  /categories    - Category Management"
	@echo "  /history       - Order History"
	@echo "  /details       - Transaction Details"
	@echo ""
	@echo "BUILD OUTPUT:"
	@echo "  src/build/all-in-one.js - Compiled application bundle"
	@echo ""
	@echo "CONFIGURATION:"
	@echo "  tsconfig.json  - TypeScript compiler settings"
	@echo "  server.js      - Express server configuration"
	@echo "  index.html     - Application entry point"
	@echo ""

# ============================================================================
# DEVELOPMENT NOTES
# ============================================================================
#
# FEATURE FLAGS (src/all-in-one.ts):
#   FEATURE_FLAG_ENABLE_ROUTES - Enable client-side routing
#   FEATURE_FLAG_ENABLE_SERVER - Enable server-side rendering
#
# VALIDATION RULES:
#   • Category names: 3-28 chars, letters/numbers, unique
#   • Product names:  3-28 chars, letters/numbers, unique
#   • Tax rates:      0-100%, up to 2 decimal places
#   • Prices:         Stored as cents (integer), displayed as currency
#   • Stock:          Positive integers, validated against cart quantity
#
# CURRENCY FORMAT:
#   • Internal: Stored as cents (e.g., 1000 = R$ 10.00)
#   • Display:  Brazilian Real (R$ x,xx) via formatCurrency()
#
# SOFT DELETE:
#   • Categories and Products use 'is_active' flag
#   • Orders and Transactions are permanent records
#
# ============================================================================
