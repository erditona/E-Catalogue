import { WifiOff, TimerOff, ServerCrash, ServerCog, FileWarning, ShieldAlert, AlertTriangle } from 'lucide-react';
import { Modal } from './Modal';
import { Button } from './Button';
import { useAppSelector, useAppDispatch } from '@/app/store';
import { hideToast, type GlobalErrorType } from '@/app/store/uiSlice';

const ICONS: Record<GlobalErrorType, typeof WifiOff> = {
  network: WifiOff,
  timeout: TimerOff,
  server: ServerCrash,
  maintenance: ServerCog,
  parsing: FileWarning,
  auth: ShieldAlert,
  general: AlertTriangle,
};

/** Modal error global "satu pintu" — didorong oleh interceptor lewat uiSlice. */
export const GlobalErrorModal = () => {
  const { isOpen, title, message, type } = useAppSelector((s) => s.ui.toast);
  const dispatch = useAppDispatch();
  const close = () => dispatch(hideToast());

  const Icon = ICONS[type] ?? AlertTriangle;
  const danger = type === 'network' || type === 'timeout' || type === 'server';

  return (
    <Modal open={isOpen} onClose={close} size="sm">
      <div className="text-center py-2">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 ${danger ? 'bg-semantic-error/10 text-semantic-error' : 'bg-accent-amber/10 text-accent-amber'}`}>
          <Icon size={28} strokeWidth={2.2} />
        </div>
        <h3 className="text-lg font-extrabold text-ink">{title}</h3>
        <p className="text-[13px] text-muted font-medium mt-1.5 leading-relaxed">{message}</p>
        <Button block onClick={close} className="mt-6">Tutup</Button>
      </div>
    </Modal>
  );
};
