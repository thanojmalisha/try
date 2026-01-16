import React from 'react';
import { Plus, Edit, Trash2, Archive } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useInventory } from '../../context/InventoryContext';

const CategoryManagementScreen = () => {
  const { categories, setCategories } = useData();
  const { setIsAddCategoryOpen } = useInventory();

  return (
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
                <Archive size={24} style={{ color: cat.color }} />
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
};

export default CategoryManagementScreen;
