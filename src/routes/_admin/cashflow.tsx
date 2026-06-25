import { createFileRoute } from '@tanstack/react-router';
import { CashFlowPage } from '@/features/cashflow/CashFlowPage';

export const Route = createFileRoute('/_admin/cashflow')({
  component: CashFlowPage,
});
