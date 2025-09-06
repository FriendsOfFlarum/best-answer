const app = {
  load: () => {},
  translator: {
    addTranslations: (_: any) => {},
    trans: (key: string) => key,
  },
  bootExtensions: (_: any) => {},
  boot: () => {},
  forum: { attribute: (_k?: string) => undefined },
  route: {
    user: (_u: any) => '#',
    discussion: (_d: any) => '#',
  },
  current: {
    matches: (_c: any) => false,
    get: (_k: string) => ({ update: () => {}, goToNumber: (_n: number) => {} }),
  },
  session: { user: null },
  notificationComponents: {} as Record<string, any>,
};

export default app;
