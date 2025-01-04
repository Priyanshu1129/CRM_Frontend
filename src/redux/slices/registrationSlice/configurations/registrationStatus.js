import { createSlice } from "@reduxjs/toolkit";

const initialRegistrationStatusState = {
  getRegistrationStatus: {
    status: "idle",
    error: null,
    data: null,
  },
  getAllRegistrationStatus: {
    status: "idle",
    error: null,
    data: null,
  },
  createRegistrationStatus: {
    status: "idle",
    error: null,
    data: null,
  },
  updateRegistrationStatus: {
    status: "idle",
    error: null,
    data: null,
  },
  deleteRegistrationStatus: {
    status: "idle",
    error: null,
    data: null,
  },
};

const registrationStatusSlice = createSlice({
  name: "registrationStatus",
  initialState: initialRegistrationStatusState,
  reducers: {
    getRegistrationStatusRequest: (state, action) => {
      state.getRegistrationStatus.status = "pending";
    },
    getRegistrationStatusSuccess: (state, action) => {
      state.getRegistrationStatus.status = "success";
      state.getRegistrationStatus.data = action.payload;
    },
    getRegistrationStatusFailure: (state, action) => {
      state.getRegistrationStatus.status = "failed";
      state.getRegistrationStatus.error = action.payload;
    },
    getAllRegistrationStatusRequest: (state, action) => {
      state.getAllRegistrationStatus.status = "pending";
    },
    getAllRegistrationStatusSuccess: (state, action) => {
      state.getAllRegistrationStatus.status = "success";
      state.getAllRegistrationStatus.data = action.payload;
    },
    getAllRegistrationStatusFailure: (state, action) => {
      state.getAllRegistrationStatus.status = "failed";
      state.getAllRegistrationStatus.error = action.payload;
    },
    createRegistrationStatusRequest: (state, action) => {
      state.createRegistrationStatus.status = "pending";
    },
    createRegistrationStatusSuccess: (state, action) => {
      state.createRegistrationStatus.status = "success";
      state.createRegistrationStatus.data = action.payload;
    },
    createRegistrationStatusFailure: (state, action) => {
      state.createRegistrationStatus.status = "failed";
      state.createRegistrationStatus.data = null;
      state.createRegistrationStatus.error = action.payload;
    },
    updateRegistrationStatusRequest: (state, action) => {
      state.updateRegistrationStatus.status = "pending";
    },
    updateRegistrationStatusSuccess: (state, action) => {
      state.updateRegistrationStatus.status = "success";
      state.updateRegistrationStatus.data = action.payload;
    },
    updateRegistrationStatusFailure: (state, action) => {
      state.updateRegistrationStatus.status = "failed";
      state.updateRegistrationStatus.error = action.payload;
    },
    deleteRegistrationStatusRequest: (state) => {
      state.deleteRegistrationStatus.status = "pending";
    },
    deleteRegistrationStatusSuccess: (state, action) => {
      state.deleteRegistrationStatus.status = "success";
      state.deleteRegistrationStatus.data = action.payload;
    },
    deleteRegistrationStatusFailure: (state, action) => {
      state.deleteRegistrationStatus.status = "failed";
      state.deleteRegistrationStatus.error = action.payload;
    },
    clearGetRegistrationStatusStatus: (state) => {
      state.getRegistrationStatus.status = "idle";
    },
    clearGetRegistrationStatusData: () => {
      state.getRegistrationStatus.data = null;
    },
    clearGetRegistrationStatusError: (state) => {
      state.getRegistrationStatus.error = null;
    },
    clearGetAllRegistrationStatusStatus: (state) => {
      state.getAllRegistrationStatus.status = "idle";
    },
    clearGetAllRegistrationStatusData: () => {
      state.getAllRegistrationStatus.data = null;
    },
    clearGetAllRegistrationStatusError: (state) => {
      state.getAllRegistrationStatus.error = null;
    },
    clearCreateRegistrationStatusStatus: (state) => {
      state.createRegistrationStatus.status = "idle";
    },
    clearCreateRegistrationStatusData: () => {
      state.createRegistrationStatus.data = null;
    },
    clearCreateRegistrationStatusError: (state) => {
      state.createRegistrationStatus.error = null;
    },
    clearUpdateRegistrationStatusStatus: (state) => {
      state.updateRegistrationStatus.status = "idle";
    },
    clearUpdateRegistrationStatusData: () => {
      state.updateRegistrationStatus.data = null;
    },
    clearUpdateRegistrationStatusError: (state) => {
      state.updateRegistrationStatus.error = null;
    },
    clearDeleteRegistrationStatusStatus: (state) => {
      state.deleteRegistrationStatus.status = "idle";
    },
    clearDeleteRegistrationStatusData: () => {
      state.deleteRegistrationStatus.data = null;
    },
    clearDeleteRegistrationStatusError: (state) => {
      state.deleteRegistrationStatus.error = null;
    },
  },
});

export const registrationStatusActions = registrationStatusSlice.actions;
export const registrationStatusReducer = registrationStatusSlice.reducer;
