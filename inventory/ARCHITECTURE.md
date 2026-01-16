# SmartRetail Pro - Inventory Management System

A modern, responsive React-based inventory management system built with proper component architecture, context API for state management, and Tailwind CSS for styling.

## Project Structure

```
src/
├── components/
│   ├── Layout/
│   │   └── Sidebar.jsx              # Main navigation sidebar
│   ├── Screens/
│   │   ├── ItemListScreen.jsx       # Display all inventory items
│   │   ├── ItemDetailScreen.jsx     # Detailed view of single item with tabs
│   │   ├── StockOverviewScreen.jsx  # Dashboard with stock metrics
│   │   ├── BatchWiseStockScreen.jsx # Batch and expiry tracking
│   │   ├── CategoryManagementScreen.jsx  # Category CRUD operations
│   │   ├── BrandManagementScreen.jsx    # Brand management
│   │   ├── SupplierManagementScreen.jsx # Supplier management
│   │   ├── StockValuationScreen.jsx     # Stock value calculation
│   │   ├── StockAgingScreen.jsx         # Aging bucket analysis
│   │   └── PlaceholderScreen.jsx        # Placeholder for future features
│   └── Modals/
│       ├── AddItemModal.jsx         # Add new inventory item
│       ├── AddCategoryModal.jsx     # Add new category
│       ├── FilterModal.jsx          # Item filtering options
│       └── AddItemModal.jsx         # Item creation modal
├── context/
│   ├── InventoryContext.jsx         # UI state management (modals, screens, filters)
│   └── DataContext.jsx              # Data state management (items, suppliers, etc.)
├── config/
│   └── navigation.js                # Navigation structure and routing config
├── utils/
│   └── helpers.js                   # Utility functions and helper methods
├── App.jsx                          # Main app component with routing logic
├── App.js                           # (Old file - can be deleted)
├── index.js                         # Entry point
└── index.css                        # Global styles + Tailwind imports
```

## Key Features

### 1. Item Management
- **Item List**: View all inventory items with search and filtering
- **Item Detail**: Comprehensive item view with multiple tabs:
  - Summary: Basic item information and stock details
  - Prices: Price history and trends
  - Stock History: All stock movements (GRN, Sales, Adjustments, Transfers)
  - Batch & Expiry: Batch tracking with expiry dates
  - Suppliers: Supplier information and reliability
  - Sales: Sales data and revenue tracking
  - Reorder Alerts: Reorder level status and purchase order creation

### 2. Stock Operations
- **Stock Overview**: Dashboard with real-time metrics
  - Total items count
  - Total stock value
  - Low stock items
  - Out of stock items
  - Expiring items
- **Batch-wise Stock**: Track inventory by batch with expiry monitoring
- **Stock Valuation**: Calculate total inventory value using different methods (FIFO, Weighted Average)
- **Stock Aging**: Identify dead stock with aging bucket analysis (0-30, 31-60, 61-90, 90+ days)

### 3. Master Data Management
- **Category Management**: Create and manage product categories
- **Brand Management**: Manage brands with supplier relationships
- **Supplier Management**: Supplier information and contact details

### 4. Advanced Features
- Comprehensive filtering system for items
- Export to CSV functionality
- Real-time search capabilities
- Status-based color coding
- Responsive modal dialogs
- Context-based state management

## Technologies Used

- **React 18**: Frontend framework
- **React Hooks**: State management (useState, useContext)
- **Context API**: Global state management
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library
- **JavaScript ES6+**: Modern JavaScript features

## Component Architecture

### Context Providers

#### InventoryContext
Manages UI and form state:
- Active screen navigation
- Modal visibility states
- Search queries and filters
- Form data for categories, suppliers, brands
- Selected item tracking
- Stock adjustments and damage entries

#### DataContext
Manages business data:
- Items inventory
- Batches and expiry information
- Suppliers list
- Brands list
- Categories
- Warehouses
- Item details (SKU, price history, stock history, etc.)

### Screen Components

All screens are functional components using hooks and context for state management. They follow a consistent pattern:

```jsx
const ScreenComponent = () => {
  const { uiState } = useInventory();
  const { businessData } = useData();
  
  // Component logic
  
  return (
    // JSX content
  );
};
```

### Modal Components

