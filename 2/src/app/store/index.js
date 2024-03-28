import { configureStore } from '@reduxjs/toolkit';
import { appsReducer } from './slices/apps.slice.js';

export const store = configureStore({
  reducer: {
    apps: appsReducer,
  },
});
