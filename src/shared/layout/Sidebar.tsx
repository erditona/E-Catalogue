import { Link, useLocation } from '@tanstack/react-router';
import { ChevronLeft, ChevronRight, Car, type LucideIcon } from 'lucide-react';
import { MENU_ITEMS, PATH_BY_CODE, VALID_PATHS } from './menu';
import { Logo } from './Logo';
import { QuickInput } from './QuickInput';
import { Tooltip } from '@/shared/components/ui/Tooltip';
import { resolveIcon } from './iconMap';
import { useAppSelector } from '@/app/store';

interface SidebarProps {
  isMobileOpen: boolean;
  isDesktopOpen: boolean;
  onCloseMobile: () => void;
  onToggleDesktop: () => void;
}

interface NavItem {
  path: string;
  label: string;
  Icon: LucideIcon;
}
interface NavGroup {
  key: string;
  label: string;
  items: NavItem[];
}

const STATIC_GROUP_LABELS: Record<string, string> = {
  main: 'Menu Utama',
  operasional: 'Operasional',
  master: 'Master Data',
  akses: 'Akses Kontrol',
  lainnya: 'Lainnya',
};

const STATIC_GROUP_ORDER = ['main', 'operasional', 'master', 'akses', 'lainnya'] as const;

const buildStaticGroups = (): NavGroup[] =>
  STATIC_GROUP_ORDER.map((key) => ({
    key,
    label: STATIC_GROUP_LABELS[key],
    items: MENU_ITEMS.filter((m) => m.group === key).map((m) => ({ path: m.path, label: m.label, Icon: m.icon })),
  })).filter((g) => g.items.length > 0);

// Petakan path/kode menu backend ke route frontend nyata; null jika tak ada route-nya (hindari 404).
const resolveFrontendPath = (m: { path?: string | null; code?: string }): string | null => {
  if (m.code && PATH_BY_CODE[m.code]) return PATH_BY_CODE[m.code];
  if (m.path && VALID_PATHS.has(m.path)) return m.path;
  return null;
};

export const Sidebar = ({ isMobileOpen, isDesktopOpen, onCloseMobile, onToggleDesktop }: SidebarProps) => {
  const location = useLocation();
  const isExpanded = isDesktopOpen || isMobileOpen;
  const groupMenus = useAppSelector((s) => s.auth.groupMenus);

  // Menu dinamis dari hak akses (groupMenus dari /auth/me) — path di-resolve ke route nyata
  // agar tidak 404. Fallback ke menu statis bila kosong / tak ada yang ter-resolve.
  let navGroups: NavGroup[] = [];
  if (groupMenus && groupMenus.length > 0) {
    navGroups = [...groupMenus]
      .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
      .map((g) => ({
        key: g.id,
        label: g.name,
        items: [...(g.menus ?? [])]
          .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
          .map((m) => {
            const path = resolveFrontendPath(m);
            return path ? { path, label: m.name, Icon: resolveIcon({ icon: m.icon, code: m.code, path: m.path }) } : null;
          })
          .filter((it): it is NavItem => it !== null),
      }))
      .filter((g) => g.items.length > 0);
  }

  // Bila tak ada menu backend yang ter-resolve, pakai menu statis penuh.
  if (navGroups.length === 0) navGroups = buildStaticGroups();

  return (
    <>
      {isMobileOpen && (
        <div className="fixed inset-0 bg-ink/50 z-40 lg:hidden backdrop-blur-sm" onClick={onCloseMobile} />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-[60] lg:relative bg-surface flex flex-col border-r border-border shadow-2xl lg:shadow-none transition-all duration-300 ease-in-out shrink-0
          ${isMobileOpen ? 'translate-x-0 w-[280px]' : '-translate-x-full lg:translate-x-0'}
          ${isDesktopOpen ? 'lg:w-[264px]' : 'lg:w-[84px]'}`}
      >
        <button
          onClick={onToggleDesktop}
          className="hidden lg:flex absolute -right-3 top-[26px] z-20 w-6 h-6 rounded-full bg-surface border border-border shadow-card text-muted hover:text-primary hover:border-primary items-center justify-center transition-colors"
          title={isDesktopOpen ? 'Tutup menu' : 'Buka menu'}
        >
          {isDesktopOpen ? <ChevronLeft size={14} strokeWidth={2.6} /> : <ChevronRight size={14} strokeWidth={2.6} />}
        </button>

        <div className={`flex items-center h-[76px] shrink-0 border-b border-divider ${isExpanded ? 'px-5' : 'justify-center px-2'}`}>
          {isExpanded ? <Logo /> : <Logo compact />}
        </div>

        <nav className="flex-1 overflow-y-auto no-scrollbar px-3 py-4 space-y-5">
          {navGroups.map((group) => (
            <div key={group.key}>
              {isExpanded && (
                <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-muted/70">{group.label}</p>
              )}
              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.Icon;
                  const isActive = location.pathname.startsWith(item.path);
                  return (
                    <Tooltip key={item.path} label={item.label} enabled={!isExpanded}>
                      <Link
                        to={item.path}
                        onClick={onCloseMobile}
                        className={`flex items-center rounded-xl font-semibold transition-all
                          ${isActive ? 'bg-primary text-white shadow-glow' : 'text-ink-soft hover:bg-surface-soft hover:text-primary'}
                          ${isExpanded ? 'h-11 px-3 gap-3' : 'h-11 justify-center'}`}
                      >
                        <Icon size={20} strokeWidth={isActive ? 2.4 : 2} className="shrink-0" />
                        {isExpanded && <span className="text-[13px] tracking-tight whitespace-nowrap">{item.label}</span>}
                      </Link>
                    </Tooltip>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-3 border-t border-divider space-y-3 shrink-0">
          {isExpanded && (
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary-dark p-4 text-white">
              <Car size={64} className="absolute -right-3 -bottom-3 text-white/15" strokeWidth={1.5} />
              <p className="text-[11px] font-bold uppercase tracking-widest text-white/80">GM Mobilindo</p>
              <p className="text-sm font-extrabold leading-tight mt-1">#PilihanTerbaik<br />Untuk Mobil Impian Anda</p>
            </div>
          )}
          <QuickInput expanded={isExpanded} />
        </div>
      </aside>
    </>
  );
};
