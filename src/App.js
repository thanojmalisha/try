import React, { useState, useEffect } from 'react';
import { 
  Package, Plus, Search, Filter, Edit, Trash2, Printer, 
  BarChart3, Tag, Box, Calendar, AlertTriangle, ArrowRightLeft,
  CheckCircle, FileText, TrendingUp, Clock, ChevronRight,
  Download, Upload, RefreshCw, Archive, User
} from 'lucide-react';

const InventoryManagementSystem = () => {
  const [activeScreen, setActiveScreen] = useState('item-list');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAddSupplierOpen, setIsAddSupplierOpen] = useState(false);
  const [isAddBrandOpen, setIsAddBrandOpen] = useState(false);
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryForm, setCategoryForm] = useState({ name: '', description: '', isActive: true });

  const [suppliers, setSuppliers] = useState([
    { id: 'SUP001', name: 'Coca Cola Distributors', contact: '011-1234567', product: 'Beverages', category: 'Beverages' },
    { id: 'SUP002', name: 'PepsiCo Lanka', contact: '011-2345678', product: 'Snacks', category: 'Snacks' },
    { id: 'SUP003', name: 'Anchor Foods', contact: '011-3456789', product: 'Dairy', category: 'Dairy' },
    { id: 'SUP004', name: 'Sunrice Suppliers', contact: '011-4567890', product: 'Grains', category: 'Grains' },
  ]);
  const [supplierForm, setSupplierForm] = useState({ id: '', name: '', contact: '', product: '', category: '' });

  const [brands, setBrands] = useState([
    { id: 'BRD001', name: 'Coca Cola', supplier: 'Coca Cola Distributors', units: ['Bottle', 'Can'], description: 'Popular beverage brand', status: 'Active', extras: '', logo: '', country: 'Sri Lanka' },
    { id: 'BRD002', name: 'Lays', supplier: 'PepsiCo Lanka', units: ['Pack'], description: 'Snack brand', status: 'Active', extras: '', logo: '', country: 'Sri Lanka' },
  ]);
  const [brandForm, setBrandForm] = useState({ id: '', name: '', supplier: '', units: '', description: '', status: 'Active', extras: '', logo: '', country: '' });
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
  const [stockFilterCategory, setStockFilterCategory] = useState('');
  const [stockFilterWarehouse, setStockFilterWarehouse] = useState('');
  const [stockFilterDate, setStockFilterDate] = useState('');
  const [itemFilterCategory, setItemFilterCategory] = useState('');
  const [itemFilterStatus, setItemFilterStatus] = useState('');
  const [itemFilterBrand, setItemFilterBrand] = useState('');
  const [itemFilterSupplier, setItemFilterSupplier] = useState('');

  const warehouses = [
    { id: 1, name: 'Main Warehouse' },
    { id: 2, name: 'Store A' },
    { id: 3, name: 'Store B' },
    { id: 4, name: 'Store C' },
  ];

  // Sample data
  const items = [
    { id: 'ITM001', name: 'Coca Cola 330ml', category: 'Beverages', brand: 'Coca Cola', supplier: 'Coca Cola Distributors', stock: 245, price: 450.00, status: 'In Stock', warehouse: 'Main Warehouse', expiryDate: '2026-06-15' },
    { id: 'ITM002', name: 'Lays Chips Classic', category: 'Snacks', brand: 'Lays', supplier: 'PepsiCo Lanka', stock: 12, price: 120.00, status: 'Low Stock', warehouse: 'Store A', expiryDate: '2026-03-10' },
    { id: 'ITM003', name: 'Milk Fresh 1L', category: 'Dairy', brand: 'Anchor', supplier: 'Anchor Foods', stock: 0, price: 380.00, status: 'Out of Stock', warehouse: 'Main Warehouse', expiryDate: '2026-01-20' },
    { id: 'ITM004', name: 'Rice Basmati 5kg', category: 'Grains', brand: 'Sunrice', supplier: 'Sunrice Suppliers', stock: 89, price: 2500.00, status: 'In Stock', warehouse: 'Store B', expiryDate: '2026-12-31' },
  ];

  const batches = [
    { id: 'BAT001', itemId: 'ITM001', itemName: 'Coca Cola 330ml', batchNumber: 'CC-2025-001', quantity: 100, expiryDate: '2026-06-15', purchaseDate: '2025-06-15', warehouse: 'Main Warehouse', status: 'Safe' },
    { id: 'BAT002', itemId: 'ITM001', itemName: 'Coca Cola 330ml', batchNumber: 'CC-2025-002', quantity: 145, expiryDate: '2026-02-28', purchaseDate: '2025-08-28', warehouse: 'Main Warehouse', status: 'Near Expiry' },
    { id: 'BAT003', itemId: 'ITM002', itemName: 'Lays Chips Classic', batchNumber: 'LC-2025-045', quantity: 12, expiryDate: '2026-03-10', purchaseDate: '2025-09-10', warehouse: 'Store A', status: 'Safe' },
    { id: 'BAT004', itemId: 'ITM003', itemName: 'Milk Fresh 1L', batchNumber: 'MF-2026-001', quantity: 0, expiryDate: '2026-01-15', purchaseDate: '2025-12-15', warehouse: 'Main Warehouse', status: 'Expired' },
    { id: 'BAT005', itemId: 'ITM003', itemName: 'Milk Fresh 1L', batchNumber: 'MF-2026-002', quantity: 0, expiryDate: '2026-01-08', purchaseDate: '2025-12-08', warehouse: 'Main Warehouse', status: 'Expired' },
    { id: 'BAT006', itemId: 'ITM004', itemName: 'Rice Basmati 5kg', batchNumber: 'RB-2025-012', quantity: 89, expiryDate: '2026-12-31', purchaseDate: '2025-12-31', warehouse: 'Store B', status: 'Safe' },
  ];
  const [batchFilterItem, setBatchFilterItem] = useState('');

  // State for Stock Adjustment
  const [adjustmentForm, setAdjustmentForm] = useState({ itemId: '', batchId: '', currentQty: '', physicalQty: '', adjustmentType: 'Increase', reason: 'Audit', approvedBy: '' });
  const [adjustments, setAdjustments] = useState([
    { id: 'ADJ001', itemName: 'Coca Cola 330ml', batchNumber: 'CC-2025-001', previousQty: 100, currentQty: 105, adjustmentType: 'Increase', reason: 'Audit', approvedBy: 'John Doe', date: '2026-01-10' },
    { id: 'ADJ002', itemName: 'Lays Chips Classic', batchNumber: 'LC-2025-045', previousQty: 15, currentQty: 12, adjustmentType: 'Decrease', reason: 'Damage', approvedBy: 'Jane Smith', date: '2026-01-09' },
  ]);

  // State for Damage Entry
  const [damageForm, setDamageForm] = useState({ itemId: '', batchId: '', quantity: '', reason: '', date: '', note: '' });
  const [damageEntries, setDamageEntries] = useState([
    { id: 'DMG001', itemName: 'Coca Cola 330ml', batchNumber: 'CC-2025-002', quantity: 5, reason: 'Breakage', date: '2026-01-10', note: 'Bottle damaged during unloading' },
    { id: 'DMG002', itemName: 'Lays Chips Classic', batchNumber: 'LC-2025-045', quantity: 3, reason: 'Expiry', date: '2026-01-08', note: 'Expired stock disposal' },
  ]);

  // State for Stock Transfer Create
  const [transferForm, setTransferForm] = useState({ fromWarehouse: '', toWarehouse: '', itemId: '', quantity: '', batchId: '', transferDate: '', remarks: '', status: 'Draft' });
  const [transfers, setTransfers] = useState([
    { id: 'TRF001', fromWarehouse: 'Main Warehouse', toWarehouse: 'Store A', itemName: 'Coca Cola 330ml', quantity: 50, batchNumber: 'CC-2025-001', date: '2026-01-07', remarks: 'Stock replenishment', status: 'Draft', requestedBy: 'Manager 1' },
    { id: 'TRF002', fromWarehouse: 'Store A', toWarehouse: 'Store B', itemName: 'Lays Chips Classic', quantity: 20, batchNumber: 'LC-2025-045', date: '2026-01-06', remarks: 'Stock movement', status: 'Submitted', requestedBy: 'Manager 2' },
    { id: 'TRF003', fromWarehouse: 'Main Warehouse', toWarehouse: 'Store C', itemName: 'Rice Basmati 5kg', quantity: 30, batchNumber: 'RB-2025-012', date: '2026-01-05', remarks: 'Monthly distribution', status: 'Approved', requestedBy: 'Manager 3' },
  ]);

  // State for Item Detail
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [selectedItemTab, setSelectedItemTab] = useState('summary');

  // Detailed item data for Item Detail screen
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

  const stockTransfers = [
    { id: 'TRF001', from: 'Main Warehouse', to: 'Store A', items: 12, status: 'Pending', date: '2026-01-07' },
    { id: 'TRF002', from: 'Store A', to: 'Store B', items: 8, status: 'Approved', date: '2026-01-06' },
    { id: 'TRF003', from: 'Main Warehouse', to: 'Store C', items: 15, status: 'Completed', date: '2026-01-05' },
  ];

  const navigation = [
    { id: 'item-management', label: 'Item Management', icon: Package, screens: [
      { id: 'item-list', label: 'Item List', icon: Package },
      { id: 'item-detail', label: 'Item Detail', icon: FileText },
      { id: 'barcode-print', label: 'Barcode Print', icon: Printer },
    ]},
    { id: 'category-master', label: 'Category & Master', icon: Tag, screens: [
      { id: 'category-mgmt', label: 'Category Management', icon: Tag },
      { id: 'brand-mgmt', label: 'Brand Management', icon: Archive },
      { id: 'supplier-mgmt', label: 'Supplier Management', icon: Archive },
    ]},
    { id: 'stock-ops', label: 'Stock Operations', icon: Box, screens: [
      { id: 'stock-overview', label: 'Stock Overview', icon: BarChart3 },
      { id: 'batch-stock', label: 'Batch-wise Stock', icon: Package },
      { id: 'expiry-calendar', label: 'Expiry Calendar', icon: Calendar },
      { id: 'stock-adjustment', label: 'Stock Adjustment', icon: RefreshCw },
      { id: 'damage-entry', label: 'Damage Entry', icon: AlertTriangle },
    ]},
    { id: 'transfers', label: 'Transfers & Valuation', icon: ArrowRightLeft, screens: [
      { id: 'transfer-create', label: 'Create Transfer', icon: ArrowRightLeft },
      { id: 'approve-transfer', label: 'Transfer Approval', icon: CheckCircle },
      { id: 'stock-valuation', label: 'Stock Valuation', icon: TrendingUp },
      { id: 'stock-aging', label: 'Stock Aging Report', icon: Clock },
    ]},
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'In Stock': return 'bg-green-100 text-green-700';
      case 'Low Stock': return 'bg-orange-100 text-orange-700';
      case 'Out of Stock': return 'bg-red-100 text-red-700';
      case 'Pending': return 'bg-yellow-100 text-yellow-700';
      case 'Approved': return 'bg-blue-100 text-blue-700';
      case 'Completed': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  // Screen Components
  const ItemListScreen = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Item List</h2>
          <p className="text-gray-600 mt-1">Manage your inventory items</p>
        </div>
        <button onClick={() => setIsAddModalOpen(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700">
          <Plus size={20} />
          Add New Item
        </button>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search items by name, code, or barcode..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <button onClick={() => setIsFilterModalOpen(true)} className="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50">
          <Filter size={20} />
          Filters
        </button>
        <button onClick={() => { const csvContent = [['Item Code', 'Item Name', 'Category', 'Brand', 'Supplier', 'Stock', 'Price', 'Status', 'Warehouse', 'Expiry Date'], ...items.map(i => [i.id, i.name, i.category, i.brand, i.supplier, i.stock, i.price, i.status, i.warehouse, i.expiryDate])].map(row => row.join(',')).join('\n'); const blob = new Blob([csvContent], { type: 'text/csv' }); const url = window.URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'items.csv'; a.click(); }} className="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50">
          <Download size={20} />
          Export
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Item Code</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Item Name</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Category</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Brand</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Supplier</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Stock</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Price</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Description</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Extras</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Country</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Logo</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {items.filter(item => {
              // Check search query
              const searchMatch = !searchQuery || 
                item.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                item.name.toLowerCase().includes(searchQuery.toLowerCase());
              
              // Check category filter
              const categoryMatch = !itemFilterCategory || item.category === itemFilterCategory;
              
              // Check status filter
              const statusMatch = !itemFilterStatus || item.status === itemFilterStatus;
              
              // Check brand filter
              const brandMatch = !itemFilterBrand || item.brand === itemFilterBrand;
              
              // Check supplier filter
              const supplierMatch = !itemFilterSupplier || item.supplier === itemFilterSupplier;
              
              return searchMatch && categoryMatch && statusMatch && brandMatch && supplierMatch;
            }).map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-mono text-gray-900">{item.id}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{item.category}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{item.brand}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{item.supplier}</td>
                <td className="px-6 py-4 text-sm font-mono text-gray-900">{item.stock}</td>
                <td className="px-6 py-4 text-sm font-mono text-gray-900">LKR {item.price.toFixed(2)}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => { setSelectedItemId(item.id); setActiveScreen('item-detail'); }} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded">
                      <FileText size={16} />
                    </button>
                    <button onClick={() => alert('Edit functionality coming soon')} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded">
                      <Edit size={16} />
                    </button>
                    <button onClick={() => { setSelectedItemId(item.id); setActiveScreen('barcode-print'); }} className="p-1.5 text-gray-600 hover:bg-gray-50 rounded">
                      <Printer size={16} />
                    </button>
                    <button onClick={() => alert('Delete item?')} className="p-1.5 text-red-600 hover:bg-red-50 rounded">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const AddItemScreen = ({ onClose }) => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Add New Item</h2>
          <p className="text-gray-600 mt-1">Create a new inventory item</p>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">×</button>
        )}
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 overflow-y-auto max-h-[70vh]">
        <div className="grid grid-cols-1 md:grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Item Code *</label>
            <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="ITM001" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Barcode</label>
            <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="1234567890123" />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Item Name *</label>
            <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter item name" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>Select category</option>
              <option>Beverages</option>
              <option>Snacks</option>
              <option>Dairy</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>Select brand</option>
              <option>Coca Cola</option>
              <option>Lays</option>
              <option>Anchor</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Supplier *</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>Select supplier</option>
              <option>Coca Cola Distributors</option>
              <option>PepsiCo Lanka</option>
              <option>Anchor Foods</option>
              <option>Sunrice Suppliers</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sub Category</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>Select sub category</option>
              {subCategories.map((sc) => <option key={sc.id} value={sc.name}>{sc.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Purchase Price *</label>
            <input type="number" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="0.00" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Selling Price *</label>
            <input type="number" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="0.00" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Opening Stock</label>
            <input type="number" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="0" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Reorder Level</label>
            <input type="number" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="10" />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" rows="3" placeholder="Enter item description"></textarea>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
          <button onClick={() => onClose ? onClose() : setActiveScreen('item-list')} className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
            Cancel
          </button>
          <button onClick={() => { if (onClose) { onClose(); } else { setActiveScreen('item-list'); } }} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Save Item
          </button>
        </div>
      </div>
    </div>
  );

  const ItemDetailScreen = () => {
    // Use selectedItemId, or default to first item if not set
    const itemId = selectedItemId || items[0]?.id;
    const item = items.find(i => i.id === itemId);
    const detail = itemDetails[itemId];
    
    if (!item || !detail) {
      return (
        <div className="p-6">
          <p className="text-gray-900 font-semibold mb-4">Item not found or no item selected</p>
          <button onClick={() => setActiveScreen('item-list')} className="text-blue-600 hover:text-blue-700">
            ← Back to List
          </button>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button onClick={() => { setSelectedItemId(null); setActiveScreen('item-list'); }} className="text-blue-600 hover:text-blue-700 flex items-center gap-1">
            ← Back to List
          </button>
          <h2 className="text-2xl font-bold text-gray-900">{item.name}</h2>
          <div></div>
        </div>

        {/* Quick Info Cards */}
        <div className="grid grid-cols-5 gap-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-600 font-semibold">SKU</p>
            <p className="text-lg font-bold text-blue-700 mt-1">{detail.sku}</p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm text-green-600 font-semibold">Current Stock</p>
            <p className="text-lg font-bold text-green-700 mt-1">{item.stock}</p>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <p className="text-sm text-purple-600 font-semibold">Current Price</p>
            <p className="text-lg font-bold text-purple-700 mt-1">LKR {item.price.toFixed(2)}</p>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <p className="text-sm text-orange-600 font-semibold">Reorder Level</p>
            <p className="text-lg font-bold text-orange-700 mt-1">{detail.reorderLevel}</p>
          </div>
          <div className={`${item.stock <= detail.reorderLevel ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-200'} border rounded-lg p-4`}>
            <p className={`text-sm ${item.stock <= detail.reorderLevel ? 'text-red-600' : 'text-gray-600'} font-semibold`}>Status</p>
            <p className={`text-lg font-bold mt-1 ${item.stock <= detail.reorderLevel ? 'text-red-700' : 'text-gray-700'}`}>{item.stock <= detail.reorderLevel ? 'Reorder Now' : 'In Stock'}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-gray-200">
          {['summary', 'prices', 'stock-history', 'batches', 'suppliers', 'sales', 'reorder'].map((tab) => (
            <button key={tab} onClick={() => setSelectedItemTab(tab)} className={`px-4 py-3 font-medium border-b-2 ${selectedItemTab === tab ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600 hover:text-gray-900'}`}>
              {tab === 'summary' && 'Summary'}
              {tab === 'prices' && 'Prices'}
              {tab === 'stock-history' && 'Stock History'}
              {tab === 'batches' && 'Batch & Expiry'}
              {tab === 'suppliers' && 'Suppliers'}
              {tab === 'sales' && 'Sales'}
              {tab === 'reorder' && 'Reorder Alerts'}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {selectedItemTab === 'summary' && (
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Item Information</h3>
              <div className="space-y-3">
                <div><label className="text-sm text-gray-600">Item Code:</label><p className="font-mono">{item.id}</p></div>
                <div><label className="text-sm text-gray-600">Barcode:</label><p className="font-mono">{detail.barcode}</p></div>
                <div><label className="text-sm text-gray-600">SKU:</label><p className="font-mono">{detail.sku}</p></div>
                <div><label className="text-sm text-gray-600">Category:</label><p>{item.category}</p></div>
                <div><label className="text-sm text-gray-600">Brand:</label><p>{item.brand}</p></div>
                <div><label className="text-sm text-gray-600">Supplier:</label><p>{item.supplier}</p></div>
              </div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Stock Details</h3>
              <div className="space-y-3">
                <div><label className="text-sm text-gray-600">Current Stock:</label><p className="text-lg font-bold">{item.stock} units</p></div>
                <div><label className="text-sm text-gray-600">Warehouse:</label><p>{item.warehouse}</p></div>
                <div><label className="text-sm text-gray-600">Expiry Date:</label><p>{item.expiryDate}</p></div>
                <div><label className="text-sm text-gray-600">Status:</label><p><span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(item.status)}`}>{item.status}</span></p></div>
                <div><label className="text-sm text-gray-600">Reorder Level:</label><p>{detail.reorderLevel} units</p></div>
                <div><label className="text-sm text-gray-600">Reorder Quantity:</label><p>{detail.reorderQuantity} units</p></div>
              </div>
            </div>
          </div>
        )}

        {selectedItemTab === 'prices' && (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Date</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase">Price</th>
                  <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase">Change</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Reason</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {detail.priceHistory.map((entry, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{entry.date}</td>
                    <td className="px-6 py-4 text-sm font-mono text-right">LKR {entry.price.toFixed(2)}</td>
                    <td className="px-6 py-4 text-sm text-center"><span className={`px-2 py-1 rounded text-xs font-medium ${entry.change.includes('+') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>{entry.change}</span></td>
                    <td className="px-6 py-4 text-sm text-gray-600">{entry.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {selectedItemTab === 'stock-history' && (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Reference</th>
                  <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase">Quantity</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {detail.stockHistory.map((entry, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{entry.date}</td>
                    <td className="px-6 py-4 text-sm"><span className={`px-2 py-1 text-xs font-medium rounded-full ${entry.type === 'GRN' ? 'bg-green-100 text-green-700' : entry.type === 'Sales' ? 'bg-blue-100 text-blue-700' : entry.type === 'Adjustment' ? 'bg-orange-100 text-orange-700' : 'bg-purple-100 text-purple-700'}`}>{entry.type}</span></td>
                    <td className="px-6 py-4 text-sm font-mono">{entry.reference}</td>
                    <td className="px-6 py-4 text-center text-sm font-mono"><span className={entry.quantity > 0 ? 'text-green-600' : 'text-red-600'}>{entry.quantity > 0 ? '+' : ''}{entry.quantity}</span></td>
                    <td className="px-6 py-4 text-sm text-gray-600">{entry.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {selectedItemTab === 'batches' && (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Batch Number</th>
                  <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase">Quantity</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Purchase Date</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Expiry Date</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Warehouse</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {batches.filter(b => b.itemId === selectedItemId).map((batch) => (
                  <tr key={batch.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-mono">{batch.batchNumber}</td>
                    <td className="px-6 py-4 text-center text-sm">{batch.quantity}</td>
                    <td className="px-6 py-4 text-sm">{batch.purchaseDate}</td>
                    <td className="px-6 py-4 text-sm">{batch.expiryDate}</td>
                    <td className="px-6 py-4 text-sm">{batch.warehouse}</td>
                    <td className="px-6 py-4 text-sm"><span className={`px-2 py-1 text-xs font-medium rounded-full ${batch.status === 'Safe' ? 'bg-green-100 text-green-700' : batch.status === 'Near Expiry' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>{batch.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {selectedItemTab === 'suppliers' && (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Supplier</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Last PO</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Last Delivery</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Lead Time</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase">Price</th>
                  <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase">Reliability</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {detail.supplierHistory.map((supplier, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium">{supplier.supplier}</td>
                    <td className="px-6 py-4 text-sm font-mono">{supplier.lastPO}</td>
                    <td className="px-6 py-4 text-sm">{supplier.lastDelivery}</td>
                    <td className="px-6 py-4 text-sm">{supplier.leadTime}</td>
                    <td className="px-6 py-4 text-sm font-mono text-right">LKR {supplier.price.toFixed(2)}</td>
                    <td className="px-6 py-4 text-center text-sm"><span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">{supplier.reliability}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {selectedItemTab === 'sales' && (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Date</th>
                  <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase">Quantity Sold</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase">Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {detail.salesData.map((sale, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm">{sale.date}</td>
                    <td className="px-6 py-4 text-center text-sm font-mono">{sale.quantity}</td>
                    <td className="px-6 py-4 text-right text-sm font-mono text-green-600">LKR {sale.revenue.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {selectedItemTab === 'reorder' && (
          <div className="space-y-4">
            <div className={`${item.stock <= detail.reorderLevel ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'} border rounded-lg p-6`}>
              <p className={`text-sm ${item.stock <= detail.reorderLevel ? 'text-red-600' : 'text-green-600'} font-semibold`}>{item.stock <= detail.reorderLevel ? 'REORDER REQUIRED' : 'IN STOCK'}</p>
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div>
                  <p className="text-sm text-gray-600">Current Stock</p>
                  <p className="text-2xl font-bold mt-1">{item.stock}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Reorder Level</p>
                  <p className="text-2xl font-bold mt-1">{detail.reorderLevel}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Reorder Quantity</p>
                  <p className="text-2xl font-bold mt-1">{detail.reorderQuantity}</p>
                </div>
              </div>
              {item.stock <= detail.reorderLevel && (
                <button onClick={() => alert('Creating purchase order for ' + item.name)} className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Create Purchase Order</button>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  const StockOverviewScreen = () => {
    const filteredItems = items.filter(item => {
      if (stockFilterCategory && item.category !== stockFilterCategory) return false;
      if (stockFilterWarehouse && item.warehouse !== stockFilterWarehouse) return false;
      if (stockFilterDate && new Date(item.expiryDate) > new Date(stockFilterDate)) return false;
      return true;
    });

    const lowStockItems = filteredItems.filter(i => i.status === 'Low Stock').length;
    const outOfStockItems = filteredItems.filter(i => i.status === 'Out of Stock').length;
    const expiringItems = filteredItems.filter(i => new Date(i.expiryDate) < new Date(Date.now() + 30*24*60*60*1000)).length;
    const totalValue = filteredItems.reduce((sum, i) => sum + (i.stock * i.price), 0);

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Stock Overview</h2>
          <p className="text-gray-600 mt-1">Real-time inventory dashboard</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">By Category</label>
              <select value={stockFilterCategory} onChange={(e) => setStockFilterCategory(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                <option value="">All Categories</option>
                {categories.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">By Warehouse / Store</label>
              <select value={stockFilterWarehouse} onChange={(e) => setStockFilterWarehouse(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                <option value="">All Locations</option>
                {warehouses.map((w) => <option key={w.id} value={w.name}>{w.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Expiry By Date</label>
              <input value={stockFilterDate} onChange={(e) => setStockFilterDate(e.target.value)} type="date" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
            </div>
          </div>
          <button onClick={() => { setStockFilterCategory(''); setStockFilterWarehouse(''); setStockFilterDate(''); }} className="mt-4 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">Clear Filters</button>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-5 gap-4">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Items</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{filteredItems.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg"><Package className="text-blue-600" size={24} /></div>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Stock Value</p>
                <p className="text-2xl font-bold text-green-600 mt-2">LKR {(totalValue / 1000).toFixed(1)}k</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg"><TrendingUp className="text-green-600" size={24} /></div>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Low Stock Items</p>
                <p className="text-3xl font-bold text-orange-600 mt-2">{lowStockItems}</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg"><AlertTriangle className="text-orange-600" size={24} /></div>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Out of Stock</p>
                <p className="text-3xl font-bold text-red-600 mt-2">{outOfStockItems}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-lg"><AlertTriangle className="text-red-600" size={24} /></div>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Expiring Soon</p>
                <p className="text-3xl font-bold text-purple-600 mt-2">{expiringItems}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg"><Calendar className="text-purple-600" size={24} /></div>
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Item</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Warehouse</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Price</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Expiry Date</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.category}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.warehouse}</td>
                  <td className="px-6 py-4 text-sm font-mono text-gray-900">{item.stock}</td>
                  <td className="px-6 py-4 text-sm font-mono text-gray-900">LKR {item.price.toFixed(2)}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.expiryDate}</td>
                  <td className="px-6 py-4"><span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(item.status)}`}>{item.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const CategoryManagementScreen = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Category Management</h2>
          <p className="text-gray-600 mt-1">Organize your inventory categories</p>
        </div>
        <button onClick={() => setIsAddCategoryOpen(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700">
          <Plus size={20} />
          Add Category
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {categories.map((cat) => (
          <div key={cat.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg" style={{ backgroundColor: `${cat.color}20` }}>
                <Tag size={24} style={{ color: cat.color }} />
              </div>
              <div className="flex gap-1">
                <button onClick={() => alert('Edit category: ' + cat.name)} className="p-1.5 text-gray-600 hover:bg-gray-50 rounded">
                  <Edit size={16} />
                </button>
                <button onClick={() => setCategories(categories.filter(c => c.id !== cat.id))} className="p-1.5 text-red-600 hover:bg-red-50 rounded">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">{cat.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{cat.items} items</p>
          </div>
        ))}
      </div>
    </div>
  );


  const BrandManagementScreen = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Brand Management</h2>
          <p className="text-gray-600 mt-1">Manage brand list, suppliers and units</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setIsAddBrandOpen(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700">
            <Plus size={20} /> Add Brand
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Brand ID</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Brand Name</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Supplier</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Units</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Description</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Extras</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Country</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Logo</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {brands.map((b) => (
              <tr key={b.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-mono text-gray-900">{b.id}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{b.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{b.supplier}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{(b.units || []).join(', ')}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{b.description}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{b.status}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{b.extras}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{b.country || '-'}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{b.logo ? (<img src={b.logo} alt={b.name} className="h-8 w-8 object-contain rounded"/>) : '-'}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => alert('Edit brand: ' + b.name)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"><Edit size={16} /></button>
                    <button onClick={() => setBrands(brands.filter(x => x.id !== b.id))} className="p-1.5 text-red-600 hover:bg-red-50 rounded"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Brand Modal */}
      {isAddBrandOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-40" onClick={() => setIsAddBrandOpen(false)}></div>
          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md mx-4 sm:mx-6 z-10 max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Add Brand</h2>
                    <p className="text-gray-600 mt-1">Create a new brand</p>
                  </div>
                  <button onClick={() => setIsAddBrandOpen(false)} className="text-gray-500 hover:text-gray-700">×</button>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Brand ID *</label>
                      <input value={brandForm.id} onChange={(e) => setBrandForm({...brandForm, id: e.target.value})} type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="BRD001" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Brand Name *</label>
                      <input value={brandForm.name} onChange={(e) => setBrandForm({...brandForm, name: e.target.value})} type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="Brand name" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Supplier *</label>
                      <select value={brandForm.supplier} onChange={(e) => setBrandForm({...brandForm, supplier: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                        <option value="">Select supplier</option>
                        {suppliers.map((s) => (
                          <option key={s.id} value={s.name}>{s.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Units (comma separated)</label>
                      <input value={brandForm.units} onChange={(e) => setBrandForm({...brandForm, units: e.target.value})} type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="Bottle, Can" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <textarea value={brandForm.description} onChange={(e) => setBrandForm({...brandForm, description: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="Short description" rows="2" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                      <select value={brandForm.status} onChange={(e) => setBrandForm({...brandForm, status: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Extras</label>
                      <input value={brandForm.extras} onChange={(e) => setBrandForm({...brandForm, extras: e.target.value})} type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="Any extra info" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Brand Logo (URL)</label>
                      <input value={brandForm.logo} onChange={(e) => setBrandForm({...brandForm, logo: e.target.value})} type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="https://..." />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Country (optional)</label>
                      <input value={brandForm.country} onChange={(e) => setBrandForm({...brandForm, country: e.target.value})} type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="Country" />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
                    <button onClick={() => { setIsAddBrandOpen(false); setBrandForm({ id: '', name: '', supplier: '', units: '', description: '', status: 'Active', extras: '', logo: '', country: '' }); }} className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">Cancel</button>
                    <button onClick={() => { if (!brandForm.id || !brandForm.name || !brandForm.supplier) { alert('Please fill required fields'); return; } setBrands([...brands, { ...brandForm, units: brandForm.units ? brandForm.units.split(',').map(u=>u.trim()) : [], }]); setIsAddBrandOpen(false); setBrandForm({ id: '', name: '', supplier: '', units: '', description: '', status: 'Active', extras: '', logo: '', country: '' }); }} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Save Brand</button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const SupplierManagementScreen = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Supplier Management</h2>
          <p className="text-gray-600 mt-1">Manage your suppliers</p>
        </div>
        <button onClick={() => setIsAddSupplierOpen(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700">
          <Plus size={20} />
          Add Supplier
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {suppliers.map((s) => (
          <div key={s.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-blue-50">
                <Archive size={24} className="text-blue-600" />
              </div>
              <div className="flex gap-1">
                <button onClick={() => alert('Edit supplier: ' + s.name)} className="p-1.5 text-gray-600 hover:bg-gray-50 rounded">
                  <Edit size={16} />
                </button>
                <button onClick={() => setSuppliers(suppliers.filter(x => x.id !== s.id))} className="p-1.5 text-red-600 hover:bg-red-50 rounded">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">{s.name} <span className="text-xs font-mono text-gray-500 ml-2">{s.id}</span></h3>
            <p className="text-sm text-gray-600 mt-1"><span className="font-medium">Category:</span> {s.category}</p>
            <p className="text-sm text-gray-600 mt-1">{s.product}</p>
            <p className="text-sm text-gray-600 mt-1">{s.contact}</p> 
          </div>
        ))}
      </div>
    </div>
  );

  const TransferApprovalScreen = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Transfer Approval</h2>
        <p className="text-gray-600 mt-1">Review and approve stock transfers</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Transfer ID</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">From</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">To</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Items</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {stockTransfers.map((transfer) => (
              <tr key={transfer.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-mono text-gray-900">{transfer.id}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{transfer.from}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{transfer.to}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{transfer.items} items</td>
                <td className="px-6 py-4 text-sm text-gray-600">{transfer.date}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(transfer.status)}`}>
                    {transfer.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  {transfer.status === 'Pending' && (
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => alert('Transfer approved: ' + transfer.id)} className="px-3 py-1.5 bg-green-600 text-white text-sm rounded hover:bg-green-700">
                        Approve
                      </button>
                      <button onClick={() => alert('Transfer rejected: ' + transfer.id)} className="px-3 py-1.5 bg-red-600 text-white text-sm rounded hover:bg-red-700">
                        Reject
                      </button>
                    </div>
                  )}
                  {transfer.status !== 'Pending' && (
                    <button onClick={() => alert('Transfer details: ' + transfer.id)} className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded hover:bg-gray-200">
                      View Details
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const BatchWiseStockScreen = () => {
    const today = new Date('2026-01-11');
    const thirtyDaysLater = new Date(today.getTime() + 30*24*60*60*1000);
    
    const filteredBatches = batchFilterItem ? batches.filter(b => b.itemId === batchFilterItem) : batches;

    const getBatchAlert = (expiryDate) => {
      const expiry = new Date(expiryDate);
      if (expiry < today) return 'Expired';
      if (expiry < thirtyDaysLater) return 'Near Expiry';
      return 'Safe';
    };

    const getAlertColor = (alert) => {
      switch(alert) {
        case 'Expired': return 'bg-red-100 text-red-700 border-red-300';
        case 'Near Expiry': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
        case 'Safe': return 'bg-green-100 text-green-700 border-green-300';
        default: return 'bg-gray-100 text-gray-700 border-gray-300';
      }
    };

    const expiredBatches = filteredBatches.filter(b => getBatchAlert(b.expiryDate) === 'Expired').length;
    const nearExpiryBatches = filteredBatches.filter(b => getBatchAlert(b.expiryDate) === 'Near Expiry').length;

    const handleExportReport = () => {
      const csvContent = [
        ['Item Name', 'Batch Number', 'Quantity', 'Expiry Date', 'Purchase Date', 'Warehouse', 'Alert Status'],
        ...filteredBatches.map(b => [
          b.itemName,
          b.batchNumber,
          b.quantity,
          b.expiryDate,
          b.purchaseDate,
          b.warehouse,
          getBatchAlert(b.expiryDate)
        ])
      ].map(row => row.join(',')).join('\n');
      
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'batch-stock-report.csv';
      a.click();
    };

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Batch-wise Stock View</h2>
          <p className="text-gray-600 mt-1">Track inventory by batch with expiry monitoring</p>
        </div>

        {/* Alert Summary */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-600 font-semibold">Expired Stock</p>
            <p className="text-2xl font-bold text-red-700 mt-2">{expiredBatches}</p>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-600 font-semibold">Near Expiry</p>
            <p className="text-2xl font-bold text-yellow-700 mt-2">{nearExpiryBatches}</p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm text-green-600 font-semibold">Safe Stock</p>
            <p className="text-2xl font-bold text-green-700 mt-2">{filteredBatches.filter(b => getBatchAlert(b.expiryDate) === 'Safe').length}</p>
          </div>
        </div>

        {/* Filter and Export */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 flex items-end gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Item</label>
            <select value={batchFilterItem} onChange={(e) => setBatchFilterItem(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg">
              <option value="">All Items</option>
              {items.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
            </select>
          </div>
          <button onClick={handleExportReport} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2">
            <Download size={18} />
            Export Report
          </button>
        </div>

        {/* Batch List Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Item Name</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Batch Number</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Expiry Date</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Purchase Date</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Warehouse</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Alert</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredBatches.map((batch) => {
                const alert = getBatchAlert(batch.expiryDate);
                return (
                  <tr key={batch.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{batch.itemName}</td>
                    <td className="px-6 py-4 text-sm font-mono text-gray-600">{batch.batchNumber}</td>
                    <td className="px-6 py-4 text-sm font-mono text-gray-900">{batch.quantity}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{batch.expiryDate}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{batch.purchaseDate}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{batch.warehouse}</td>
                    <td className="px-6 py-4"><span className={`px-2 py-1 text-xs font-medium rounded-full border ${getAlertColor(alert)}`}>{alert}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const ExpiryCalendarScreen = () => {
    const today = new Date('2026-01-11');
    const monthDates = {};
    
    batches.forEach(batch => {
      const date = new Date(batch.expiryDate);
      const thirtyDaysLater = new Date(today.getTime() + 30*24*60*60*1000);
      
      let status = 'safe';
      if (date < today) status = 'expired';
      else if (date < thirtyDaysLater) status = 'near-expiry';
      
      const dateStr = batch.expiryDate;
      if (!monthDates[dateStr]) monthDates[dateStr] = { safe: 0, 'near-expiry': 0, expired: 0, items: [] };
      monthDates[dateStr][status]++;
      monthDates[dateStr].items.push(batch);
    });

    const sortedDates = Object.keys(monthDates).sort();

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Expiry Calendar View</h2>
          <p className="text-gray-600 mt-1">Monitor inventory by expiry date</p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="flex items-center gap-3 bg-white p-4 rounded-lg border border-gray-200">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span className="text-sm text-gray-700"><strong>Green:</strong> Safe ({'>'}30 days)</span>
          </div>
          <div className="flex items-center gap-3 bg-white p-4 rounded-lg border border-gray-200">
            <div className="w-4 h-4 bg-yellow-500 rounded"></div>
            <span className="text-sm text-gray-700"><strong>Yellow:</strong> Near Expiry ({'≤'}30 days)</span>
          </div>
          <div className="flex items-center gap-3 bg-white p-4 rounded-lg border border-gray-200">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span className="text-sm text-gray-700"><strong>Red:</strong> Expired</span>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Expiry Date</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Item Details</th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedDates.map((dateStr) => {
                const dateData = monthDates[dateStr];
                const date = new Date(dateStr);
                const thirtyDaysLater = new Date(today.getTime() + 30*24*60*60*1000);
                
                let bgColor = 'bg-green-50';
                let statusColor = 'bg-green-100 text-green-800';
                let statusText = 'Safe';
                
                if (date < today) {
                  bgColor = 'bg-red-50';
                  statusColor = 'bg-red-100 text-red-800';
                  statusText = 'Expired';
                } else if (date < thirtyDaysLater) {
                  bgColor = 'bg-yellow-50';
                  statusColor = 'bg-yellow-100 text-yellow-800';
                  statusText = 'Near Expiry';
                }

                return (
                  <tr key={dateStr} className={bgColor}>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">{dateStr}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div className="space-y-1">
                        {dateData.items.map((item, idx) => (
                          <div key={idx} className="text-xs">
                            {item.itemName} ({item.batchNumber}) - {item.quantity} units
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusColor}`}>{statusText}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const StockAdjustmentScreen = () => {
    const handleAddAdjustment = () => {
      if (adjustmentForm.itemId && adjustmentForm.currentQty && adjustmentForm.physicalQty) {
        const item = items.find(i => i.id === adjustmentForm.itemId);
        const batch = batches.find(b => b.id === adjustmentForm.batchId);
        const newAdj = {
          id: `ADJ${Date.now()}`,
          itemName: item?.name || '',
          batchNumber: batch?.batchNumber || '',
          previousQty: parseInt(adjustmentForm.currentQty),
          currentQty: parseInt(adjustmentForm.physicalQty),
          adjustmentType: adjustmentForm.adjustmentType,
          reason: adjustmentForm.reason,
          approvedBy: adjustmentForm.approvedBy,
          date: new Date().toISOString().split('T')[0]
        };
        setAdjustments([...adjustments, newAdj]);
        setAdjustmentForm({ itemId: '', batchId: '', currentQty: '', physicalQty: '', adjustmentType: 'Increase', reason: 'Audit', approvedBy: '' });
      }
    };

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Stock Adjustment</h2>
          <p className="text-gray-600 mt-1">Fix stock mismatches between system and physical count</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Stock Adjustment</h3>
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Item</label>
              <select value={adjustmentForm.itemId} onChange={(e) => setAdjustmentForm({...adjustmentForm, itemId: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                <option value="">Select Item</option>
                {items.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Batch</label>
              <select value={adjustmentForm.batchId} onChange={(e) => setAdjustmentForm({...adjustmentForm, batchId: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                <option value="">Select Batch</option>
                {batches.filter(b => !adjustmentForm.itemId || b.itemId === adjustmentForm.itemId).map((batch) => <option key={batch.id} value={batch.id}>{batch.batchNumber}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current System Qty</label>
              <input value={adjustmentForm.currentQty} onChange={(e) => setAdjustmentForm({...adjustmentForm, currentQty: e.target.value})} type="number" placeholder="0" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Physical Count Qty</label>
              <input value={adjustmentForm.physicalQty} onChange={(e) => setAdjustmentForm({...adjustmentForm, physicalQty: e.target.value})} type="number" placeholder="0" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Adjustment Type</label>
              <select value={adjustmentForm.adjustmentType} onChange={(e) => setAdjustmentForm({...adjustmentForm, adjustmentType: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                <option value="Increase">Increase</option>
                <option value="Decrease">Decrease</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Reason</label>
              <select value={adjustmentForm.reason} onChange={(e) => setAdjustmentForm({...adjustmentForm, reason: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                <option value="Damage">Damage</option>
                <option value="Loss">Loss</option>
                <option value="Audit">Audit</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Approved By</label>
              <input value={adjustmentForm.approvedBy} onChange={(e) => setAdjustmentForm({...adjustmentForm, approvedBy: e.target.value})} type="text" placeholder="Enter name" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
            </div>
          </div>
          <button onClick={handleAddAdjustment} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Add Adjustment</button>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Item</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Batch</th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase">Previous Qty</th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase">Current Qty</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Reason</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Approved By</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {adjustments.map((adj) => (
                <tr key={adj.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{adj.itemName}</td>
                  <td className="px-6 py-4 text-sm font-mono text-gray-600">{adj.batchNumber}</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-600">{adj.previousQty}</td>
                  <td className="px-6 py-4 text-center text-sm font-semibold text-gray-900">{adj.currentQty}</td>
                  <td className="px-6 py-4 text-sm"><span className={`px-2 py-1 rounded text-xs font-medium ${adj.adjustmentType === 'Increase' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{adj.adjustmentType}</span></td>
                  <td className="px-6 py-4 text-sm text-gray-600">{adj.reason}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{adj.approvedBy}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{adj.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const DamageEntryScreen = () => {
    const handleAddDamage = () => {
      if (damageForm.itemId && damageForm.quantity && damageForm.reason) {
        const item = items.find(i => i.id === damageForm.itemId);
        const batch = batches.find(b => b.id === damageForm.batchId);
        const newDmg = {
          id: `DMG${Date.now()}`,
          itemName: item?.name || '',
          batchNumber: batch?.batchNumber || '',
          quantity: parseInt(damageForm.quantity),
          reason: damageForm.reason,
          date: damageForm.date || new Date().toISOString().split('T')[0],
          note: damageForm.note
        };
        setDamageEntries([...damageEntries, newDmg]);
        setDamageForm({ itemId: '', batchId: '', quantity: '', reason: '', date: '', note: '' });
      }
    };

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Damage / Wastage Entry</h2>
          <p className="text-gray-600 mt-1">Log damaged or wasted stock</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Damage Entry</h3>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Item</label>
              <select value={damageForm.itemId} onChange={(e) => setDamageForm({...damageForm, itemId: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                <option value="">Select Item</option>
                {items.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Batch</label>
              <select value={damageForm.batchId} onChange={(e) => setDamageForm({...damageForm, batchId: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                <option value="">Select Batch</option>
                {batches.filter(b => !damageForm.itemId || b.itemId === damageForm.itemId).map((batch) => <option key={batch.id} value={batch.id}>{batch.batchNumber}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
              <input value={damageForm.quantity} onChange={(e) => setDamageForm({...damageForm, quantity: e.target.value})} type="number" placeholder="0" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Reason</label>
              <select value={damageForm.reason} onChange={(e) => setDamageForm({...damageForm, reason: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                <option value="">Select Reason</option>
                <option value="Breakage">Breakage</option>
                <option value="Expiry">Expiry</option>
                <option value="Spillage">Spillage</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
              <input value={damageForm.date} onChange={(e) => setDamageForm({...damageForm, date: e.target.value})} type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
            </div>
            <div></div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Supporting Note</label>
            <textarea value={damageForm.note} onChange={(e) => setDamageForm({...damageForm, note: e.target.value})} placeholder="Enter details..." className="w-full px-3 py-2 border border-gray-300 rounded-lg" rows="2"></textarea>
          </div>
          <button onClick={handleAddDamage} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Log Damage Entry</button>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Item</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Batch</th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Reason</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {damageEntries.map((dmg) => (
                <tr key={dmg.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{dmg.itemName}</td>
                  <td className="px-6 py-4 text-sm font-mono text-gray-600">{dmg.batchNumber}</td>
                  <td className="px-6 py-4 text-center text-sm font-semibold text-red-600">{dmg.quantity}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{dmg.reason}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{dmg.date}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{dmg.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const StockTransferCreateScreen = () => {
    const handleCreateTransfer = () => {
      if (transferForm.fromWarehouse && transferForm.toWarehouse && transferForm.itemId && transferForm.quantity) {
        const item = items.find(i => i.id === transferForm.itemId);
        const batch = batches.find(b => b.id === transferForm.batchId);
        const newTransfer = {
          id: `TRF${Date.now()}`,
          fromWarehouse: transferForm.fromWarehouse,
          toWarehouse: transferForm.toWarehouse,
          itemName: item?.name || '',
          quantity: parseInt(transferForm.quantity),
          batchNumber: batch?.batchNumber || '',
          date: transferForm.transferDate || new Date().toISOString().split('T')[0],
          remarks: transferForm.remarks,
          status: 'Draft',
          requestedBy: 'Current User'
        };
        setTransfers([...transfers, newTransfer]);
        setTransferForm({ fromWarehouse: '', toWarehouse: '', itemId: '', quantity: '', batchId: '', transferDate: '', remarks: '', status: 'Draft' });
      }
    };

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Create Stock Transfer</h2>
          <p className="text-gray-600 mt-1">Transfer stock between warehouses</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">New Transfer</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">From Warehouse</label>
              <select value={transferForm.fromWarehouse} onChange={(e) => setTransferForm({...transferForm, fromWarehouse: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                <option value="">Select Source</option>
                {warehouses.map((w) => <option key={w.id} value={w.name}>{w.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">To Warehouse</label>
              <select value={transferForm.toWarehouse} onChange={(e) => setTransferForm({...transferForm, toWarehouse: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                <option value="">Select Destination</option>
                {warehouses.filter(w => w.name !== transferForm.fromWarehouse).map((w) => <option key={w.id} value={w.name}>{w.name}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Item</label>
              <select value={transferForm.itemId} onChange={(e) => setTransferForm({...transferForm, itemId: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                <option value="">Select Item</option>
                {items.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Batch</label>
              <select value={transferForm.batchId} onChange={(e) => setTransferForm({...transferForm, batchId: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                <option value="">Select Batch</option>
                {batches.filter(b => !transferForm.itemId || b.itemId === transferForm.itemId).map((batch) => <option key={batch.id} value={batch.id}>{batch.batchNumber}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
              <input value={transferForm.quantity} onChange={(e) => setTransferForm({...transferForm, quantity: e.target.value})} type="number" placeholder="0" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Transfer Date</label>
              <input value={transferForm.transferDate} onChange={(e) => setTransferForm({...transferForm, transferDate: e.target.value})} type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Remarks</label>
              <input value={transferForm.remarks} onChange={(e) => setTransferForm({...transferForm, remarks: e.target.value})} type="text" placeholder="Enter remarks" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={handleCreateTransfer} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Save as Draft</button>
            <button onClick={() => { handleCreateTransfer(); alert('Transfer submitted for approval'); }} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Submit</button>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">From</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">To</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Item</th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase">Qty</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Batch</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {transfers.map((tr) => (
                <tr key={tr.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-600">{tr.fromWarehouse}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{tr.toWarehouse}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{tr.itemName}</td>
                  <td className="px-6 py-4 text-center text-sm font-mono">{tr.quantity}</td>
                  <td className="px-6 py-4 text-sm font-mono text-gray-600">{tr.batchNumber}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{tr.date}</td>
                  <td className="px-6 py-4"><span className={`px-2 py-1 text-xs font-medium rounded-full ${tr.status === 'Draft' ? 'bg-gray-100 text-gray-700' : tr.status === 'Submitted' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>{tr.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const StockValuationScreen = () => {
    const [valuationMethod, setValuationMethod] = useState('FIFO');

    const calculateValuation = (method) => {
      return batches.map((batch) => {
        const item = items.find(i => i.id === batch.itemId);
        const costPerUnit = item?.price || 0;
        const totalCost = batch.quantity * costPerUnit;
        return { ...batch, costPerUnit, totalCost };
      });
    };

    const valuationData = calculateValuation(valuationMethod);
    const totalValue = valuationData.reduce((sum, item) => sum + item.totalCost, 0);

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Stock Valuation Report</h2>
          <p className="text-gray-600 mt-1">Calculate inventory value using different methods</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-sm font-medium text-gray-700">Valuation Method:</span>
            <div className="flex gap-2">
              {['FIFO', 'Weighted Average'].map((method) => (
                <button key={method} onClick={() => setValuationMethod(method)} className={`px-4 py-2 rounded-lg ${valuationMethod === method ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                  {method}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-600 font-semibold">Method</p>
            <p className="text-2xl font-bold text-blue-700 mt-2">{valuationMethod}</p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm text-green-600 font-semibold">Total Items</p>
            <p className="text-2xl font-bold text-green-700 mt-2">{valuationData.length}</p>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <p className="text-sm text-purple-600 font-semibold">Total Value</p>
            <p className="text-2xl font-bold text-purple-700 mt-2">LKR {(totalValue / 1000).toFixed(1)}k</p>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Item</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Batch</th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase">Quantity</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase">Cost/Unit</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase">Total Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {valuationData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.itemName}</td>
                  <td className="px-6 py-4 text-sm font-mono text-gray-600">{item.batchNumber}</td>
                  <td className="px-6 py-4 text-center text-sm font-mono">{item.quantity}</td>
                  <td className="px-6 py-4 text-right text-sm font-mono">LKR {item.costPerUnit.toFixed(2)}</td>
                  <td className="px-6 py-4 text-right text-sm font-semibold text-gray-900">LKR {item.totalCost.toFixed(2)}</td>
                </tr>
              ))}
              <tr className="bg-gray-50 font-semibold">
                <td colSpan="4" className="px-6 py-4 text-right text-sm">Total Valuation:</td>
                <td className="px-6 py-4 text-right text-sm">LKR {totalValue.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const StockAgingScreen = () => {
    const today = new Date('2026-01-11');
    const getAgingBucket = (purchaseDate) => {
      const daysInStock = Math.floor((today - new Date(purchaseDate)) / (1000 * 60 * 60 * 24));
      if (daysInStock <= 30) return '0-30 days';
      if (daysInStock <= 60) return '31-60 days';
      if (daysInStock <= 90) return '61-90 days';
      return '90+ days';
    };

    const agingData = batches.map(batch => ({ ...batch, daysInStock: Math.floor((today - new Date(batch.purchaseDate)) / (1000 * 60 * 60 * 24)), agingBucket: getAgingBucket(batch.purchaseDate) }));
    const buckets = { '0-30 days': 0, '31-60 days': 0, '61-90 days': 0, '90+ days': 0 };
    agingData.forEach(item => buckets[item.agingBucket]++);

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Stock Aging Report</h2>
          <p className="text-gray-600 mt-1">Identify dead stock and optimize purchasing decisions</p>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm text-green-600 font-semibold">0-30 Days</p>
            <p className="text-2xl font-bold text-green-700 mt-2">{buckets['0-30 days']}</p>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-600 font-semibold">31-60 Days</p>
            <p className="text-2xl font-bold text-yellow-700 mt-2">{buckets['31-60 days']}</p>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <p className="text-sm text-orange-600 font-semibold">61-90 Days</p>
            <p className="text-2xl font-bold text-orange-700 mt-2">{buckets['61-90 days']}</p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-600 font-semibold">90+ Days</p>
            <p className="text-2xl font-bold text-red-700 mt-2">{buckets['90+ days']}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Item</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Batch</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Purchase Date</th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase">Days in Stock</th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Aging Bucket</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {agingData.map((item) => {
                let bucketColor = 'bg-green-100 text-green-700';
                if (item.agingBucket === '31-60 days') bucketColor = 'bg-yellow-100 text-yellow-700';
                if (item.agingBucket === '61-90 days') bucketColor = 'bg-orange-100 text-orange-700';
                if (item.agingBucket === '90+ days') bucketColor = 'bg-red-100 text-red-700';
                return (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.itemName}</td>
                    <td className="px-6 py-4 text-sm font-mono text-gray-600">{item.batchNumber}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.purchaseDate}</td>
                    <td className="px-6 py-4 text-center text-sm font-semibold text-gray-900">{item.daysInStock}</td>
                    <td className="px-6 py-4 text-center text-sm font-mono">{item.quantity}</td>
                    <td className="px-6 py-4"><span className={`px-2 py-1 text-xs font-semibold rounded-full ${bucketColor}`}>{item.agingBucket}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderScreen = () => {
    switch(activeScreen) {
      case 'item-list': return <ItemListScreen />;
      case 'item-detail': return <ItemDetailScreen />;
      case 'add-item': return <AddItemScreen />;
      case 'stock-overview': return <StockOverviewScreen />;
      case 'batch-stock': return <BatchWiseStockScreen />;
      case 'expiry-calendar': return <ExpiryCalendarScreen />;
      case 'stock-adjustment': return <StockAdjustmentScreen />;
      case 'damage-entry': return <DamageEntryScreen />;
      case 'category-mgmt': return <CategoryManagementScreen />;
      case 'brand-mgmt': return <BrandManagementScreen />;
      case 'supplier-mgmt': return <SupplierManagementScreen />;
      case 'transfer-create': return <StockTransferCreateScreen />;
      case 'approve-transfer': return <TransferApprovalScreen />;
      case 'stock-valuation': return <StockValuationScreen />;
      case 'stock-aging': return <StockAgingScreen />;
      default: 
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <Package size={64} className="text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900">Screen Coming Soon</h3>
              <p className="text-gray-600 mt-2">This feature is under development</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-72 bg-gray-900 text-white overflow-y-auto">
        <div className="p-6 border-b border-gray-800">
          <h1 className="text-xl font-bold">SmartRetail Pro</h1>
          <p className="text-sm text-gray-400 mt-1">Inventory Management</p>
        </div>
        
        <nav className="p-4">
          {navigation.map((section) => (
            <div key={section.id} className="mb-6">
              <div className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-gray-400 uppercase">
                <section.icon size={16} />
                {section.label}
              </div>
              <div className="mt-2 space-y-1">
                {section.screens.map((screen) => (
                  <button
                    key={screen.id}
                    onClick={() => setActiveScreen(screen.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                      activeScreen === screen.id
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:bg-gray-800'
                    }`}
                  >
                    <screen.icon size={18} />
                    <span className="text-sm">{screen.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-8">
          {renderScreen()}
        </div>
      </div>

      {/* Add Item Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-40" onClick={() => setIsAddModalOpen(false)}></div>
          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-full sm:max-w-2xl md:max-w-3xl mx-4 sm:mx-6 z-10 max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6">
              <AddItemScreen onClose={() => setIsAddModalOpen(false)} />
            </div>
          </div>
        </div>
      )}

      {/* Add Category Modal */}
      {isAddCategoryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-40" onClick={() => setIsAddCategoryOpen(false)}></div>
          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md mx-4 sm:mx-6 z-10 max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Add Category</h2>
                    <p className="text-gray-600 mt-1">Create a new category</p>
                  </div>
                  <button onClick={() => setIsAddCategoryOpen(false)} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category Name *</label>
                    <input value={categoryForm.name} onChange={(e) => setCategoryForm({...categoryForm, name: e.target.value})} type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="Enter category name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea value={categoryForm.description} onChange={(e) => setCategoryForm({...categoryForm, description: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="Enter category description" rows="3" />
                  </div>
                  <div className="flex items-center gap-3">
                    <input type="checkbox" id="isActive" checked={categoryForm.isActive} onChange={(e) => setCategoryForm({...categoryForm, isActive: e.target.checked})} className="w-4 h-4 text-blue-600 rounded" />
                    <label htmlFor="isActive" className="text-sm font-medium text-gray-700">Active Category</label>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                  <button onClick={() => { setIsAddCategoryOpen(false); setCategoryForm({ name: '', description: '', isActive: true }); }} className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                    Cancel
                  </button>
                  <button onClick={() => { if (!categoryForm.name) { alert('Please enter category name'); return; } const newCategory = { id: Math.max(...categories.map(c => c.id), 0) + 1, name: categoryForm.name, items: 0, color: ['#2196F3', '#4CAF50', '#FF7043', '#00BCD4', '#9C27B0', '#FF9800'][Math.floor(Math.random() * 6)] }; setCategories([...categories, newCategory]); setIsAddCategoryOpen(false); setCategoryForm({ name: '', description: '', isActive: true }); }} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Save Category
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Supplier Modal */}
      {isAddSupplierOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-40" onClick={() => setIsAddSupplierOpen(false)}></div>
          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md mx-4 sm:mx-6 z-10 max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Add Supplier</h2>
                    <p className="text-gray-600 mt-1">Create a new supplier</p>
                  </div>
                  <button onClick={() => setIsAddSupplierOpen(false)} className="text-gray-500 hover:text-gray-700">×</button>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Supplier ID *</label>
                      <input value={supplierForm.id} onChange={(e) => setSupplierForm({...supplierForm, id: e.target.value})} type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="SUP001" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Supplier Name *</label>
                      <input value={supplierForm.name} onChange={(e) => setSupplierForm({...supplierForm, name: e.target.value})} type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="Supplier name" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Contact</label>
                      <input value={supplierForm.contact} onChange={(e) => setSupplierForm({...supplierForm, contact: e.target.value})} type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="011-1234567" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Category Name</label>
                      <select value={supplierForm.category} onChange={(e) => setSupplierForm({...supplierForm, category: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                        <option value="">Select category</option>
                        {categories.map((c) => (
                          <option key={c.id} value={c.name}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Supplying Product</label>
                      <input value={supplierForm.product} onChange={(e) => setSupplierForm({...supplierForm, product: e.target.value})} type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="Beverages, Snacks" />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
                    <button onClick={() => { setIsAddSupplierOpen(false); setSupplierForm({ id: '', name: '', contact: '', product: '', category: '' }); }} className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                      Cancel
                    </button>
                    <button onClick={() => { if (!supplierForm.id || !supplierForm.name || !supplierForm.category) { alert('Please fill required fields'); return; } setSuppliers([...suppliers, supplierForm]); setIsAddSupplierOpen(false); setSupplierForm({ id: '', name: '', contact: '', product: '', category: '' }); }} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      Save Supplier
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filter Modal */}
      {isFilterModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Filter Options</h3>
              <button onClick={() => setIsFilterModalOpen(false)} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select value={itemFilterCategory} onChange={(e) => setItemFilterCategory(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">All Categories</option>
                  {categories.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select value={itemFilterStatus} onChange={(e) => setItemFilterStatus(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">All Status</option>
                  <option>In Stock</option>
                  <option>Low Stock</option>
                  <option>Out of Stock</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                <select value={itemFilterBrand} onChange={(e) => setItemFilterBrand(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">All Brands</option>
                  <option>Coca Cola</option>
                  <option>Lays</option>
                  <option>Anchor</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Supplier</label>
                <select value={itemFilterSupplier} onChange={(e) => setItemFilterSupplier(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">All Suppliers</option>
                  {suppliers.map((s) => <option key={s.id} value={s.name}>{s.name}</option>)}
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
              <button onClick={() => {
                setItemFilterCategory('');
                setItemFilterStatus('');
                setItemFilterBrand('');
                setItemFilterSupplier('');
              }} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                Clear All
              </button>
              <button onClick={() => setIsFilterModalOpen(false)} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryManagementSystem;