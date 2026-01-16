export const getStatusColor = (status) => {
  switch(status) {
    case 'In Stock': return 'bg-green-100 text-green-700';
    case 'Low Stock': return 'bg-orange-100 text-orange-700';
    case 'Out of Stock': return 'bg-red-100 text-red-700';
    case 'Pending': return 'bg-yellow-100 text-yellow-700';
    case 'Approved': return 'bg-blue-100 text-blue-700';
    case 'Completed': return 'bg-green-100 text-green-700';
    case 'Safe': return 'bg-green-100 text-green-700';
    case 'Near Expiry': return 'bg-yellow-100 text-yellow-700';
    case 'Expired': return 'bg-red-100 text-red-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

export const exportToCSV = (filename, csvContent) => {
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
};

export const getAlertColor = (alert) => {
  switch(alert) {
    case 'Expired': return 'bg-red-100 text-red-700 border-red-300';
    case 'Near Expiry': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
    case 'Safe': return 'bg-green-100 text-green-700 border-green-300';
    default: return 'bg-gray-100 text-gray-700 border-gray-300';
  }
};

export const getBatchAlert = (expiryDate, today = new Date('2026-01-11')) => {
  const expiry = new Date(expiryDate);
  const thirtyDaysLater = new Date(today.getTime() + 30*24*60*60*1000);
  
  if (expiry < today) return 'Expired';
  if (expiry < thirtyDaysLater) return 'Near Expiry';
  return 'Safe';
};

export const getAgingBucket = (purchaseDate, today = new Date('2026-01-11')) => {
  const daysInStock = Math.floor((today - new Date(purchaseDate)) / (1000 * 60 * 60 * 24));
  if (daysInStock <= 30) return '0-30 days';
  if (daysInStock <= 60) return '31-60 days';
  if (daysInStock <= 90) return '61-90 days';
  return '90+ days';
};

export const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-LK', {
    style: 'currency',
    currency: 'LKR',
  }).format(value);
};

export const getDaysInStock = (purchaseDate, today = new Date('2026-01-11')) => {
  return Math.floor((today - new Date(purchaseDate)) / (1000 * 60 * 60 * 24));
};
