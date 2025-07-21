// utils/persistConfig.ts
import storage from 'redux-persist/lib/storage';

const isServer = typeof window === 'undefined';

export const persistConfig = {
  key: 'todo-app-root',
  version: 1,
  storage: isServer ? undefined : storage,
  whitelist: ['lists', 'tasks'],
};