Modals are conditionally rendered based on context state and include:
- Add Item Modal
- Add Category Modal
- Add Supplier Modal (in SupplierManagementScreen)
- Add Brand Modal (in BrandManagementScreen)
- Filter Modal

## Styling

The project uses **Tailwind CSS** for all styling with:
- Responsive grid layouts
- Custom color schemes for status indicators
- Consistent spacing and typography
- Hover effects and transitions
- Dark sidebar navigation
- Light content areas

### Color Scheme
- **Success**: Green (#10B981, #059669)
- **Warning**: Yellow/Orange (#F59E0B, #D97706)
- **Error**: Red (#EF4444, #DC2626)
- **Info**: Blue (#3B82F6, #1D4ED8)
- **Primary**: Blue gradient

## Data Models

### Item
```javascript
{
  id: 'ITM001',
  name: 'Product Name',
  category: 'Category',
  brand: 'Brand Name',
  supplier: 'Supplier Name',
  stock: 100,
  price: 450.00,
  status: 'In Stock',
  warehouse: 'Main Warehouse',
  expiryDate: '2026-06-15'
}
```

### Batch
```javascript
{
  id: 'BAT001',
  itemId: 'ITM001',
  itemName: 'Product Name',
  batchNumber: 'CC-2025-001',
  quantity: 100,
  expiryDate: '2026-06-15',
  purchaseDate: '2025-06-15',
  warehouse: 'Main Warehouse',
  status: 'Safe' // Safe, Near Expiry, Expired
}
```

## Utility Functions

Located in `src/utils/helpers.js`:
- `getStatusColor()`: Returns Tailwind color classes based on status
- `exportToCSV()`: Export data to CSV file
- `getAlertColor()`: Color for expiry alerts
- `getBatchAlert()`: Determine batch alert status
- `getAgingBucket()`: Categorize stock aging
- `formatCurrency()`: Format currency values
- `getDaysInStock()`: Calculate days in stock

## Routing & Navigation

Navigation is managed through:
1. **navigationConfig** in `src/config/navigation.js` - Defines menu structure
2. **activeScreen** state in InventoryContext - Tracks current screen
3. **setActiveScreen()** - Function to switch screens
4. **renderScreen()** - Main App component renders appropriate screen based on activeScreen

## Usage Examples

### Adding a New Screen

1. Create new file in `src/components/Screens/NewScreen.jsx`
2. Import context hooks:
```jsx
import { useInventory } from '../../context/InventoryContext';
import { useData } from '../../context/DataContext';
```
3. Create functional component with hooks
4. Import in `App.jsx` and add to `renderScreen()` switch statement
5. Update `src/config/navigation.js` to add menu item

### Using Context in Components

```jsx
const MyComponent = () => {
  const { activeScreen, setActiveScreen } = useInventory();
  const { items, setItems } = useData();
  
  return (
    // Component JSX
  );
};
```

### Adding New Data

Extend DataContext with new state and provider:

```jsx
const [newData, setNewData] = useState([]);

const value = {
  // ... existing values
  newData,
  setNewData,
};
```

## Future Enhancements

Placeholder screens are ready for:
- Item Detail with multiple tabs (partially implemented)
- Barcode printing functionality
- Expiry calendar view
- Stock adjustment workflow
- Damage entry tracking
- Stock transfer creation and approval
- Advanced reporting features

## Configuration

### Navigation Configuration
Edit `src/config/navigation.js` to modify:
- Menu sections and labels
- Available screens per section
- Icons for menu items and screens

### Tailwind Configuration
Modify `tailwind.config.js` for:
- Custom colors
- Typography settings
- Responsive breakpoints
- Plugin configurations

### PostCSS Configuration
`postcss.config.js` configures Tailwind CSS processing

## Building for Production

```bash
npm run build
```

Creates optimized production build in `build/` directory.

## Running the Application

```bash
npm start
```

Starts development server at `http://localhost:3000` (or next available port)

## Performance Optimizations

- Component-based architecture for better code splitting
- Context API for efficient state management
- Memoization ready for future optimization
- Lazy loading support for screens
- CSS class utility approach with Tailwind

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Notes

- All dates use format: YYYY-MM-DD
- Currency is in LKR (Sri Lankan Rupees)
- Application uses sample data for demonstration
- Real backend integration can be added by modifying data fetching in context providers
- Error handling and validation can be enhanced based on specific requirements

---

**Version**: 1.0.0  
**Last Updated**: January 2026
