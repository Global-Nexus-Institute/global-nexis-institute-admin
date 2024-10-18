// store.ts
import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import authReducer from "../features/slices/auth.slice"; // Root reducer combining all your slices
import coursesReducer from "../features/slices/courses/courses.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    courses: coursesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }), // thunk is automatically included, but this shows how to add custom middleware
});

export const makeStore = () => store;

// Define types for RootState and AppDispatch
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
