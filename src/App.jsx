import React from 'react';
import { InventoryProvider } from './context/InventoryContext';
import { DataProvider } from './context/DataContext';
import { useInventory } from './context/InventoryContext';
import Sidebar from './components/Layout/Sidebar';
import TopHeader from './components/Layout/TopHeader';

// Screens
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

const MainApp = () => {
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
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <TopHeader />

        {/* Screen Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-8">
            {renderScreen()}
          </div>
        </div>
      </div>

      {/* Modals */}
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

function App() {
  return (
    <DataProvider>
      <InventoryProvider>
        <MainApp />
      </InventoryProvider>
    </DataProvider>
  );
}

export default App;
