import { createFileRoute } from '@tanstack/react-router';
import { PengeluaranPage } from '@/features/pengeluaran/PengeluaranPage';

export const Route = createFileRoute('/_admin/pengeluaran')({
  component: PengeluaranPage,
});
