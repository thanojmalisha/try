import React, { createContext, useState, useContext } from 'react';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [suppliers, setSuppliers] = useState([
    { id: 'SUP001', name: 'Coca Cola Distributors', contact: '011-1234567', product: 'Beverages', category: 'Beverages' },
    { id: 'SUP002', name: 'PepsiCo Lanka', contact: '011-2345678', product: 'Snacks', category: 'Snacks' },
    { id: 'SUP003', name: 'Anchor Foods', contact: '011-3456789', product: 'Dairy', category: 'Dairy' },
    { id: 'SUP004', name: 'Sunrice Suppliers', contact: '011-4567890', product: 'Grains', category: 'Grains' },
  ]);

  const [brands, setBrands] = useState([
    { id: 'BRD001', name: 'Coca Cola', supplier: 'Coca Cola Distributors', units: ['Bottle', 'Can'], description: 'Popular beverage brand', status: 'Active', extras: '', logo: '', country: 'Sri Lanka' },
    { id: 'BRD002', name: 'Lays', supplier: 'PepsiCo Lanka', units: ['Pack'], description: 'Snack brand', status: 'Active', extras: '', logo: '', country: 'Sri Lanka' },
  ]);

  const [categories, setCategories] = useState([
    { id: 1, name: 'Beverages', items: 145, color: '#2196F3' },
    { id: 2, name: 'Snacks', items: 89, color: '#4CAF50' },
    { id: 3, name: 'Dairy', items: 56, color: '#FF7043' },
    { id: 4, name: 'Grains', items: 34, color: '#00BCD4' },
  ]);

  const [subCategories] = useState([
    { id: 1, name: 'Carbonated Drinks', parentId: 1 },
    { id: 2, name: 'Juices', parentId: 1 },
    { id: 3, name: 'Salty Snacks', parentId: 2 },
    { id: 4, name: 'Sweet Snacks', parentId: 2 },
    { id: 5, name: 'Liquid Milk', parentId: 3 },
    { id: 6, name: 'Cheese', parentId: 3 },
    { id: 7, name: 'White Rice', parentId: 4 },
    { id: 8, name: 'Brown Rice', parentId: 4 },
  ]);

  const [items, setItems] = useState([
    { id: 'ITM001', name: 'Coca Cola 330ml', category: 'Beverages', brand: 'Coca Cola', supplier: 'Coca Cola Distributors', stock: 245, price: 450.00, status: 'In Stock', warehouse: 'Main Warehouse', expiryDate: '2026-06-15' },
    { id: 'ITM002', name: 'Lays Chips Classic', category: 'Snacks', brand: 'Lays', supplier: 'PepsiCo Lanka', stock: 12, price: 120.00, status: 'Low Stock', warehouse: 'Store A', expiryDate: '2026-03-10' },
    { id: 'ITM003', name: 'Milk Fresh 1L', category: 'Dairy', brand: 'Anchor', supplier: 'Anchor Foods', stock: 0, price: 380.00, status: 'Out of Stock', warehouse: 'Main Warehouse', expiryDate: '2026-01-20' },
    { id: 'ITM004', name: 'Rice Basmati 5kg', category: 'Grains', brand: 'Sunrice', supplier: 'Sunrice Suppliers', stock: 89, price: 2500.00, status: 'In Stock', warehouse: 'Store B', expiryDate: '2026-12-31' },
  ]);

  const [batches, setBatches] = useState([
    { id: 'BAT001', itemId: 'ITM001', itemName: 'Coca Cola 330ml', batchNumber: 'CC-2025-001', quantity: 100, expiryDate: '2026-06-15', purchaseDate: '2025-06-15', warehouse: 'Main Warehouse', status: 'Safe' },
    { id: 'BAT002', itemId: 'ITM001', itemName: 'Coca Cola 330ml', batchNumber: 'CC-2025-002', quantity: 145, expiryDate: '2026-02-28', purchaseDate: '2025-08-28', warehouse: 'Main Warehouse', status: 'Near Expiry' },
    { id: 'BAT003', itemId: 'ITM002', itemName: 'Lays Chips Classic', batchNumber: 'LC-2025-045', quantity: 12, expiryDate: '2026-03-10', purchaseDate: '2025-09-10', warehouse: 'Store A', status: 'Safe' },
    { id: 'BAT004', itemId: 'ITM003', itemName: 'Milk Fresh 1L', batchNumber: 'MF-2026-001', quantity: 0, expiryDate: '2026-01-15', purchaseDate: '2025-12-15', warehouse: 'Main Warehouse', status: 'Expired' },
    { id: 'BAT005', itemId: 'ITM003', itemName: 'Milk Fresh 1L', batchNumber: 'MF-2026-002', quantity: 0, expiryDate: '2026-01-08', purchaseDate: '2025-12-08', warehouse: 'Main Warehouse', status: 'Expired' },
    { id: 'BAT006', itemId: 'ITM004', itemName: 'Rice Basmati 5kg', batchNumber: 'RB-2025-012', quantity: 89, expiryDate: '2026-12-31', purchaseDate: '2025-12-31', warehouse: 'Store B', status: 'Safe' },
  ]);

  const [warehouses] = useState([
    { id: 1, name: 'Main Warehouse' },
    { id: 2, name: 'Store A' },
    { id: 3, name: 'Store B' },
    { id: 4, name: 'Store C' },
  ]);

  const [stockTransfers] = useState([
    { id: 'TRF001', from: 'Main Warehouse', to: 'Store A', items: 12, status: 'Pending', date: '2026-01-07' },
    { id: 'TRF002', from: 'Store A', to: 'Store B', items: 8, status: 'Approved', date: '2026-01-06' },
    { id: 'TRF003', from: 'Main Warehouse', to: 'Store C', items: 15, status: 'Completed', date: '2026-01-05' },
  ]);

  const itemDetails = {
    'ITM001': {
      sku: 'BEV-CC-001',
      barcode: '9800123456789',
      priceHistory: [
        { date: '2025-12-15', price: 450.00, change: '+5%', reason: 'Price increase due to inflation' },
        { date: '2025-11-01', price: 428.57, change: '-2%', reason: 'Promotional discount' },
        { date: '2025-10-15', price: 437.50, change: '+0%', reason: 'Stable' },
      ],
      stockHistory: [
        { date: '2026-01-10', type: 'GRN', reference: 'GRN-001', quantity: 100, notes: 'Goods received from Coca Cola Distributors' },
        { date: '2026-01-08', type: 'Sales', reference: 'INV-089', quantity: -50, notes: 'Sales to retail store A' },
        { date: '2026-01-05', type: 'Adjustment', reference: 'ADJ-001', quantity: 5, notes: 'Stock audit correction' },
        { date: '2026-01-02', type: 'Transfer', reference: 'TRF-001', quantity: -30, notes: 'Transfer to Store A' },
      ],
      supplierHistory: [
        { supplier: 'Coca Cola Distributors', lastPO: 'PO-2026-001', lastDelivery: '2026-01-10', leadTime: '3 days', price: 450.00, reliability: '98%' },
      ],
      salesData: [
        { date: '2026-01-05', quantity: 50, revenue: 22500 },
        { date: '2025-12-30', quantity: 45, revenue: 20250 },
        { date: '2025-12-20', quantity: 60, revenue: 25200 },
        { date: '2025-12-10', quantity: 40, revenue: 18000 },
      ],
      reorderLevel: 50,
      reorderQuantity: 500,
    },
    'ITM002': {
      sku: 'SNK-LC-001',
      barcode: '9800234567890',
      priceHistory: [
        { date: '2025-12-20', price: 120.00, change: '+0%', reason: 'Stable' },
        { date: '2025-11-15', price: 120.00, change: '+3%', reason: 'Manufacturing cost increase' },
      ],
      stockHistory: [
        { date: '2026-01-09', type: 'GRN', reference: 'GRN-002', quantity: 50, notes: 'Goods received' },
        { date: '2026-01-06', type: 'Sales', reference: 'INV-090', quantity: -38, notes: 'Sales' },
      ],
      supplierHistory: [
        { supplier: 'PepsiCo Lanka', lastPO: 'PO-2026-002', lastDelivery: '2026-01-09', leadTime: '2 days', price: 120.00, reliability: '99%' },
      ],
      salesData: [
        { date: '2026-01-06', quantity: 38, revenue: 4560 },
        { date: '2025-12-28', quantity: 25, revenue: 3000 },
      ],
      reorderLevel: 30,
      reorderQuantity: 200,
    },
    'ITM003': {
      sku: 'DAI-MF-001',
      barcode: '9800345678901',
      priceHistory: [
        { date: '2025-12-25', price: 380.00, change: '+2%', reason: 'Premium pricing' },
      ],
      stockHistory: [
        { date: '2026-01-04', type: 'Adjustment', reference: 'ADJ-002', quantity: -10, notes: 'Damage adjustment' },
      ],
      supplierHistory: [
        { supplier: 'Anchor Foods', lastPO: 'PO-2026-003', lastDelivery: '2025-12-20', leadTime: '5 days', price: 380.00, reliability: '95%' },
      ],
      salesData: [
        { date: '2025-12-15', quantity: 100, revenue: 38000 },
      ],
      reorderLevel: 20,
      reorderQuantity: 150,
    },
    'ITM004': {
      sku: 'GRN-RB-001',
      barcode: '9800456789012',
      priceHistory: [
        { date: '2025-12-18', price: 2500.00, change: '+0%', reason: 'Stable' },
      ],
      stockHistory: [
        { date: '2026-01-03', type: 'GRN', reference: 'GRN-003', quantity: 120, notes: 'Large shipment received' },
        { date: '2025-12-28', type: 'Sales', reference: 'INV-091', quantity: -31, notes: 'Bulk sales' },
      ],
      supplierHistory: [
        { supplier: 'Sunrice Suppliers', lastPO: 'PO-2026-004', lastDelivery: '2026-01-03', leadTime: '7 days', price: 2500.00, reliability: '92%' },
      ],
      salesData: [
        { date: '2025-12-28', quantity: 31, revenue: 77500 },
        { date: '2025-12-14', quantity: 15, revenue: 37500 },
      ],
      reorderLevel: 25,
      reorderQuantity: 100,
    },
  };

  const value = {
    suppliers,
    setSuppliers,
    brands,
    setBrands,
    categories,
    setCategories,
    subCategories,
    items,
    setItems,
    batches,
    setBatches,
    warehouses,
    stockTransfers,
    itemDetails,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};
