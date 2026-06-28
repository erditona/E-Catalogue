import { createRouter } from '@tanstack/react-router';
import { routeTree } from '../../routeTree.gen';
import { NotFound } from '@/shared/components/NotFound';

// Instance router. Login di-skip sementara, jadi tidak ada context auth.
export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  defaultNotFoundComponent: NotFound,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
