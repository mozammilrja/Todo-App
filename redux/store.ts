import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { 
  persistStore, 
  persistReducer, 
  FLUSH, 
  REHYDRATE, 
  PAUSE, 
  PERSIST, 
  PURGE, 
  REGISTER 
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import listsSlice from '@/features/lists/listsSlice';
import tasksSlice from '@/features/tasks/tasksSlice';
import appSlice from '@/features/app/appSlice';

// Combine reducers
const rootReducer = combineReducers({
  lists: listsSlice,
  tasks: tasksSlice,
  app: appSlice,
});

// Persist configuration
const persistConfig = {
  key: 'todo-app-root',
  version: 1,
  storage,
  whitelist: ['lists', 'tasks'], // Only persist lists and tasks, not app state
  blacklist: ['app'], // Don't persist app state (search, sidebar)
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store with Redux Toolkit
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        ignoredActionsPaths: ['meta.arg', 'payload.timestamp'],
        ignoredPaths: ['items.dates'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

// Create persistor
export const persistor = persistStore(store);

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Export store actions for debugging
export const storeActions = {
  purge: () => persistor.purge(),
  flush: () => persistor.flush(),
  pause: () => persistor.pause(),
  persist: () => persistor.persist(),
};