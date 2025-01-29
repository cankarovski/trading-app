import { persistor, store } from ".";

export const resetAppState = () => {
  return new Promise<void>(async (resolve) => {
    await persistor.purge();
    store.dispatch({ type: "RESET_APP" });
    resolve();
  });
};
