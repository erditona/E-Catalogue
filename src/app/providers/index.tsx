import type { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { store } from '../store';
import { AuthBootstrap } from './AuthBootstrap';
import { GlobalErrorModal } from '@/shared/components/ui/GlobalErrorModal';
import '@/core/api/interceptor';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AuthBootstrap>
          {children}
          <GlobalErrorModal />
        </AuthBootstrap>
      </QueryClientProvider>
    </Provider>
  );
};