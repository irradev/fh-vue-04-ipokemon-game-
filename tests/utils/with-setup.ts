import { createApp } from 'vue';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const withSetup = (composable: () => any) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let result: any;

  const app = createApp({
    setup() {
      result = composable();

      return () => {};
    },
  });

  app.mount(document.createElement('div'));

  return [result, app] as const;
};
