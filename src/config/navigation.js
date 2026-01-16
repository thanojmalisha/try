import { Package, Tag, Box, ArrowRightLeft, FileText, Printer, Archive, BarChart3, Calendar, AlertTriangle, RefreshCw, CheckCircle, TrendingUp, Clock } from 'lucide-react';

export const navigationConfig = [
  {
    id: 'item-management',
    label: 'Item Management',
    icon: Package,
    screens: [
      { id: 'item-list', label: 'Item List', icon: Package },
      { id: 'item-detail', label: 'Item Detail', icon: FileText },
      { id: 'barcode-print', label: 'Barcode Print', icon: Printer },
    ]
  },
  {
    id: 'category-master',
    label: 'Category & Master',
    icon: Tag,
    screens: [
      { id: 'category-mgmt', label: 'Category Management', icon: Tag },
      { id: 'brand-mgmt', label: 'Brand Management', icon: Archive },
      { id: 'supplier-mgmt', label: 'Supplier Management', icon: Archive },
    ]
  },
  {
    id: 'stock-ops',
    label: 'Stock Operations',
    icon: Box,
    screens: [
      { id: 'stock-overview', label: 'Stock Overview', icon: BarChart3 },
      { id: 'batch-stock', label: 'Batch-wise Stock', icon: Package },
      { id: 'expiry-calendar', label: 'Expiry Calendar', icon: Calendar },
      { id: 'stock-adjustment', label: 'Stock Adjustment', icon: RefreshCw },
      { id: 'damage-entry', label: 'Damage Entry', icon: AlertTriangle },
    ]
  },
  {
    id: 'transfers',
    label: 'Transfers & Valuation',
    icon: ArrowRightLeft,
    screens: [
      { id: 'transfer-create', label: 'Create Transfer', icon: ArrowRightLeft },
      { id: 'approve-transfer', label: 'Transfer Approval', icon: CheckCircle },
      { id: 'stock-valuation', label: 'Stock Valuation', icon: TrendingUp },
      { id: 'stock-aging', label: 'Stock Aging Report', icon: Clock },
    ]
  },
];
