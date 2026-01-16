import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useInventory } from '../../context/InventoryContext';
import { ArrowRightLeft, Plus, Save, X } from 'lucide-react';

const CreateTransferScreen = () => {
  const { items, warehouses, setItems } = useData();
  const [transferForm, setTransferForm] = useState({
    sourceWarehouse: '',
    destinationWarehouse: '',
    transferItems: [],
    reason: 'Stock Rebalancing',
    notes: ''
  });
  const [transferHistory, setTransferHistory] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState('');
  const [selectedQuantity, setSelectedQuantity] = useState('');

  const reasons = [
    'Stock Rebalancing',
    'Store Replenishment',
    'Dead Stock Consolidation',
    'Seasonal Adjustment',
    'Damage Replacement',
    'Quality Control',
    'Emergency Supply',
    'Warehouse Consolidation'
  ];

  const sourceWarehouse = warehouses.find(w => w.id === transferForm.sourceWarehouse);
  const destinationWarehouse = warehouses.find(w => w.id === transferForm.destinationWarehouse);

  // Get items available in source warehouse
  const availableItems = transferForm.sourceWarehouse
    ? items.filter(item => item.warehouse === transferForm.sourceWarehouse && item.stock > 0)
    : [];

  const addItemToTransfer = () => {
    if (!selectedItemId || !selectedQuantity) {
      alert('Please select item and quantity');
      return;
    }

    const item = items.find(i => i.id === selectedItemId);
    if (parseInt(selectedQuantity) > item.stock) {
      alert('Quantity exceeds available stock');
      return;
    }

    // Check if item already in transfer
    const existingItem = transferForm.transferItems.find(ti => ti.itemId === selectedItemId);
    if (existingItem) {
      alert('Item already added to transfer');
      return;
    }

    const newItem = {
      itemId: selectedItemId,
      itemName: item.name,
      quantity: parseInt(selectedQuantity),
      price: item.price,
      totalValue: item.price * parseInt(selectedQuantity)
    };

    setTransferForm({
      ...transferForm,
      transferItems: [...transferForm.transferItems, newItem]
    });

    setSelectedItemId('');
    setSelectedQuantity('');
  };

  const removeItemFromTransfer = (itemId) => {
    setTransferForm({
      ...transferForm,
      transferItems: transferForm.transferItems.filter(ti => ti.itemId !== itemId)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!transferForm.sourceWarehouse || !transferForm.destinationWarehouse || transferForm.transferItems.length === 0) {
      alert('Please fill in all required fields and add items');
      return;
    }

    if (transferForm.sourceWarehouse === transferForm.destinationWarehouse) {
      alert('Source and destination warehouses must be different');
      return;
    }

    // Create transfer record
    const transfer = {
      id: `TRF-${Date.now()}`,
      sourceWarehouse: sourceWarehouse.name,
      destinationWarehouse: destinationWarehouse.name,
      items: transferForm.transferItems,
      reason: transferForm.reason,
      notes: transferForm.notes,
      totalItems: transferForm.transferItems.length,
      totalQuantity: transferForm.transferItems.reduce((sum, ti) => sum + ti.quantity, 0),
      totalValue: transferForm.transferItems.reduce((sum, ti) => sum + ti.totalValue, 0),
      createdDate: new Date().toLocaleString(),
      status: 'Pending',
      createdBy: 'Current User'
    };

    setTransferHistory([transfer, ...transferHistory]);

    // Reset form
    setTransferForm({
      sourceWarehouse: '',
      destinationWarehouse: '',
      transferItems: [],
      reason: 'Stock Rebalancing',
      notes: ''
    });
    setShowForm(false);
  };

  const totalQuantity = transferForm.transferItems.reduce((sum, ti) => sum + ti.quantity, 0);
  const totalValue = transferForm.transferItems.reduce((sum, ti) => sum + ti.totalValue, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <ArrowRightLeft className="w-8 h-8 text-purple-600" />
          Create Transfer
        </h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
        >
          <Plus className="w-5 h-5" />
          New Transfer
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Create Stock Transfer</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Warehouse Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Source Warehouse *
                </label>
                <select
                  value={transferForm.sourceWarehouse}
                  onChange={(e) => setTransferForm({
                    ...transferForm,
                    sourceWarehouse: e.target.value,
                    destinationWarehouse: '',
                    transferItems: []
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select Source Warehouse</option>
                  {warehouses.map(warehouse => (
                    <option key={warehouse.id} value={warehouse.id}>
                      {warehouse.name} ({warehouse.location})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Destination Warehouse *
                </label>
                <select
                  value={transferForm.destinationWarehouse}
                  onChange={(e) => setTransferForm({
                    ...transferForm,
                    destinationWarehouse: e.target.value
                  })}
                  disabled={!transferForm.sourceWarehouse}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100"
                >
                  <option value="">Select Destination Warehouse</option>
                  {warehouses
                    .filter(w => w.id !== transferForm.sourceWarehouse)
                    .map(warehouse => (
                      <option key={warehouse.id} value={warehouse.id}>
                        {warehouse.name} ({warehouse.location})
                      </option>
                    ))}
                </select>
              </div>
            </div>

            {/* Reason */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Transfer Reason *
              </label>
              <select
                value={transferForm.reason}
                onChange={(e) => setTransferForm({
                  ...transferForm,
                  reason: e.target.value
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {reasons.map(reason => (
                  <option key={reason} value={reason}>
                    {reason}
                  </option>
                ))}
              </select>
            </div>

            {/* Item Selection */}
            {transferForm.sourceWarehouse && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-4">
                <h3 className="font-semibold text-gray-900">Add Items to Transfer</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Item
                    </label>
                    <select
                      value={selectedItemId}
                      onChange={(e) => setSelectedItemId(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">Select Item</option>
                      {availableItems.map(item => (
                        <option key={item.id} value={item.id}>
                          {item.name} (Stock: {item.stock})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Quantity
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={selectedQuantity}
                      onChange={(e) => setSelectedQuantity(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Enter quantity"
                    />
                  </div>

                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={addItemToTransfer}
                      className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                    >
                      Add Item
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Items Table */}
            {transferForm.transferItems.length > 0 && (
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Transfer Items</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-200">
                      <tr>
                        <th className="px-4 py-2 text-left text-gray-700">Item</th>
                        <th className="px-4 py-2 text-left text-gray-700">Quantity</th>
                        <th className="px-4 py-2 text-left text-gray-700">Price</th>
                        <th className="px-4 py-2 text-left text-gray-700">Total</th>
                        <th className="px-4 py-2 text-center text-gray-700">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transferForm.transferItems.map((item) => (
                        <tr key={item.itemId} className="border-b border-gray-300">
                          <td className="px-4 py-2">{item.itemName}</td>
                          <td className="px-4 py-2">{item.quantity}</td>
                          <td className="px-4 py-2">PKR {item.price.toFixed(2)}</td>
                          <td className="px-4 py-2 font-semibold">PKR {item.totalValue.toFixed(2)}</td>
                          <td className="px-4 py-2 text-center">
                            <button
                              type="button"
                              onClick={() => removeItemFromTransfer(item.itemId)}
                              className="text-red-600 hover:text-red-800 transition"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                      <tr className="bg-purple-100 font-bold">
                        <td colSpan="1" className="px-4 py-2">Total:</td>
                        <td className="px-4 py-2">{totalQuantity} units</td>
                        <td className="px-4 py-2">-</td>
                        <td className="px-4 py-2">PKR {totalValue.toFixed(2)}</td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <textarea
                value={transferForm.notes}
                onChange={(e) => setTransferForm({
                  ...transferForm,
                  notes: e.target.value
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                rows="3"
                placeholder="Additional notes..."
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
              >
                <Save className="w-5 h-5" />
                Create Transfer
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <p className="text-sm font-medium text-purple-600">Total Transfers</p>
          <p className="text-3xl font-bold text-purple-700 mt-2">{transferHistory.length}</p>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm font-medium text-yellow-600">Pending</p>
          <p className="text-3xl font-bold text-yellow-700 mt-2">
            {transferHistory.filter(t => t.status === 'Pending').length}
          </p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-sm font-medium text-green-600">Total Items Transferred</p>
          <p className="text-3xl font-bold text-green-700 mt-2">
            {transferHistory.reduce((sum, t) => sum + t.totalQuantity, 0)}
          </p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm font-medium text-blue-600">Total Value</p>
          <p className="text-2xl font-bold text-blue-700 mt-2">
            PKR {transferHistory.reduce((sum, t) => sum + t.totalValue, 0).toFixed(0)}
          </p>
        </div>
      </div>

      {/* History Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900">Transfer Requests</h3>
        </div>
        {transferHistory.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p>No transfers created yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">From → To</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Items</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Quantity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Value</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Reason</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Date</th>
                </tr>
              </thead>
              <tbody>
                {transferHistory.map((transfer) => (
                  <tr key={transfer.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                    <td className="px-6 py-3 text-sm font-medium text-gray-900">{transfer.id}</td>
                    <td className="px-6 py-3 text-sm text-gray-600">
                      {transfer.sourceWarehouse} → {transfer.destinationWarehouse}
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-600">{transfer.totalItems}</td>
                    <td className="px-6 py-3 text-sm text-gray-600">{transfer.totalQuantity} units</td>
                    <td className="px-6 py-3 text-sm font-medium">PKR {transfer.totalValue.toFixed(2)}</td>
                    <td className="px-6 py-3 text-sm text-gray-600">{transfer.reason}</td>
                    <td className="px-6 py-3">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800 border border-yellow-300">
                        {transfer.status}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-600">{transfer.createdDate}</td>
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

export default CreateTransferScreen;
