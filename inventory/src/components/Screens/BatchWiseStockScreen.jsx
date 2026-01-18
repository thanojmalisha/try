import React from 'react';
import { useInventory } from '../../context/InventoryContext';
import { useData } from '../../context/DataContext';

const BatchWiseStockScreen = () => {
  const { batchFilterItem, setBatchFilterItem } = useInventory();
  const { batches, items } = useData();

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

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Batch-wise Stock View</h2>
        <p className="text-gray-600 mt-1">Track inventory by batch with expiry monitoring</p>
      </div>

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

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Items</label>
        <select value={batchFilterItem} onChange={(e) => setBatchFilterItem(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg">
          <option value="">All Items</option>
          {items.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
        </select>
      </div>

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

export default BatchWiseStockScreen;
