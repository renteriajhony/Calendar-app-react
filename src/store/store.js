import { configureStore } from '@reduxjs/toolkit';
import { uiSlice, calendarSlice, authSlice } from '../store/index';

export const store = configureStore({
  reducer: {
    // Define your reducers here
    auth: authSlice.reducer,
    calendar: calendarSlice.reducer,
    ui: uiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  // Add other middleware, enhancers, and other store settings here
});
