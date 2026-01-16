import React, { useState } from 'react';
import { FileText } from 'lucide-react';
import { useInventory } from '../../context/InventoryContext';
import { useData } from '../../context/DataContext';
import { getStatusColor } from '../../utils/helpers';

const ItemDetailScreen = () => {
  const { selectedItemId, setSelectedItemId, setActiveScreen, selectedItemTab, setSelectedItemTab } = useInventory();
  const { items, batches, itemDetails } = useData();

  const itemId = selectedItemId || items[0]?.id;
  const item = items.find(i => i.id === itemId);
  const detail = itemDetails[itemId];
  
  if (!item || !detail) {
    return (
      <div className="p-6">
        <p className="text-gray-900 font-semibold mb-4">Item not found or no item selected</p>
        <button onClick={() => { setSelectedItemId(null); setActiveScreen('item-list'); }} className="text-blue-600 hover:text-blue-700">
          ← Back to List
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button onClick={() => { setSelectedItemId(null); setActiveScreen('item-list'); }} className="text-blue-600 hover:text-blue-700 flex items-center gap-1">
          ← Back to List
        </button>
        <h2 className="text-2xl font-bold text-gray-900">{item.name}</h2>
        <div></div>
      </div>

      <div className="grid grid-cols-5 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-600 font-semibold">SKU</p>
          <p className="text-lg font-bold text-blue-700 mt-1">{detail.sku}</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-sm text-green-600 font-semibold">Current Stock</p>
          <p className="text-lg font-bold text-green-700 mt-1">{item.stock}</p>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <p className="text-sm text-purple-600 font-semibold">Current Price</p>
          <p className="text-lg font-bold text-purple-700 mt-1">LKR {item.price.toFixed(2)}</p>
        </div>
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <p className="text-sm text-orange-600 font-semibold">Reorder Level</p>
          <p className="text-lg font-bold text-orange-700 mt-1">{detail.reorderLevel}</p>
        </div>
        <div className={`${item.stock <= detail.reorderLevel ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-200'} border rounded-lg p-4`}>
          <p className={`text-sm ${item.stock <= detail.reorderLevel ? 'text-red-600' : 'text-gray-600'} font-semibold`}>Status</p>
          <p className={`text-lg font-bold mt-1 ${item.stock <= detail.reorderLevel ? 'text-red-700' : 'text-gray-700'}`}>{item.stock <= detail.reorderLevel ? 'Reorder Now' : 'In Stock'}</p>
        </div>
      </div>

      <div className="flex gap-2 border-b border-gray-200">
        {['summary', 'prices', 'stock-history', 'batches', 'suppliers', 'sales', 'reorder'].map((tab) => (
          <button key={tab} onClick={() => setSelectedItemTab(tab)} className={`px-4 py-3 font-medium border-b-2 ${selectedItemTab === tab ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600 hover:text-gray-900'}`}>
            {tab === 'summary' && 'Summary'}
            {tab === 'prices' && 'Prices'}
            {tab === 'stock-history' && 'Stock History'}
            {tab === 'batches' && 'Batch & Expiry'}
            {tab === 'suppliers' && 'Suppliers'}
            {tab === 'sales' && 'Sales'}
            {tab === 'reorder' && 'Reorder Alerts'}
          </button>
        ))}
      </div>

      {selectedItemTab === 'summary' && (
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Item Information</h3>
            <div className="space-y-3">
              <div><label className="text-sm text-gray-600">Item Code:</label><p className="font-mono">{item.id}</p></div>
              <div><label className="text-sm text-gray-600">Barcode:</label><p className="font-mono">{detail.barcode}</p></div>
              <div><label className="text-sm text-gray-600">SKU:</label><p className="font-mono">{detail.sku}</p></div>
              <div><label className="text-sm text-gray-600">Category:</label><p>{item.category}</p></div>
              <div><label className="text-sm text-gray-600">Brand:</label><p>{item.brand}</p></div>
              <div><label className="text-sm text-gray-600">Supplier:</label><p>{item.supplier}</p></div>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Stock Details</h3>
            <div className="space-y-3">
              <div><label className="text-sm text-gray-600">Current Stock:</label><p className="text-lg font-bold">{item.stock} units</p></div>
              <div><label className="text-sm text-gray-600">Warehouse:</label><p>{item.warehouse}</p></div>
              <div><label className="text-sm text-gray-600">Expiry Date:</label><p>{item.expiryDate}</p></div>
              <div><label className="text-sm text-gray-600">Status:</label><p><span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(item.status)}`}>{item.status}</span></p></div>
              <div><label className="text-sm text-gray-600">Reorder Level:</label><p>{detail.reorderLevel} units</p></div>
              <div><label className="text-sm text-gray-600">Reorder Quantity:</label><p>{detail.reorderQuantity} units</p></div>
            </div>
          </div>
        </div>
      )}

      {selectedItemTab === 'prices' && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Date</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase">Price</th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase">Change</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Reason</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {detail.priceHistory.map((entry, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{entry.date}</td>
                  <td className="px-6 py-4 text-sm font-mono text-right">LKR {entry.price.toFixed(2)}</td>
                  <td className="px-6 py-4 text-sm text-center"><span className={`px-2 py-1 rounded text-xs font-medium ${entry.change.includes('+') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>{entry.change}</span></td>
                  <td className="px-6 py-4 text-sm text-gray-600">{entry.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedItemTab === 'stock-history' && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Reference</th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {detail.stockHistory.map((entry, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{entry.date}</td>
                  <td className="px-6 py-4 text-sm"><span className={`px-2 py-1 text-xs font-medium rounded-full ${entry.type === 'GRN' ? 'bg-green-100 text-green-700' : entry.type === 'Sales' ? 'bg-blue-100 text-blue-700' : entry.type === 'Adjustment' ? 'bg-orange-100 text-orange-700' : 'bg-purple-100 text-purple-700'}`}>{entry.type}</span></td>
                  <td className="px-6 py-4 text-sm font-mono">{entry.reference}</td>
                  <td className="px-6 py-4 text-center text-sm font-mono"><span className={entry.quantity > 0 ? 'text-green-600' : 'text-red-600'}>{entry.quantity > 0 ? '+' : ''}{entry.quantity}</span></td>
                  <td className="px-6 py-4 text-sm text-gray-600">{entry.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedItemTab === 'batches' && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Batch Number</th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Purchase Date</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Expiry Date</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Warehouse</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {batches.filter(b => b.itemId === selectedItemId).map((batch) => (
                <tr key={batch.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-mono">{batch.batchNumber}</td>
                  <td className="px-6 py-4 text-center text-sm">{batch.quantity}</td>
                  <td className="px-6 py-4 text-sm">{batch.purchaseDate}</td>
                  <td className="px-6 py-4 text-sm">{batch.expiryDate}</td>
                  <td className="px-6 py-4 text-sm">{batch.warehouse}</td>
                  <td className="px-6 py-4 text-sm"><span className={`px-2 py-1 text-xs font-medium rounded-full ${batch.status === 'Safe' ? 'bg-green-100 text-green-700' : batch.status === 'Near Expiry' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>{batch.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedItemTab === 'suppliers' && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Supplier</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Last PO</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Last Delivery</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Lead Time</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase">Price</th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase">Reliability</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {detail.supplierHistory.map((supplier, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium">{supplier.supplier}</td>
                  <td className="px-6 py-4 text-sm font-mono">{supplier.lastPO}</td>
                  <td className="px-6 py-4 text-sm">{supplier.lastDelivery}</td>
                  <td className="px-6 py-4 text-sm">{supplier.leadTime}</td>
                  <td className="px-6 py-4 text-sm font-mono text-right">LKR {supplier.price.toFixed(2)}</td>
                  <td className="px-6 py-4 text-center text-sm"><span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">{supplier.reliability}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedItemTab === 'sales' && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Date</th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase">Quantity Sold</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase">Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {detail.salesData.map((sale, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm">{sale.date}</td>
                  <td className="px-6 py-4 text-center text-sm font-mono">{sale.quantity}</td>
                  <td className="px-6 py-4 text-right text-sm font-mono text-green-600">LKR {sale.revenue.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedItemTab === 'reorder' && (
        <div className="space-y-4">
          <div className={`${item.stock <= detail.reorderLevel ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'} border rounded-lg p-6`}>
            <p className={`text-sm ${item.stock <= detail.reorderLevel ? 'text-red-600' : 'text-green-600'} font-semibold`}>{item.stock <= detail.reorderLevel ? 'REORDER REQUIRED' : 'IN STOCK'}</p>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div>
                <p className="text-sm text-gray-600">Current Stock</p>
                <p className="text-2xl font-bold mt-1">{item.stock}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Reorder Level</p>
                <p className="text-2xl font-bold mt-1">{detail.reorderLevel}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Reorder Quantity</p>
                <p className="text-2xl font-bold mt-1">{detail.reorderQuantity}</p>
              </div>
            </div>
            {item.stock <= detail.reorderLevel && (
              <button onClick={() => alert('Creating purchase order for ' + item.name)} className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Create Purchase Order</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemDetailScreen;
