import { useState, type FormEvent } from 'react';
import { Building2 } from 'lucide-react';
import { Modal } from '@/shared/components/ui/Modal';
import { Button } from '@/shared/components/ui/Button';
import { TextField } from '@/shared/components/ui/Field';
import type { Branch } from './types';

interface Props {
  open: boolean;
  onClose: () => void;
  item?: Branch | null;
  submitting?: boolean;
  onSubmit: (values: Partial<Branch>) => void;
}

const empty = (): Partial<Branch> => ({ nama: '', code: '', lokasi: '', longlat: '', kontak: '' });

export const BranchFormModal = ({ open, onClose, item, submitting, onSubmit }: Props) => {
  const [form, setForm] = useState<Partial<Branch>>(item ?? empty());
  const [seedId, setSeedId] = useState<string | undefined>(item?.id);
  if (open && item?.id !== seedId) { setSeedId(item?.id); setForm(item ?? empty()); }
  if (open && !item && seedId !== undefined) { setSeedId(undefined); setForm(empty()); }

  const set = (k: keyof Branch, v: unknown) => setForm((f) => ({ ...f, [k]: v }));
  const submit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({ nama: (form.nama ?? '').trim(), code: (form.code ?? '').trim(), lokasi: form.lokasi, longlat: form.longlat, kontak: form.kontak });
  };

  return (
    <Modal
      open={open} onClose={onClose} icon={<Building2 size={20} />}
      title={item ? 'Edit Cabang' : 'Tambah Cabang'}
      footer={<><Button variant="secondary" onClick={onClose}>Batal</Button><Button type="submit" form="branch-form" disabled={submitting}>{submitting ? 'Menyimpan...' : 'Simpan'}</Button></>}
    >
      <form id="branch-form" onSubmit={submit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TextField label="Nama Cabang" required value={form.nama ?? ''} onChange={(e) => set('nama', e.target.value)} placeholder="Kantor Pusat" />
        <TextField label="Kode" required value={form.code ?? ''} onChange={(e) => set('code', e.target.value)} placeholder="KP-01" />
        <TextField label="Lokasi" wrapClass="sm:col-span-2" value={form.lokasi ?? ''} onChange={(e) => set('lokasi', e.target.value)} placeholder="Jakarta Selatan" />
        <TextField label="Koordinat (long,lat)" value={form.longlat ?? ''} onChange={(e) => set('longlat', e.target.value)} placeholder="-6.2, 106.81" />
        <TextField label="Kontak" value={form.kontak ?? ''} onChange={(e) => set('kontak', e.target.value)} placeholder="021-123456" />
      </form>
    </Modal>
  );
};
