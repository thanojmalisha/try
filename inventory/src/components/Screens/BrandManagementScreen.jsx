import React from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useInventory } from '../../context/InventoryContext';

const BrandManagementScreen = () => {
  const { brands, setBrands } = useData();
  const { isAddBrandOpen, setIsAddBrandOpen, brandForm, setBrandForm } = useInventory();

  const handleSaveBrand = () => {
    if (!brandForm.id || !brandForm.name || !brandForm.supplier) {
      alert('Please fill required fields');
      return;
    }
    setBrands([...brands, { ...brandForm, units: brandForm.units ? brandForm.units.split(',').map(u=>u.trim()) : [], }]);
    setIsAddBrandOpen(false);
    setBrandForm({ id: '', name: '', supplier: '', units: '', description: '', status: 'Active', extras: '', logo: '', country: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Brand Management</h2>
          <p className="text-gray-600 mt-1">Manage brand list, suppliers and units</p>
        </div>
        <button onClick={() => setIsAddBrandOpen(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700">
          <Plus size={20} /> Add Brand
        </button>
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

      {isAddBrandOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-40" onClick={() => setIsAddBrandOpen(false)}></div>
          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md mx-4 z-10 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Add Brand</h2>
                <button onClick={() => setIsAddBrandOpen(false)} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
              </div>

              <div className="space-y-4">
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
              </div>

              <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
                <button onClick={() => { setIsAddBrandOpen(false); setBrandForm({ id: '', name: '', supplier: '', units: '', description: '', status: 'Active', extras: '', logo: '', country: '' }); }} className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">Cancel</button>
                <button onClick={handleSaveBrand} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Save Brand</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrandManagementScreen;
