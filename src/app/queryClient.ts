import { QueryClient } from '@tanstack/react-query';

// Singleton agar bisa dibersihkan dari luar React (mis. saat sesi berakhir).
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});
