import { RootState } from "@/app/providers/store/store";

export const getApplicationsSelector = (s: RootState) => s.applications;
export const getApplicationByIDSelector =
  (id: string | number) => (state: RootState) =>
    state.applications.applications.find((app) => app.id === id);
