const routeFn: any = (name: string, _params?: any) => '#';
routeFn.user = (_u: any) => '#';
routeFn.discussion = (_d: any, _n?: any) => '#';

const app = {
  translator: { trans: (key: string) => `translated:${key}` },
  route: routeFn as any,
  current: { matches: () => false, get: () => ({ update: () => {}, goToNumber: () => {} }) },
  forum: { attribute: (_: string) => undefined },
  notificationComponents: {} as Record<string, any>,
  session: { user: null as unknown },
  store: { find: async () => [] as any[] },
  discussions: {
    refresh: () => {},
    bestAnswer: undefined as string | undefined,
  },
};

export default app;
