import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Application } from "../../../entities/application/model/types";
import mockApplications from "@/features/applications/api/mockData";
import {
  createApplication,
  fetchApplications,
  updateApplication,
} from "./applicationAsyncThunks";

export const STORAGE_KEY = "applications";

export const loadFromLocalStorage = (): Application[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

type InitialState = {
  applications: Application[];
  loading: boolean;
};

const initialState: InitialState = {
  applications: loadFromLocalStorage().length
    ? loadFromLocalStorage()
    : mockApplications,
  loading: false,
};

const applicationSlice = createSlice({
  name: "applications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchApplications.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchApplications.fulfilled,
      (state, action: PayloadAction<Application[]>) => {
        state.loading = false;
        state.applications = action.payload;
      }
    );
    builder.addCase(fetchApplications.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(createApplication.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      createApplication.fulfilled,
      (state, action: PayloadAction<Application>) => {
        state.loading = false;
        state.applications.push(action.payload);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.applications));
      }
    );
    builder.addCase(createApplication.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(updateApplication.fulfilled, (state, action) => {
      state.loading = false;

      const index = state.applications.findIndex(
        (app) => app.id === action.payload.id
      );
      if (index !== -1) state.applications[index] = action.payload;

      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.applications));
    });
  },
});

export default applicationSlice.reducer;
