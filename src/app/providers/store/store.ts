import { configureStore } from "@reduxjs/toolkit";
import applicationSlice from "@/features/applications/model/applicationSlice";

export const store = configureStore({
  reducer: {
    applications: applicationSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
