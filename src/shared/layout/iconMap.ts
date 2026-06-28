import {
  LayoutDashboard, Car, ShoppingCart, Wrench, BadgeCheck, Users, KeyRound,
  ReceiptText, Wallet, TrendingDown, ArrowLeftRight, BarChart3, Settings,
  Tag, Building2, Database, ShieldCheck, SquareMenu, Folder, UserCog, PiggyBank,
  type LucideIcon,
} from 'lucide-react';

// Pemetaan string/kode/path menu dari backend ke ikon lucide.
const BY_KEY: Record<string, LucideIcon> = {
  // by icon string
  database: Database, folder: Folder, user: Users, users: Users, settings: Settings,
  shield: ShieldCheck, menu: SquareMenu, car: Car, tag: Tag, building: Building2,
  wallet: Wallet, wrench: Wrench, chart: BarChart3,
  // by code
  ROLE: ShieldCheck, MENU: SquareMenu, USER: UserCog, MASTER_DATA: Database,
  DASHBOARD: LayoutDashboard, INVENTORY: Car, PEMBELIAN: ShoppingCart,
  REKONDISI: Wrench, READY_STOCK: BadgeCheck, CRM: Users, TEST_DRIVE: KeyRound,
  PENJUALAN: ReceiptText, PEMBAYARAN: Wallet, PENGELUARAN: TrendingDown,
  CASHFLOW: ArrowLeftRight, LAPORAN: BarChart3, PENGATURAN: Settings,
  MEREK: Tag, VENDOR: Wrench, BRANCH: Building2, INVESTOR: PiggyBank,
};

export const resolveIcon = (opts: { icon?: string | null; code?: string; path?: string | null }): LucideIcon => {
  const { icon, code, path } = opts;
  if (icon && BY_KEY[icon.toLowerCase()]) return BY_KEY[icon.toLowerCase()];
  if (code && BY_KEY[code.toUpperCase()]) return BY_KEY[code.toUpperCase()];
  if (path) {
    if (path.includes('role')) return ShieldCheck;
    if (path.includes('menu')) return SquareMenu;
    if (path.includes('user')) return UserCog;
  }
  return Folder;
};
