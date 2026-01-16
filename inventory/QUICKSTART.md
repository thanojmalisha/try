# SmartRetail Pro - Quick Start Guide

## Installation

1. Navigate to project directory:
```bash
cd "inventory-system"
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

### Development Mode
```bash
npm start
```
Opens the application at `http://localhost:3000` (or next available port)

### Build for Production
```bash
npm run build
```
Creates optimized production build in the `build/` folder

### Run Tests
```bash
npm test
```

### Eject Configuration (Advanced)
```bash
npm run eject
```
Note: This is a one-way operation. Once you eject, you can't go back!

## Project Features

### ✅ Implemented Screens
1. **Item List** - Search and filter inventory items
2. **Stock Overview** - Dashboard with key metrics
3. **Category Management** - Create and manage categories
4. **Brand Management** - Manage brands and suppliers
5. **Supplier Management** - View and manage suppliers
6. **Batch-wise Stock** - Track by batch with expiry alerts
7. **Item Detail** - Comprehensive item information with tabs
8. **Stock Valuation** - Calculate inventory value
9. **Stock Aging** - Analyze stock age and identify dead stock

### 🔄 Coming Soon
- Barcode printing
- Expiry calendar view
- Stock adjustment workflow
- Damage entry tracking
- Stock transfer operations
- Transfer approval workflow

## Key Sections

### Navigation Menu
Located on the left sidebar with sections:
- **Item Management**: Item List, Item Detail, Barcode Print
- **Category & Master**: Categories, Brands, Suppliers
- **Stock Operations**: Overview, Batch Stock, Expiry Calendar, Adjustments, Damage Entry
- **Transfers & Valuation**: Create Transfer, Approvals, Valuation, Aging Reports

### Core Features

#### 1. Search & Filter
- Real-time item search
- Multi-criteria filtering (Category, Status, Brand, Supplier)
- Filter modal for advanced options

#### 2. Data Export
- Export item lists to CSV
- Export stock valuation reports
- Export batch reports with expiry status

#### 3. Stock Management
- View stock by item, batch, warehouse
- Track expiry dates and aging
- Calculate stock value using different methods
- Monitor stock levels and reorder alerts

#### 4. Master Data
- Add/edit/delete categories, brands, suppliers
- Maintain product hierarchy
- Supplier reliability tracking

## File Structure Explanation

```
src/
├── components/          # React components
├── context/             # State management
├── config/              # Configuration
├── utils/               # Helper functions
├── App.jsx              # Main application
├── index.js             # Entry point
└── index.css            # Global styles
```

## Styling

Built with **Tailwind CSS**:
- Utility-first approach
- Responsive design
- Custom colors for status indicators
- Consistent spacing and typography

## State Management

### Context API
Two main contexts:
1. **InventoryContext**: UI state (modals, screens, filters, forms)
2. **DataContext**: Business data (items, suppliers, categories, batches)

### No Redux Required
Application is lightweight and uses React's built-in Context API for state management.

## Data Sample

The application comes with sample data:
- 4 sample items
- 6 batches with various expiry statuses
- 4 suppliers
- 2 brands
- 4 product categories
- 4 warehouses/stores

Replace with real data by modifying `src/context/DataContext.jsx`

## Customization

### Change Company Name
Edit `src/components/Layout/Sidebar.jsx`:
```jsx
<h1 className="text-xl font-bold">Your Company Name</h1>
```

### Add New Screen
1. Create `src/components/Screens/YourScreen.jsx`
2. Import in `App.jsx`
3. Add to `renderScreen()` switch statement
4. Update navigation config

### Modify Navigation
Edit `src/config/navigation.js` to add/remove menu items and screens

### Change Colors/Styling
Modify `tailwind.config.js` for global theme changes, or use inline classes in components

## Browser DevTools

Use React Developer Tools extension for:
- Inspecting component props and state
- Debugging context values
- Performance profiling

## Common Tasks

### Add New Item Type
1. Update sample data in `src/context/DataContext.jsx`
2. Add validation in form components
3. Update CSV export format if needed

### Modify Filtering Logic
Edit filtering in:
- `src/components/Screens/ItemListScreen.jsx`
- `src/components/Modals/FilterModal.jsx`

### Create New Report
1. Create screen component in `src/components/Screens/`
2. Add to `App.jsx` routing
3. Add to `navigation.js` menu
4. Implement data filtering and display logic

## Database Integration (Future)

When connecting to a backend:
1. Add API calls in `DataContext.jsx` useEffect hooks
2. Replace `useState` with API fetch calls
3. Update form handlers with POST/PUT/DELETE requests
4. Add error handling and loading states

## Troubleshooting

### Port Already in Use
```bash
npm start -- --port 3001
```

### Module Not Found
```bash
npm install
```

### Build Issues
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

## Performance Tips

- Use React DevTools Profiler to identify slow components
- Implement React.memo() for expensive components
- Use useCallback() and useMemo() for optimization
- Consider code splitting with React.lazy() for large screens

## Deployment

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Drag and drop 'build' folder to Netlify
```

### Docker
Create `Dockerfile` for containerization

## Support & Documentation

- Full ARCHITECTURE.md with detailed structure
- Component-level comments in JSX files
- Utility function documentation in helpers.js
- Navigation configuration in config/navigation.js

---

**Happy coding!** 🚀
