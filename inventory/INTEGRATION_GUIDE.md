# Inventory Module Integration Guide for Main POS System

## Overview
This document provides step-by-step instructions to integrate the SmartRetail Pro Inventory Management Module into your main POS system.

## Integration Approach

### Option 1: **Recommended - Module-based Integration (Modular Architecture)**
Integrate the inventory system as a feature module within your main POS application.

### Option 2: Micro-frontend (Advanced)
Deploy inventory as a separate micro-frontend that communicates via events/APIs.

---

## Step-by-Step Integration (Option 1 - Recommended)

### Step 1: Prepare Main POS Project Structure

Your main POS project should have this structure:
```
main-pos-system/
├── src/
│   ├── components/
│   ├── pages/
│   ├── context/
│   ├── utils/
│   ├── modules/
│   │   └── inventory/  ← We'll add the inventory module here
│   ├── App.jsx
│   └── index.js
├── package.json
└── ...
```

### Step 2: Copy Inventory Module Files

Copy the following folders into `src/modules/inventory/`:

```
src/modules/inventory/
├── components/
│   ├── Layout/
│   │   ├── Sidebar.jsx
│   │   └── TopHeader.jsx
│   ├── Screens/
│   │   ├── ItemListScreen.jsx
│   │   ├── ItemDetailScreen.jsx
│   │   ├── StockOverviewScreen.jsx
│   │   ├── BatchWiseStockScreen.jsx
│   │   ├── CategoryManagementScreen.jsx
│   │   ├── BrandManagementScreen.jsx
│   │   ├── SupplierManagementScreen.jsx
│   │   ├── StockValuationScreen.jsx
│   │   ├── StockAgingScreen.jsx
│   │   ├── ExpiryCalendarScreen.jsx
│   │   ├── StockAdjustmentScreen.jsx
│   │   ├── DamageEntryScreen.jsx
│   │   ├── CreateTransferScreen.jsx
│   │   ├── TransferApprovalScreen.jsx
│   │   └── PlaceholderScreen.jsx
│   └── Modals/
│       ├── AddItemModal.jsx
│       ├── AddCategoryModal.jsx
│       └── FilterModal.jsx
├── context/
│   ├── InventoryContext.jsx
│   └── DataContext.jsx
├── config/
│   └── navigation.js
├── utils/
│   └── helpers.js
├── styles/
│   └── inventory.css (optional - for scoped styles)
└── InventoryModule.jsx  ← Create this (main module wrapper)
```

### Step 3: Create InventoryModule Wrapper Component

Create **`src/modules/inventory/InventoryModule.jsx`**:

```jsx
import React from 'react';
import { InventoryProvider } from './context/InventoryContext';
import { DataProvider } from './context/DataContext';
import { useInventory } from './context/InventoryContext';
import Sidebar from './components/Layout/Sidebar';
import TopHeader from './components/Layout/TopHeader';

// Screens (with relative imports)
import ItemListScreen from './components/Screens/ItemListScreen';
import ItemDetailScreen from './components/Screens/ItemDetailScreen';
import StockOverviewScreen from './components/Screens/StockOverviewScreen';
import CategoryManagementScreen from './components/Screens/CategoryManagementScreen';
import BrandManagementScreen from './components/Screens/BrandManagementScreen';
import SupplierManagementScreen from './components/Screens/SupplierManagementScreen';
import BatchWiseStockScreen from './components/Screens/BatchWiseStockScreen';
import StockValuationScreen from './components/Screens/StockValuationScreen';
import StockAgingScreen from './components/Screens/StockAgingScreen';
import ExpiryCalendarScreen from './components/Screens/ExpiryCalendarScreen';
import StockAdjustmentScreen from './components/Screens/StockAdjustmentScreen';
import DamageEntryScreen from './components/Screens/DamageEntryScreen';
import CreateTransferScreen from './components/Screens/CreateTransferScreen';
import TransferApprovalScreen from './components/Screens/TransferApprovalScreen';
import PlaceholderScreen from './components/Screens/PlaceholderScreen';

// Modals
import AddItemModal from './components/Modals/AddItemModal';
import FilterModal from './components/Modals/FilterModal';
import AddCategoryModal from './components/Modals/AddCategoryModal';

const InventoryContent = () => {
  const { activeScreen } = useInventory();
  const { isAddModalOpen, setIsAddModalOpen } = useInventory();

  const renderScreen = () => {
    switch(activeScreen) {
      case 'item-list':
        return <ItemListScreen />;
      case 'item-detail':
        return <ItemDetailScreen />;
      case 'stock-overview':
        return <StockOverviewScreen />;
      case 'category-mgmt':
        return <CategoryManagementScreen />;
      case 'brand-mgmt':
        return <BrandManagementScreen />;
      case 'supplier-mgmt':
        return <SupplierManagementScreen />;
      case 'batch-stock':
        return <BatchWiseStockScreen />;
      case 'stock-valuation':
        return <StockValuationScreen />;
      case 'stock-aging':
        return <StockAgingScreen />;
      case 'barcode-print':
        return <PlaceholderScreen title="Barcode Print" description="Barcode printing feature is coming soon" />;
      case 'expiry-calendar':
        return <ExpiryCalendarScreen />;
      case 'stock-adjustment':
        return <StockAdjustmentScreen />;
      case 'damage-entry':
        return <DamageEntryScreen />;
      case 'transfer-create':
        return <CreateTransferScreen />;
      case 'approve-transfer':
        return <TransferApprovalScreen />;
      default:
        return <PlaceholderScreen title="Screen Coming Soon" description="This feature is under development" />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopHeader />
        <div className="flex-1 overflow-y-auto">
          <div className="p-8">
            {renderScreen()}
          </div>
        </div>
      </div>

      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-40" onClick={() => setIsAddModalOpen(false)}></div>
          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-3xl mx-4 z-10 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <AddItemModal onClose={() => setIsAddModalOpen(false)} />
            </div>
          </div>
        </div>
      )}

      <FilterModal />
      <AddCategoryModal />
    </div>
  );
};

export const InventoryModule = () => {
  return (
    <DataProvider>
      <InventoryProvider>
        <InventoryContent />
      </InventoryProvider>
    </DataProvider>
  );
};

export default InventoryModule;
```

