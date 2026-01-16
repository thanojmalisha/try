import React from 'react';
import { useInventory } from '../../context/InventoryContext';
import { useData } from '../../context/DataContext';

const AddCategoryModal = () => {
  const { isAddCategoryOpen, setIsAddCategoryOpen, categoryForm, setCategoryForm } = useInventory();
  const { categories, setCategories } = useData();

  if (!isAddCategoryOpen) return null;

  const handleSaveCategory = () => {
    if (!categoryForm.name) {
      alert('Please enter category name');
      return;
    }
    const newCategory = {
      id: Math.max(...categories.map(c => c.id), 0) + 1,
      name: categoryForm.name,
      items: 0,
      color: ['#2196F3', '#4CAF50', '#FF7043', '#00BCD4', '#9C27B0', '#FF9800'][Math.floor(Math.random() * 6)]
    };
    setCategories([...categories, newCategory]);
    setIsAddCategoryOpen(false);
    setCategoryForm({ name: '', description: '', isActive: true });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-40" onClick={() => setIsAddCategoryOpen(false)}></div>
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md mx-4 z-10 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
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
              <button onClick={handleSaveCategory} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Save Category
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCategoryModal;
