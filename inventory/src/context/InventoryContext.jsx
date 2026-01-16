import React, { createContext, useState, useContext } from 'react';

const InventoryContext = createContext();

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error('useInventory must be used within InventoryProvider');
  }
  return context;
};

export const InventoryProvider = ({ children }) => {
  const [activeScreen, setActiveScreen] = useState('item-list');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAddSupplierOpen, setIsAddSupplierOpen] = useState(false);
  const [isAddBrandOpen, setIsAddBrandOpen] = useState(false);
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryForm, setCategoryForm] = useState({ name: '', description: '', isActive: true });
  const [supplierForm, setSupplierForm] = useState({ id: '', name: '', contact: '', product: '', category: '' });
  const [brandForm, setBrandForm] = useState({ id: '', name: '', supplier: '', units: '', description: '', status: 'Active', extras: '', logo: '', country: '' });

  // Filter states
  const [stockFilterCategory, setStockFilterCategory] = useState('');
  const [stockFilterWarehouse, setStockFilterWarehouse] = useState('');
  const [stockFilterDate, setStockFilterDate] = useState('');
  const [itemFilterCategory, setItemFilterCategory] = useState('');
  const [itemFilterStatus, setItemFilterStatus] = useState('');
  const [itemFilterBrand, setItemFilterBrand] = useState('');
  const [itemFilterSupplier, setItemFilterSupplier] = useState('');
  const [batchFilterItem, setBatchFilterItem] = useState('');

  // State for Item Detail
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [selectedItemTab, setSelectedItemTab] = useState('summary');

  // Stock Adjustment State
  const [adjustmentForm, setAdjustmentForm] = useState({ itemId: '', batchId: '', currentQty: '', physicalQty: '', adjustmentType: 'Increase', reason: 'Audit', approvedBy: '' });
  const [adjustments, setAdjustments] = useState([
    { id: 'ADJ001', itemName: 'Coca Cola 330ml', batchNumber: 'CC-2025-001', previousQty: 100, currentQty: 105, adjustmentType: 'Increase', reason: 'Audit', approvedBy: 'John Doe', date: '2026-01-10' },
    { id: 'ADJ002', itemName: 'Lays Chips Classic', batchNumber: 'LC-2025-045', previousQty: 15, currentQty: 12, adjustmentType: 'Decrease', reason: 'Damage', approvedBy: 'Jane Smith', date: '2026-01-09' },
  ]);

  // Damage Entry State
  const [damageForm, setDamageForm] = useState({ itemId: '', batchId: '', quantity: '', reason: '', date: '', note: '' });
  const [damageEntries, setDamageEntries] = useState([
    { id: 'DMG001', itemName: 'Coca Cola 330ml', batchNumber: 'CC-2025-002', quantity: 5, reason: 'Breakage', date: '2026-01-10', note: 'Bottle damaged during unloading' },
    { id: 'DMG002', itemName: 'Lays Chips Classic', batchNumber: 'LC-2025-045', quantity: 3, reason: 'Expiry', date: '2026-01-08', note: 'Expired stock disposal' },
  ]);

  // Stock Transfer State
  const [transferForm, setTransferForm] = useState({ fromWarehouse: '', toWarehouse: '', itemId: '', quantity: '', batchId: '', transferDate: '', remarks: '', status: 'Draft' });
  const [transfers, setTransfers] = useState([
    { id: 'TRF001', fromWarehouse: 'Main Warehouse', toWarehouse: 'Store A', itemName: 'Coca Cola 330ml', quantity: 50, batchNumber: 'CC-2025-001', date: '2026-01-07', remarks: 'Stock replenishment', status: 'Draft', requestedBy: 'Manager 1' },
    { id: 'TRF002', fromWarehouse: 'Store A', toWarehouse: 'Store B', itemName: 'Lays Chips Classic', quantity: 20, batchNumber: 'LC-2025-045', date: '2026-01-06', remarks: 'Stock movement', status: 'Submitted', requestedBy: 'Manager 2' },
    { id: 'TRF003', fromWarehouse: 'Main Warehouse', toWarehouse: 'Store C', itemName: 'Rice Basmati 5kg', quantity: 30, batchNumber: 'RB-2025-012', date: '2026-01-05', remarks: 'Monthly distribution', status: 'Approved', requestedBy: 'Manager 3' },
  ]);

  // Valuation State
  const [valuationMethod, setValuationMethod] = useState('FIFO');

  const value = {
    // Screen navigation
    activeScreen,
    setActiveScreen,
    selectedItemId,
    setSelectedItemId,
    selectedItemTab,
    setSelectedItemTab,

    // Modal states
    isAddModalOpen,
    setIsAddModalOpen,
    isAddSupplierOpen,
    setIsAddSupplierOpen,
    isAddBrandOpen,
    setIsAddBrandOpen,
    isAddCategoryOpen,
    setIsAddCategoryOpen,
    isFilterModalOpen,
    setIsFilterModalOpen,

    // Search and filters
    searchQuery,
    setSearchQuery,
    stockFilterCategory,
    setStockFilterCategory,
    stockFilterWarehouse,
    setStockFilterWarehouse,
    stockFilterDate,
    setStockFilterDate,
    itemFilterCategory,
    setItemFilterCategory,
    itemFilterStatus,
    setItemFilterStatus,
    itemFilterBrand,
    setItemFilterBrand,
    itemFilterSupplier,
    setItemFilterSupplier,
    batchFilterItem,
    setBatchFilterItem,

    // Forms
    categoryForm,
    setCategoryForm,
    supplierForm,
    setSupplierForm,
    brandForm,
    setBrandForm,
    adjustmentForm,
    setAdjustmentForm,
    damageForm,
    setDamageForm,
    transferForm,
    setTransferForm,

    // Data states
    adjustments,
    setAdjustments,
    damageEntries,
    setDamageEntries,
    transfers,
    setTransfers,
    valuationMethod,
    setValuationMethod,
  };

  return (
    <InventoryContext.Provider value={value}>
      {children}
    </InventoryContext.Provider>
  );
};
