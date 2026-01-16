import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useInventory } from '../../context/InventoryContext';
import { Calendar, AlertTriangle, Package } from 'lucide-react';
import { getBatchAlert, getAlertColor, formatCurrency } from '../../utils/helpers';

const ExpiryCalendarScreen = () => {
  const { batches, items, categories } = useData();
  const { itemFilterCategory } = useInventory();
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  // Filter batches by category if selected
  const filteredBatches = itemFilterCategory
    ? batches.filter(batch => {
        const item = items.find(i => i.id === batch.itemId);
        return item?.category === itemFilterCategory;
      })
    : batches;

  // Group batches by month
  const batchesByMonth = {};
  filteredBatches.forEach(batch => {
    const date = new Date(batch.expiryDate);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    if (!batchesByMonth[monthKey]) {
      batchesByMonth[monthKey] = [];
    }
    batchesByMonth[monthKey].push(batch);
  });

  // Get months for display
  const months = Object.keys(batchesByMonth).sort();
  const currentMonth = `${selectedMonth.getFullYear()}-${String(selectedMonth.getMonth() + 1).padStart(2, '0')}`;

  // Get days in selected month
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const daysInSelectedMonth = getDaysInMonth(selectedMonth);
  const firstDay = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), 1).getDay();

  // Get batches for selected month
  const batchesInMonth = batchesByMonth[currentMonth] || [];

  // Group batches by day
  const batchesByDay = {};
  batchesInMonth.forEach(batch => {
    const date = new Date(batch.expiryDate);
    const day = date.getDate();
    if (!batchesByDay[day]) {
      batchesByDay[day] = [];
    }
    batchesByDay[day].push(batch);
  });

  // Count statistics
  const expiredCount = filteredBatches.filter(b => getBatchAlert(b.expiryDate, new Date()) === 'Expired').length;
  const nearExpiryCount = filteredBatches.filter(b => getBatchAlert(b.expiryDate, new Date()) === 'Near Expiry').length;
  const safeCount = filteredBatches.filter(b => getBatchAlert(b.expiryDate, new Date()) === 'Safe').length;

  const handlePrevMonth = () => {
    setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1));
  };

  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInSelectedMonth; i++) {
    days.push(i);
  }

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <Calendar className="w-8 h-8 text-blue-600" />
          Expiry Calendar
        </h1>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm font-medium text-red-600">Expired Items</p>
          <p className="text-3xl font-bold text-red-700 mt-2">{expiredCount}</p>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm font-medium text-yellow-600">Near Expiry (30 days)</p>
          <p className="text-3xl font-bold text-yellow-700 mt-2">{nearExpiryCount}</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-sm font-medium text-green-600">Safe Stock</p>
          <p className="text-3xl font-bold text-green-700 mt-2">{safeCount}</p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm font-medium text-blue-600">Total Batches</p>
          <p className="text-3xl font-bold text-blue-700 mt-2">{filteredBatches.length}</p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Filtered by Category
        </label>
        <p className="text-gray-600">
          {itemFilterCategory || 'All Categories'} ({filteredBatches.length} batches)
        </p>
      </div>

      {/* Calendar */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handlePrevMonth}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
          >
            ← Previous
          </button>
          <h2 className="text-xl font-bold text-gray-900">
            {monthNames[selectedMonth.getMonth()]} {selectedMonth.getFullYear()}
          </h2>
          <button
            onClick={handleNextMonth}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
          >
            Next →
          </button>
        </div>

        {/* Day Names */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {dayNames.map(day => (
            <div key={day} className="text-center font-semibold text-gray-600 py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {days.map((day, index) => {
            if (day === null) {
              return <div key={`empty-${index}`} className="aspect-square"></div>;
            }

            const dayBatches = batchesByDay[day] || [];
            const hasExpired = dayBatches.some(b => getBatchAlert(b.expiryDate, new Date()) === 'Expired');
            const hasNearExpiry = dayBatches.some(b => getBatchAlert(b.expiryDate, new Date()) === 'Near Expiry');

            let bgColor = 'bg-white hover:bg-gray-50';
            if (hasExpired) bgColor = 'bg-red-100 hover:bg-red-200 border-red-300';
            else if (hasNearExpiry) bgColor = 'bg-yellow-100 hover:bg-yellow-200 border-yellow-300';

            return (
              <div
                key={day}
                className={`aspect-square border rounded-lg p-2 transition ${bgColor} cursor-pointer`}
              >
                <p className="font-semibold text-gray-900 text-sm">{day}</p>
                {dayBatches.length > 0 && (
                  <div className="mt-1">
                    <p className="text-xs text-gray-600 font-medium">{dayBatches.length} batch{dayBatches.length > 1 ? 'es' : ''}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Batches Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900">All Expiring Batches</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Item</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Batch</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Expiry Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredBatches.map((batch, index) => {
                const item = items.find(i => i.id === batch.itemId);
                const alert = getBatchAlert(batch.expiryDate, new Date());
                const alertColor = getAlertColor(alert);
                return (
                  <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 transition">
                    <td className="px-6 py-3 text-sm text-gray-900">{item?.name || 'Unknown'}</td>
                    <td className="px-6 py-3 text-sm text-gray-600">{batch.batchNumber}</td>
                    <td className="px-6 py-3 text-sm text-gray-600">
                      {new Date(batch.expiryDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-600">{batch.quantity} units</td>
                    <td className="px-6 py-3">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${alertColor}`}>
                        {alert}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ExpiryCalendarScreen;