### Step 4: Update Main POS App.jsx

Modify your main **`src/App.jsx`** to route to the inventory module:

```jsx
import React, { useState } from 'react';
import InventoryModule from './modules/inventory/InventoryModule';
// Import other modules as needed
import SalesModule from './modules/sales/SalesModule';
import ReportsModule from './modules/reports/ReportsModule';

function App() {
  const [activeModule, setActiveModule] = useState('inventory'); // or 'sales', 'reports'

  const renderModule = () => {
    switch(activeModule) {
      case 'inventory':
        return <InventoryModule />;
      case 'sales':
        return <SalesModule />;
      case 'reports':
        return <ReportsModule />;
      default:
        return <InventoryModule />;
    }
  };

  return (
    <div>
      {/* Optional: Global Navigation */}
      <div className="bg-blue-600 text-white p-4 flex gap-4">
        <button 
          onClick={() => setActiveModule('inventory')}
          className={activeModule === 'inventory' ? 'font-bold' : ''}
        >
          Inventory
        </button>
        <button 
          onClick={() => setActiveModule('sales')}
          className={activeModule === 'sales' ? 'font-bold' : ''}
        >
          Sales
        </button>
        <button 
          onClick={() => setActiveModule('reports')}
          className={activeModule === 'reports' ? 'font-bold' : ''}
        >
          Reports
        </button>
      </div>

      {/* Module Content */}
      {renderModule()}
    </div>
  );
}

export default App;
```

### Step 5: Merge Dependencies

In your main POS **`package.json`**, ensure you have:

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "lucide-react": "^0.263.1"
  },
  "devDependencies": {
    "tailwindcss": "^3.3.0",
    "postcss": "^8.4.31",
    "autoprefixer": "^10.4.16"
  }
}
```

If these are already installed, no changes needed. Otherwise:
```bash
npm install
```

### Step 6: Fix Import Paths

If you're moving the module, update all relative imports in the inventory module files. The current imports should work with the structure in Step 2.

---

## Shared State Management (Advanced)

If you want the inventory data to be accessible from other POS modules:

### Create a Global Context Bridge

**`src/context/GlobalInventoryContext.jsx`**:

```jsx
import React, { createContext } from 'react';

export const GlobalInventoryContext = createContext();

export const GlobalInventoryProvider = ({ children }) => {
  // This can be shared across all modules
  const value = {
    // Expose necessary inventory data/methods
  };

  return (
    <GlobalInventoryContext.Provider value={value}>
      {children}
    </GlobalInventoryContext.Provider>
  );
};
```

Wrap your main App with this provider to make inventory data available globally.

---

## API Integration

### Replace Mock Data with Real APIs

In **`src/modules/inventory/context/DataContext.jsx`**, replace mock data with API calls:

```javascript
// Example - Replace mock data with API call
useEffect(() => {
  const fetchItems = async () => {
    try {
      const response = await fetch('/api/inventory/items');
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error('Failed to fetch items:', error);
    }
  };
  
  fetchItems();
}, []);
```

---

## Deployment

### Build Main POS with Inventory Module

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Development
npm run dev
```

The bundled app will include the inventory module.

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Import errors | Verify relative import paths match your folder structure |
| Style conflicts | Namespace Tailwind classes or use CSS modules |
| State not syncing | Ensure providers wrap the correct components |
| Module not loading | Check module routing in main App.jsx |

---

## Best Practices

✅ **Do:**
- Keep modules self-contained with their own contexts
- Export a single component from each module
- Document API contracts between modules
- Use environment variables for API endpoints

❌ **Don't:**
- Share internal component state between modules
- Hardcode API endpoints
- Create circular dependencies between modules
- Mix styling approaches (Tailwind + CSS-in-JS)

---

## Next Steps

1. Create the folder structure in your main POS project
2. Copy the inventory module files
3. Create the InventoryModule.jsx wrapper
4. Update your main App.jsx
5. Test the integration
6. Connect to real APIs
7. Deploy

For questions, refer to the ARCHITECTURE.md file in the inventory module.
