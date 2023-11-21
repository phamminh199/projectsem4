import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import jobReducer from '../features/jobSlice';

export const store = configureStore({
  reducer: {
    reduxJob: jobReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;