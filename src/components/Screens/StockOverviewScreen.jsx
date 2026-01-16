import React from 'react';
import { Package, BarChart3, AlertTriangle, TrendingUp, Calendar } from 'lucide-react';
import { useInventory } from '../../context/InventoryContext';
import { useData } from '../../context/DataContext';
import { getStatusColor } from '../../utils/helpers';

const StockOverviewScreen = () => {
  const { stockFilterCategory, setStockFilterCategory, stockFilterWarehouse, setStockFilterWarehouse, stockFilterDate, setStockFilterDate } = useInventory();
  const { items, categories, warehouses } = useData();

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

export default StockOverviewScreen;
