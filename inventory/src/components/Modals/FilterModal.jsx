import React from 'react';
import { useInventory } from '../../context/InventoryContext';
import { useData } from '../../context/DataContext';

const FilterModal = () => {
  const { isFilterModalOpen, setIsFilterModalOpen, itemFilterCategory, setItemFilterCategory, itemFilterStatus, setItemFilterStatus, itemFilterBrand, setItemFilterBrand, itemFilterSupplier, setItemFilterSupplier } = useInventory();
  const { categories, suppliers } = useData();

  if (!isFilterModalOpen) return null;

  return (
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
  );
};

export default FilterModal;
