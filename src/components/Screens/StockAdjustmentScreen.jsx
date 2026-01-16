import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useInventory } from '../../context/InventoryContext';
import { Package, Plus, Save, X } from 'lucide-react';

const StockAdjustmentScreen = () => {
  const { items, batches, setItems, setBatches } = useData();
  const [adjustmentForm, setAdjustmentForm] = useState({
    itemId: '',
    batchId: '',
    reason: 'Stock Count Discrepancy',
    currentQuantity: '',
    newQuantity: '',
    notes: ''
  });
  const [adjustmentHistory, setAdjustmentHistory] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const reasons = [
    'Stock Count Discrepancy',
    'Physical Count Variance',
    'Inventory Audit',
    'Damage Found',
    'Expiry Adjustment',
    'System Correction',
    'Return from Customer',
    'Sample Distribution'
  ];

  const selectedItem = items.find(i => i.id === adjustmentForm.itemId);
  const selectedBatch = batches.find(b => b.id === adjustmentForm.batchId);
  const itemBatches = adjustmentForm.itemId
    ? batches.filter(b => b.itemId === adjustmentForm.itemId)
    : [];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!adjustmentForm.itemId || !adjustmentForm.batchId || !adjustmentForm.newQuantity) {
      alert('Please fill in all required fields');
      return;
    }

    const currentQty = selectedBatch?.quantity || 0;
    const newQty = parseInt(adjustmentForm.newQuantity);
    const difference = newQty - currentQty;

    // Update batch quantity
    const updatedBatches = batches.map(b => 
      b.id === adjustmentForm.batchId
        ? { ...b, quantity: newQty }
        : b
    );
    setBatches(updatedBatches);

    // Update item stock
    const updatedItems = items.map(item => {
      if (item.id === adjustmentForm.itemId) {
        return {
          ...item,
          stock: Math.max(0, item.stock + difference)
        };
      }
      return item;
    });
    setItems(updatedItems);

    // Add to history
    const adjustment = {
      id: Date.now(),
      itemId: adjustmentForm.itemId,
      itemName: selectedItem.name,
      batchId: adjustmentForm.batchId,
      batchNumber: selectedBatch.batchNumber,
      reason: adjustmentForm.reason,
      previousQuantity: currentQty,
      newQuantity: newQty,
      difference: difference,
      notes: adjustmentForm.notes,
      timestamp: new Date().toLocaleString(),
      status: 'Completed'
    };

    setAdjustmentHistory([adjustment, ...adjustmentHistory]);

    // Reset form
    setAdjustmentForm({
      itemId: '',
      batchId: '',
      reason: 'Stock Count Discrepancy',
      currentQuantity: '',
      newQuantity: '',
      notes: ''
    });
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <Package className="w-8 h-8 text-blue-600" />
          Stock Adjustment
        </h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <Plus className="w-5 h-5" />
          New Adjustment
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Create Stock Adjustment</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Item Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Item *
                </label>
                <select
                  value={adjustmentForm.itemId}
                  onChange={(e) => setAdjustmentForm({
                    ...adjustmentForm,
                    itemId: e.target.value,
                    batchId: ''
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Item</option>
                  {items.map(item => (
                    <option key={item.id} value={item.id}>
                      {item.name} (Stock: {item.stock})
                    </option>
                  ))}
                </select>
              </div>

              {/* Batch Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Batch *
                </label>
                <select
                  value={adjustmentForm.batchId}
                  onChange={(e) => {
                    const batch = batches.find(b => b.id === e.target.value);
                    setAdjustmentForm({
                      ...adjustmentForm,
                      batchId: e.target.value,
                      currentQuantity: batch?.quantity || ''
                    });
                  }}
                  disabled={!adjustmentForm.itemId}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                >
                  <option value="">Select Batch</option>
                  {itemBatches.map(batch => (
                    <option key={batch.id} value={batch.id}>
                      {batch.batchNumber} (Qty: {batch.quantity})
                    </option>
                  ))}
                </select>
              </div>

              {/* Reason */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Adjustment Reason *
                </label>
                <select
                  value={adjustmentForm.reason}
                  onChange={(e) => setAdjustmentForm({
                    ...adjustmentForm,
                    reason: e.target.value
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {reasons.map(reason => (
                    <option key={reason} value={reason}>
                      {reason}
                    </option>
                  ))}
                </select>
              </div>

              {/* Current Quantity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Quantity
                </label>
                <input
                  type="number"
                  value={adjustmentForm.currentQuantity}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
                />
              </div>

              {/* New Quantity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Quantity *
                </label>
                <input
                  type="number"
                  min="0"
                  value={adjustmentForm.newQuantity}
                  onChange={(e) => setAdjustmentForm({
                    ...adjustmentForm,
                    newQuantity: e.target.value
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter new quantity"
                />
              </div>

              {/* Difference */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Difference
                </label>
                <div className={`px-3 py-2 rounded-lg text-lg font-bold ${
                  adjustmentForm.newQuantity - (adjustmentForm.currentQuantity || 0) > 0
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}>
                  {(adjustmentForm.newQuantity || 0) - (adjustmentForm.currentQuantity || 0) > 0 ? '+' : ''}
                  {(adjustmentForm.newQuantity || 0) - (adjustmentForm.currentQuantity || 0)}
                </div>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <textarea
                value={adjustmentForm.notes}
                onChange={(e) => setAdjustmentForm({
                  ...adjustmentForm,
                  notes: e.target.value
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
                placeholder="Additional notes..."
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                <Save className="w-5 h-5" />
                Save Adjustment
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
              >
                <X className="w-5 h-5" />
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm font-medium text-blue-600">Total Adjustments</p>
          <p className="text-3xl font-bold text-blue-700 mt-2">{adjustmentHistory.length}</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-sm font-medium text-green-600">Stock Increases</p>
          <p className="text-3xl font-bold text-green-700 mt-2">
            {adjustmentHistory.filter(a => a.difference > 0).length}
          </p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm font-medium text-red-600">Stock Decreases</p>
          <p className="text-3xl font-bold text-red-700 mt-2">
            {adjustmentHistory.filter(a => a.difference < 0).length}
          </p>
        </div>
      </div>

      {/* History Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900">Adjustment History</h3>
        </div>
        {adjustmentHistory.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p>No stock adjustments yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Item</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Batch</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Reason</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Previous</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">New</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Difference</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Date</th>
                </tr>
              </thead>
              <tbody>
                {adjustmentHistory.map((adj) => (
                  <tr key={adj.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                    <td className="px-6 py-3 text-sm text-gray-900">{adj.itemName}</td>
                    <td className="px-6 py-3 text-sm text-gray-600">{adj.batchNumber}</td>
                    <td className="px-6 py-3 text-sm text-gray-600">{adj.reason}</td>
                    <td className="px-6 py-3 text-sm text-gray-600">{adj.previousQuantity}</td>
                    <td className="px-6 py-3 text-sm text-gray-600">{adj.newQuantity}</td>
                    <td className="px-6 py-3 text-sm font-medium">
                      <span className={adj.difference > 0 ? 'text-green-600' : 'text-red-600'}>
                        {adj.difference > 0 ? '+' : ''}{adj.difference}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-600">{adj.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default StockAdjustmentScreen;
