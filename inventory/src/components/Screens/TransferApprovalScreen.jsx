import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { CheckCircle, XCircle, Eye } from 'lucide-react';

const TransferApprovalScreen = () => {
  const { items } = useData();
  const [transfers, setTransfers] = useState([
    {
      id: 'TRF-001',
      sourceWarehouse: 'Main Warehouse',
      destinationWarehouse: 'Branch Store A',
      items: [
        { itemName: 'Laptop', quantity: 5, price: 50000, totalValue: 250000 },
        { itemName: 'Mouse', quantity: 20, price: 2000, totalValue: 40000 }
      ],
      reason: 'Stock Rebalancing',
      notes: 'Urgent supply needed',
      totalItems: 2,
      totalQuantity: 25,
      totalValue: 290000,
      createdDate: '2026-01-14 10:30 AM',
      status: 'Pending',
      createdBy: 'User A'
    }
  ]);
  const [approvalHistory, setApprovalHistory] = useState([]);
  const [selectedTransfer, setSelectedTransfer] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [approvalForm, setApprovalForm] = useState({
    transferId: '',
    approvalStatus: 'Approved',
    comments: '',
    approvedBy: '',
    approvalDate: new Date().toISOString().split('T')[0]
  });

  const pendingTransfers = transfers.filter(t => t.status === 'Pending');

  const handleViewDetails = (transfer) => {
    setSelectedTransfer(transfer);
    setShowDetails(true);
  };

  const handleApproveTransfer = (transferId, approve) => {
    const transfer = transfers.find(t => t.id === transferId);
    if (!transfer) return;

    const approval = {
      id: `APR-${Date.now()}`,
      transferId: transferId,
      sourceWarehouse: transfer.sourceWarehouse,
      destinationWarehouse: transfer.destinationWarehouse,
      totalQuantity: transfer.totalQuantity,
      totalValue: transfer.totalValue,
      reason: transfer.reason,
      status: approve ? 'Approved' : 'Rejected',
      approvedBy: approvalForm.approvedBy || 'Manager',
      comments: approvalForm.comments,
      decisionDate: new Date().toLocaleString(),
      itemsCount: transfer.totalItems
    };

    // Update transfer status
    setTransfers(transfers.map(t => 
      t.id === transferId
        ? { ...t, status: approve ? 'Approved' : 'Rejected' }
        : t
    ));

    // Add to history
    setApprovalHistory([approval, ...approvalHistory]);

    // Reset form
    setApprovalForm({
      transferId: '',
      approvalStatus: 'Approved',
      comments: '',
      approvedBy: '',
      approvalDate: new Date().toISOString().split('T')[0]
    });

    setShowDetails(false);
  };

  const approvedCount = transfers.filter(t => t.status === 'Approved').length;
  const rejectedCount = transfers.filter(t => t.status === 'Rejected').length;
  const totalValue = transfers.filter(t => t.status === 'Approved').reduce((sum, t) => sum + t.totalValue, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <CheckCircle className="w-8 h-8 text-green-600" />
          Transfer Approval
        </h1>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm font-medium text-yellow-600">Pending Transfers</p>
          <p className="text-3xl font-bold text-yellow-700 mt-2">{pendingTransfers.length}</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-sm font-medium text-green-600">Approved</p>
          <p className="text-3xl font-bold text-green-700 mt-2">{approvedCount}</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm font-medium text-red-600">Rejected</p>
          <p className="text-3xl font-bold text-red-700 mt-2">{rejectedCount}</p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm font-medium text-blue-600">Total Approved Value</p>
          <p className="text-2xl font-bold text-blue-700 mt-2">PKR {totalValue.toFixed(0)}</p>
        </div>
      </div>

      {/* Pending Transfers Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900">Pending Transfer Approvals</h3>
        </div>
        {pendingTransfers.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p>No pending transfers for approval</p>
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Action</th>
                </tr>
              </thead>
              <tbody>
                {pendingTransfers.map((transfer) => (
                  <tr key={transfer.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                    <td className="px-6 py-3 text-sm font-medium text-gray-900">{transfer.id}</td>
                    <td className="px-6 py-3 text-sm text-gray-600">
                      {transfer.sourceWarehouse} → {transfer.destinationWarehouse}
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-600">{transfer.totalItems}</td>
                    <td className="px-6 py-3 text-sm text-gray-600">{transfer.totalQuantity} units</td>
                    <td className="px-6 py-3 text-sm font-medium">PKR {transfer.totalValue.toFixed(2)}</td>
                    <td className="px-6 py-3 text-sm text-gray-600">{transfer.reason}</td>
                    <td className="px-6 py-3 text-sm text-gray-600">{transfer.createdDate}</td>
                    <td className="px-6 py-3 text-sm space-x-2">
                      <button
                        onClick={() => handleViewDetails(transfer)}
                        className="inline-flex items-center gap-1 px-3 py-1 text-blue-600 bg-blue-50 rounded hover:bg-blue-100 transition"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Details Modal */}
      {showDetails && selectedTransfer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-50" onClick={() => setShowDetails(false)}></div>
          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-2xl mx-4 z-10 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 sticky top-0 bg-white">
              <h2 className="text-2xl font-bold text-gray-900">Transfer Details - {selectedTransfer.id}</h2>
            </div>

            <div className="p-6 space-y-6">
              {/* Transfer Info */}
              <div className="grid grid-cols-2 gap-4 bg-gray-50 rounded-lg p-4">
                <div>
                  <p className="text-sm text-gray-600">Source Warehouse</p>
                  <p className="font-semibold text-gray-900">{selectedTransfer.sourceWarehouse}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Destination Warehouse</p>
                  <p className="font-semibold text-gray-900">{selectedTransfer.destinationWarehouse}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Reason</p>
                  <p className="font-semibold text-gray-900">{selectedTransfer.reason}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Created Date</p>
                  <p className="font-semibold text-gray-900">{selectedTransfer.createdDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Items</p>
                  <p className="font-semibold text-gray-900">{selectedTransfer.totalItems}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Quantity</p>
                  <p className="font-semibold text-gray-900">{selectedTransfer.totalQuantity} units</p>
                </div>
              </div>

              {/* Notes */}
              {selectedTransfer.notes && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm font-medium text-blue-700 mb-2">Notes</p>
                  <p className="text-gray-700">{selectedTransfer.notes}</p>
                </div>
              )}

              {/* Items Table */}
              <div className="overflow-x-auto">
                <h3 className="font-semibold text-gray-900 mb-3">Transfer Items</h3>
                <table className="w-full">
                  <thead className="bg-gray-100 border border-gray-300">
                    <tr>
                      <th className="px-4 py-2 text-left text-gray-700">Item</th>
                      <th className="px-4 py-2 text-left text-gray-700">Quantity</th>
                      <th className="px-4 py-2 text-left text-gray-700">Price</th>
                      <th className="px-4 py-2 text-left text-gray-700">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedTransfer.items.map((item, idx) => (
                      <tr key={idx} className="border border-gray-300">
                        <td className="px-4 py-2">{item.itemName}</td>
                        <td className="px-4 py-2">{item.quantity}</td>
                        <td className="px-4 py-2">PKR {item.price.toFixed(2)}</td>
                        <td className="px-4 py-2 font-semibold">PKR {item.totalValue.toFixed(2)}</td>
                      </tr>
                    ))}
                    <tr className="bg-purple-100 font-bold border border-gray-300">
                      <td colSpan="3" className="px-4 py-2">Total Value</td>
                      <td className="px-4 py-2">PKR {selectedTransfer.totalValue.toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Approval Form */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 space-y-4">
                <h3 className="font-semibold text-gray-900">Approval Decision</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Approved By
                  </label>
                  <input
                    type="text"
                    value={approvalForm.approvedBy}
                    onChange={(e) => setApprovalForm({
                      ...approvalForm,
                      approvedBy: e.target.value
                    })}
                    placeholder="Manager name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Comments
                  </label>
                  <textarea
                    value={approvalForm.comments}
                    onChange={(e) => setApprovalForm({
                      ...approvalForm,
                      comments: e.target.value
                    })}
                    placeholder="Add comments..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    rows="3"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => handleApproveTransfer(selectedTransfer.id, true)}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Approve Transfer
                  </button>
                  <button
                    onClick={() => handleApproveTransfer(selectedTransfer.id, false)}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
                  >
                    <XCircle className="w-5 h-5" />
                    Reject Transfer
                  </button>
                  <button
                    onClick={() => setShowDetails(false)}
                    className="ml-auto px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition font-medium"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Approval History */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900">Approval History</h3>
        </div>
        {approvalHistory.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p>No approvals yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Transfer ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Route</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Quantity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Value</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Approved By</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Date</th>
                </tr>
              </thead>
              <tbody>
                {approvalHistory.map((approval) => (
                  <tr key={approval.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                    <td className="px-6 py-3 text-sm font-medium text-gray-900">{approval.id}</td>
                    <td className="px-6 py-3 text-sm text-gray-600">{approval.transferId}</td>
                    <td className="px-6 py-3 text-sm text-gray-600">
                      {approval.sourceWarehouse} → {approval.destinationWarehouse}
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-600">{approval.totalQuantity}</td>
                    <td className="px-6 py-3 text-sm font-medium">PKR {approval.totalValue.toFixed(2)}</td>
                    <td className="px-6 py-3">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${
                        approval.status === 'Approved'
                          ? 'bg-green-100 text-green-800 border-green-300'
                          : 'bg-red-100 text-red-800 border-red-300'
                      }`}>
                        {approval.status}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-600">{approval.approvedBy}</td>
                    <td className="px-6 py-3 text-sm text-gray-600">{approval.decisionDate}</td>
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

export default TransferApprovalScreen;
