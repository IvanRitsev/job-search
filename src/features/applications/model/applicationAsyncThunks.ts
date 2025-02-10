import { createAsyncThunk } from "@reduxjs/toolkit";
import { Application } from "@/entities/application/model/types";
import { v4 as uuidv4 } from "uuid";
import { loadFromLocalStorage, STORAGE_KEY } from "./applicationSlice";
import mockApplications from "../api/mockData";

// Асинхронное получение заявок
export const fetchApplications = createAsyncThunk<Application[]>(
  "applications/fetchApplications",
  async () => {
    const storedApplications = loadFromLocalStorage();
    return storedApplications.length ? storedApplications : mockApplications;
  }
);

// Асинхронное создание заявки
export const createApplication = createAsyncThunk<
  Application,
  Omit<Application, "id">
>("applications/createApplication", async (newApplication) => {
  const createdApplication = {
    ...newApplication,
    id: uuidv4(),
  };
  return createdApplication;
});

// Асинхронное редактирование заявки
export const updateApplication = createAsyncThunk<Application, Application>(
  "applications/updateApplication",
  async (updatedApplication) => {
    const index = mockApplications.findIndex(
      (app) => app.id === updatedApplication.id
    );
    if (index !== -1) mockApplications[index] = updatedApplication;

    const storedApplications = loadFromLocalStorage();
    const updatedApplications = storedApplications.map((app) =>
      app.id === updatedApplication.id ? updatedApplication : app
    );

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedApplications));

    return updatedApplication;
  }
);
