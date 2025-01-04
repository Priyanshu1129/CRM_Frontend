import { createSlice } from "@reduxjs/toolkit";

const initialClientState = {
  getClient: {
    status: "idle",
    error: null,
    data: null,
  },
  getAllClients: {
    status: "idle",
    error: null,
    data: null,
  },
  createClient: {
    status: "idle",
    error: null,
    data: null,
  },
  updateClient: {
    status: "idle",
    error: null,
    data: null,
  },
  deleteClient: {
    status: "idle",
    error: null,
    data: null,
  },
};

const clientSlice = createSlice({
  name: "client",
  initialState: initialClientState,
  reducers: {
    getClientRequest: (state, action) => {
      state.getClient.status = "pending";
    },
    getClientSuccess: (state, action) => {
      state.getClient.status = "success";
      state.getClient.data = action.payload;
    },
    getClientFailure: (state, action) => {
      state.getClient.status = "failed";
      state.getClient.error = action.payload;
    },
    getAllClientsRequest: (state, action) => {
      state.getAllClients.status = "pending";
    },
    getAllClientsSuccess: (state, action) => {
      state.getAllClients.status = "success";
      state.getAllClients.data = action.payload;
    },
    getAllClientsFailure: (state, action) => {
      state.getAllClients.status = "failed";
      state.getAllClients.error = action.payload;
    },
    createClientRequest: (state, action) => {
      state.createClient.status = "pending";
    },
    createClientSuccess: (state, action) => {
      state.createClient.status = "success";
      state.createClient.data = action.payload;
    },
    createClientFailure: (state, action) => {
      state.createClient.status = "failed";
      state.createClient.data = null;
      state.createClient.error = action.payload;
    },
    updateClientRequest: (state, action) => {
      state.updateClient.status = "pending";
    },
    updateClientSuccess: (state, action) => {
      state.updateClient.status = "success";
      state.updateClient.data = action.payload;
    },
    updateClientFailure: (state, action) => {
      state.updateClient.status = "failed";
      state.updateClient.error = action.payload;
    },
    deleteClientRequest: (state) => {
      state.deleteClient.status = "pending";
    },
    deleteClientSuccess: (state, action) => {
      state.deleteClient.status = "success";
      state.deleteClient.data = action.payload;
    },
    deleteClientFailure: (state, action) => {
      state.deleteClient.status = "failed";
      state.deleteClient.error = action.payload;
    },
    clearGetClientStatus: (state) => {
      state.getClient.status = "idle";
    },
    clearGetClientData: () => {
      state.getClient.data = null;
    },
    clearGetClientError: (state) => {
      state.getClient.error = null;
    },
    clearGetAllClientsStatus: (state) => {
      state.getAllClients.status = "idle";
    },
    clearGetAllClientsData: () => {
      state.getAllClients.data = null;
    },
    clearGetAllClientsError: (state) => {
      state.getAllClients.error = null;
    },
    clearCreateClientStatus: (state) => {
      state.createClient.status = "idle";
    },
    clearCreateClientData: () => {
      state.createClient.data = null;
    },
    clearCreateClientError: (state) => {
      state.createClient.error = null;
    },
    clearUpdateClientStatus: (state) => {
      state.updateClient.status = "idle";
    },
    clearUpdateClientData: () => {
      state.updateClient.data = null;
    },
    clearUpdateClientError: (state) => {
      state.updateClient.error = null;
    },
    clearDeleteClientStatus: (state) => {
      state.deleteClient.status = "idle";
    },
    clearDeleteClientData: () => {
      state.deleteClient.data = null;
    },
    clearDeleteClientError: (state) => {
      state.deleteClient.error = null;
    },
  },
});

export const clientActions = clientSlice.actions;
export const clientReducer = clientSlice.reducer;
