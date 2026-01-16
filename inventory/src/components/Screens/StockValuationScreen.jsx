import React from 'react';
import { Download } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { exportToCSV } from '../../utils/helpers';

const StockValuationScreen = () => {
  const [valuationMethod, setValuationMethod] = React.useState('FIFO');
  const { batches, items } = useData();

  const calculateValuation = (method) => {
    return batches.map((batch) => {
      const item = items.find(i => i.id === batch.itemId);
      const costPerUnit = item?.price || 0;
      const totalCost = batch.quantity * costPerUnit;
      return { ...batch, costPerUnit, totalCost };
    });
  };

  const valuationData = calculateValuation(valuationMethod);
  const totalValue = valuationData.reduce((sum, item) => sum + item.totalCost, 0);

  const handleExportReport = () => {
    const csvContent = [
      ['Item Name', 'Batch Number', 'Quantity', 'Cost/Unit', 'Total Value'],
      ...valuationData.map(item => [
        item.itemName,
        item.batchNumber,
        item.quantity,
        item.costPerUnit.toFixed(2),
        item.totalCost.toFixed(2)
      ])
    ].map(row => row.join(',')).join('\n');
    
    exportToCSV('stock-valuation.csv', csvContent);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Stock Valuation Report</h2>
        <p className="text-gray-600 mt-1">Calculate inventory value using different methods</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between gap-4 mb-4">
          <span className="text-sm font-medium text-gray-700">Valuation Method:</span>
          <div className="flex gap-2">
            {['FIFO', 'Weighted Average'].map((method) => (
              <button key={method} onClick={() => setValuationMethod(method)} className={`px-4 py-2 rounded-lg ${valuationMethod === method ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                {method}
              </button>
            ))}
          </div>
          <button onClick={handleExportReport} className="ml-auto px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2">
            <Download size={18} />
            Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-600 font-semibold">Method</p>
          <p className="text-2xl font-bold text-blue-700 mt-2">{valuationMethod}</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-sm text-green-600 font-semibold">Total Items</p>
          <p className="text-2xl font-bold text-green-700 mt-2">{valuationData.length}</p>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <p className="text-sm text-purple-600 font-semibold">Total Value</p>
          <p className="text-2xl font-bold text-purple-700 mt-2">LKR {(totalValue / 1000).toFixed(1)}k</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Item</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Batch</th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase">Quantity</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase">Cost/Unit</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase">Total Value</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {valuationData.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.itemName}</td>
                <td className="px-6 py-4 text-sm font-mono text-gray-600">{item.batchNumber}</td>
                <td className="px-6 py-4 text-center text-sm font-mono">{item.quantity}</td>
                <td className="px-6 py-4 text-right text-sm font-mono">LKR {item.costPerUnit.toFixed(2)}</td>
                <td className="px-6 py-4 text-right text-sm font-semibold text-gray-900">LKR {item.totalCost.toFixed(2)}</td>
              </tr>
            ))}
            <tr className="bg-gray-50 font-semibold">
              <td colSpan="4" className="px-6 py-4 text-right text-sm">Total Valuation:</td>
              <td className="px-6 py-4 text-right text-sm">LKR {totalValue.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockValuationScreen;
