import {
  LayoutDashboard,
  Car,
  ShoppingCart,
  Wrench,
  BadgeCheck,
  Users,
  KeyRound,
  ReceiptText,
  Wallet,
  TrendingDown,
  ArrowLeftRight,
  BarChart3,
  Settings,
  Tag,
  Building2,
  Landmark,
  Megaphone,
  ClipboardCheck,
  Tags,
  CreditCard,
  FileText,
  Package,
  type LucideIcon,
} from 'lucide-react';

export interface MenuItem {
  path: string;
  label: string;
  icon: LucideIcon;
  group: 'main' | 'operasional' | 'master' | 'lainnya';
}

export const MENU_ITEMS: MenuItem[] = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, group: 'main' },
  { path: '/inventory', label: 'Inventory / Stok', icon: Car, group: 'operasional' },
  { path: '/pembelian', label: 'Pembelian Unit', icon: ShoppingCart, group: 'operasional' },
  { path: '/rekondisi', label: 'Rekondisi', icon: Wrench, group: 'operasional' },
  { path: '/ready-stock', label: 'Ready Stock', icon: BadgeCheck, group: 'operasional' },
  { path: '/crm', label: 'CRM / Lead', icon: Users, group: 'operasional' },
  { path: '/test-drive', label: 'Test Drive', icon: KeyRound, group: 'operasional' },
  { path: '/penjualan', label: 'Penjualan', icon: ReceiptText, group: 'operasional' },
  { path: '/pembayaran', label: 'Pembayaran', icon: Wallet, group: 'operasional' },
  { path: '/pengeluaran', label: 'Pengeluaran', icon: TrendingDown, group: 'operasional' },
  { path: '/merek', label: 'Merek & Tipe', icon: Tag, group: 'master' },
  { path: '/vendor', label: 'Vendor', icon: Wrench, group: 'master' },
  { path: '/branch', label: 'Cabang', icon: Building2, group: 'master' },
  { path: '/master/leasing', label: 'Leasing', icon: Landmark, group: 'master' },
  { path: '/master/sumber-lead', label: 'Sumber Lead', icon: Megaphone, group: 'master' },
  { path: '/master/pengecekan', label: 'Pengecekan', icon: ClipboardCheck, group: 'master' },
  { path: '/master/kategori-pengeluaran', label: 'Kategori Pengeluaran', icon: Tags, group: 'master' },
  { path: '/master/metode-pembayaran', label: 'Metode Pembayaran', icon: CreditCard, group: 'master' },
  { path: '/master/dokumen', label: 'Dokumen', icon: FileText, group: 'master' },
  { path: '/master/perlengkapan', label: 'Perlengkapan', icon: Package, group: 'master' },
  { path: '/cashflow', label: 'Cash Flow', icon: ArrowLeftRight, group: 'lainnya' },
  { path: '/laporan', label: 'Laporan', icon: BarChart3, group: 'lainnya' },
  { path: '/pengaturan', label: 'Pengaturan', icon: Settings, group: 'lainnya' },
];
