import React from 'react';
import { Search, Filter, Download, Plus, Edit, Trash2, FileText, Printer } from 'lucide-react';
import { useInventory } from '../../context/InventoryContext';
import { useData } from '../../context/DataContext';
import { getStatusColor, exportToCSV } from '../../utils/helpers';

const ItemListScreen = () => {
  const { searchQuery, setSearchQuery, setIsAddModalOpen, setIsFilterModalOpen, itemFilterCategory, itemFilterStatus, itemFilterBrand, itemFilterSupplier, setSelectedItemId, setActiveScreen } = useInventory();
  const { items } = useData();

  const filteredItems = items.filter(item => {
    const searchMatch = !searchQuery || 
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const categoryMatch = !itemFilterCategory || item.category === itemFilterCategory;
    const statusMatch = !itemFilterStatus || item.status === itemFilterStatus;
    const brandMatch = !itemFilterBrand || item.brand === itemFilterBrand;
    const supplierMatch = !itemFilterSupplier || item.supplier === itemFilterSupplier;
    
    return searchMatch && categoryMatch && statusMatch && brandMatch && supplierMatch;
  });

  const handleExport = () => {
    const csvContent = [
      ['Item Code', 'Item Name', 'Category', 'Brand', 'Supplier', 'Stock', 'Price', 'Status', 'Warehouse', 'Expiry Date'],
      ...items.map(i => [i.id, i.name, i.category, i.brand, i.supplier, i.stock, i.price, i.status, i.warehouse, i.expiryDate])
    ].map(row => row.join(',')).join('\n');
    
    exportToCSV('items.csv', csvContent);
  };

  return (
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
        <button onClick={handleExport} className="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50">
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
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredItems.map((item) => (
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
};

export default ItemListScreen;
