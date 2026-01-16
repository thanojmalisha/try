import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useInventory } from '../../context/InventoryContext';
import { AlertTriangle, Plus, Save, X, Trash2 } from 'lucide-react';

const DamageEntryScreen = () => {
  const { items, batches, setItems, setBatches } = useData();
  const [damageForm, setDamageForm] = useState({
    itemId: '',
    batchId: '',
    quantity: '',
    damageType: 'Physical Damage',
    severity: 'Minor',
    discoveredDate: new Date().toISOString().split('T')[0],
    reportedBy: '',
    description: ''
  });
  const [damageHistory, setDamageHistory] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const damageTypes = [
    'Physical Damage',
    'Water Damage',
    'Pest Damage',
    'Expiry',
    'Manufacturing Defect',
    'Quality Issue',
    'Packaging Damage',
    'Contamination'
  ];

  const severityLevels = [
    { label: 'Minor', color: 'bg-yellow-50 border-yellow-200 text-yellow-700' },
    { label: 'Moderate', color: 'bg-orange-50 border-orange-200 text-orange-700' },
    { label: 'Severe', color: 'bg-red-50 border-red-200 text-red-700' }
  ];

  const selectedItem = items.find(i => i.id === damageForm.itemId);
  const selectedBatch = batches.find(b => b.id === damageForm.batchId);
  const itemBatches = damageForm.itemId
    ? batches.filter(b => b.itemId === damageForm.itemId)
    : [];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!damageForm.itemId || !damageForm.batchId || !damageForm.quantity) {
      alert('Please fill in all required fields');
      return;
    }

    const damageQty = parseInt(damageForm.quantity);
    const batchQty = selectedBatch?.quantity || 0;

    if (damageQty > batchQty) {
      alert('Damage quantity cannot exceed batch quantity');
      return;
    }

    // Update batch quantity (reduce by damage)
    const updatedBatches = batches.map(b => 
      b.id === damageForm.batchId
        ? { ...b, quantity: Math.max(0, b.quantity - damageQty), status: 'Damaged' }
        : b
    );
    setBatches(updatedBatches);

    // Update item stock
    const updatedItems = items.map(item => {
      if (item.id === damageForm.itemId) {
        return {
          ...item,
          stock: Math.max(0, item.stock - damageQty)
        };
      }
      return item;
    });
    setItems(updatedItems);

    // Add to history
    const damage = {
      id: Date.now(),
      itemId: damageForm.itemId,
      itemName: selectedItem.name,
      batchId: damageForm.batchId,
      batchNumber: selectedBatch.batchNumber,
      quantity: damageQty,
      damageType: damageForm.damageType,
      severity: damageForm.severity,
      discoveredDate: damageForm.discoveredDate,
      reportedBy: damageForm.reportedBy,
      description: damageForm.description,
      entryDate: new Date().toLocaleString(),
      status: 'Reported'
    };

    setDamageHistory([damage, ...damageHistory]);

    // Reset form
    setDamageForm({
      itemId: '',
      batchId: '',
      quantity: '',
      damageType: 'Physical Damage',
      severity: 'Minor',
      discoveredDate: new Date().toISOString().split('T')[0],
      reportedBy: '',
      description: ''
    });
    setShowForm(false);
  };

  const handleDeleteDamage = (id) => {
    if (window.confirm('Are you sure you want to delete this damage record?')) {
      setDamageHistory(damageHistory.filter(d => d.id !== id));
    }
  };

  // Calculate totals
  const totalDamagedUnits = damageHistory.reduce((sum, d) => sum + d.quantity, 0);
  const severeCases = damageHistory.filter(d => d.severity === 'Severe').length;
  const minorCases = damageHistory.filter(d => d.severity === 'Minor').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <AlertTriangle className="w-8 h-8 text-red-600" />
          Damage Entry
        </h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          <Plus className="w-5 h-5" />
          Report Damage
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Report Damaged Stock</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Item Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Item *
                </label>
                <select
                  value={damageForm.itemId}
                  onChange={(e) => setDamageForm({
                    ...damageForm,
                    itemId: e.target.value,
                    batchId: ''
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
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
                  value={damageForm.batchId}
                  onChange={(e) => setDamageForm({
                    ...damageForm,
                    batchId: e.target.value
                  })}
                  disabled={!damageForm.itemId}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-100"
                >
                  <option value="">Select Batch</option>
                  {itemBatches.map(batch => (
                    <option key={batch.id} value={batch.id}>
                      {batch.batchNumber} (Qty: {batch.quantity})
                    </option>
                  ))}
                </select>
              </div>

              {/* Quantity Damaged */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity Damaged *
                </label>
                <input
                  type="number"
                  min="1"
                  max={selectedBatch?.quantity || 999}
                  value={damageForm.quantity}
                  onChange={(e) => setDamageForm({
                    ...damageForm,
                    quantity: e.target.value
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Enter quantity"
                />
              </div>

              {/* Damage Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Damage Type *
                </label>
                <select
                  value={damageForm.damageType}
                  onChange={(e) => setDamageForm({
                    ...damageForm,
                    damageType: e.target.value
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  {damageTypes.map(type => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Severity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Severity *
                </label>
                <select
                  value={damageForm.severity}
                  onChange={(e) => setDamageForm({
                    ...damageForm,
                    severity: e.target.value
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  {severityLevels.map(level => (
                    <option key={level.label} value={level.label}>
                      {level.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Discovered Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date Discovered *
                </label>
                <input
                  type="date"
                  value={damageForm.discoveredDate}
                  onChange={(e) => setDamageForm({
                    ...damageForm,
                    discoveredDate: e.target.value
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* Reported By */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reported By
                </label>
                <input
                  type="text"
                  value={damageForm.reportedBy}
                  onChange={(e) => setDamageForm({
                    ...damageForm,
                    reportedBy: e.target.value
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Staff name or ID"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Damage Description
              </label>
              <textarea
                value={damageForm.description}
                onChange={(e) => setDamageForm({
                  ...damageForm,
                  description: e.target.value
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                rows="3"
                placeholder="Detailed description of the damage..."
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                <Save className="w-5 h-5" />
                Report Damage
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
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm font-medium text-red-600">Total Reports</p>
          <p className="text-3xl font-bold text-red-700 mt-2">{damageHistory.length}</p>
        </div>
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <p className="text-sm font-medium text-orange-600">Units Damaged</p>
          <p className="text-3xl font-bold text-orange-700 mt-2">{totalDamagedUnits}</p>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <p className="text-sm font-medium text-purple-600">Severe Cases</p>
          <p className="text-3xl font-bold text-purple-700 mt-2">{severeCases}</p>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm font-medium text-yellow-600">Minor Cases</p>
          <p className="text-3xl font-bold text-yellow-700 mt-2">{minorCases}</p>
        </div>
      </div>

      {/* History Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900">Damage Reports</h3>
        </div>
        {damageHistory.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p>No damage reports yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Item</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Batch</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Quantity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Severity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Reported By</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Action</th>
                </tr>
              </thead>
              <tbody>
                {damageHistory.map((damage) => {
                  const severityColor = severityLevels.find(s => s.label === damage.severity)?.color;
                  return (
                    <tr key={damage.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                      <td className="px-6 py-3 text-sm text-gray-900">{damage.itemName}</td>
                      <td className="px-6 py-3 text-sm text-gray-600">{damage.batchNumber}</td>
                      <td className="px-6 py-3 text-sm font-medium text-red-600">{damage.quantity}</td>
                      <td className="px-6 py-3 text-sm text-gray-600">{damage.damageType}</td>
                      <td className="px-6 py-3">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${severityColor}`}>
                          {damage.severity}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-sm text-gray-600">{damage.reportedBy || '-'}</td>
                      <td className="px-6 py-3 text-sm text-gray-600">
                        {new Date(damage.discoveredDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-3 text-sm">
                        <button
                          onClick={() => handleDeleteDamage(damage.id)}
                          className="text-red-600 hover:text-red-800 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DamageEntryScreen;
