import React from 'react';
import { Plus, Edit, Trash2, Archive } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useInventory } from '../../context/InventoryContext';

const SupplierManagementScreen = () => {
  const { suppliers, setSuppliers, categories } = useData();
  const { isAddSupplierOpen, setIsAddSupplierOpen, supplierForm, setSupplierForm } = useInventory();

  const handleSaveSupplier = () => {
    if (!supplierForm.id || !supplierForm.name || !supplierForm.category) {
      alert('Please fill required fields');
      return;
    }
    setSuppliers([...suppliers, supplierForm]);
    setIsAddSupplierOpen(false);
    setSupplierForm({ id: '', name: '', contact: '', product: '', category: '' });
  };

  return (
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

      {isAddSupplierOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-40" onClick={() => setIsAddSupplierOpen(false)}></div>
          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md mx-4 z-10 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Add Supplier</h2>
                <button onClick={() => setIsAddSupplierOpen(false)} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
              </div>

              <div className="space-y-4">
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
                <button onClick={handleSaveSupplier} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Save Supplier
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupplierManagementScreen;
