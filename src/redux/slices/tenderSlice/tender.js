import { createSlice } from "@reduxjs/toolkit";

const initialTenderState = {
  getTender: {
    status: "idle",
    error: null,
    data: null,
  },
  getAllTenders: {
    status: "idle",
    error: null,
    data: null,
  },
  createTender: {
    status: "idle",
    error: null,
    data: null,
  },
  updateTender: {
    status: "idle",
    error: null,
    data: null,
  },
  deleteTender: {
    status: "idle",
    error: null,
    data: null,
  },
};

const tenderSlice = createSlice({
  name: "tender",
  initialState: initialTenderState,
  reducers: {
    getTenderRequest: (state, action) => {
      state.getTender.status = "pending";
    },
    getTenderSuccess: (state, action) => {
      state.getTender.status = "success";
      state.getTender.data = action.payload;
    },
    getTenderFailure: (state, action) => {
      state.getTender.status = "failed";
      state.getTender.error = action.payload;
    },
    getAllTendersRequest: (state, action) => {
      state.getAllTenders.status = "pending";
    },
    getAllTendersSuccess: (state, action) => {
      state.getAllTenders.status = "success";
      state.getAllTenders.data = action.payload;
    },
    getAllTendersFailure: (state, action) => {
      state.getAllTenders.status = "failed";
      state.getAllTenders.error = action.payload;
    },
    createTenderRequest: (state, action) => {
      state.createTender.status = "pending";
    },
    createTenderSuccess: (state, action) => {
      state.createTender.status = "success";
      state.createTender.data = action.payload;
    },
    createTenderFailure: (state, action) => {
      state.createTender.status = "failed";
      state.createTender.data = null;
      state.createTender.error = action.payload;
    },
    updateTenderRequest: (state, action) => {
      state.updateTender.status = "pending";
    },
    updateTenderSuccess: (state, action) => {
      state.updateTender.status = "success";
      state.updateTender.data = action.payload;
    },
    updateTenderFailure: (state, action) => {
      state.updateTender.status = "failed";
      state.updateTender.error = action.payload;
    },
    deleteTenderRequest: (state) => {
      state.deleteTender.status = "pending";
    },
    deleteTenderSuccess: (state, action) => {
      state.deleteTender.status = "success";
      state.deleteTender.data = action.payload;
    },
    deleteTenderFailure: (state, action) => {
      state.deleteTender.status = "failed";
      state.deleteTender.error = action.payload;
    },
    clearGetTenderStatus: (state) => {
      state.getTender.status = "idle";
    },
    clearGetTenderData: () => {
      state.getTender.data = null;
    },
    clearGetTenderError: (state) => {
      state.getTender.error = null;
    },
    clearGetAllTendersStatus: (state) => {
      state.getAllTenders.status = "idle";
    },
    clearGetAllTendersData: () => {
      state.getAllTenders.data = null;
    },
    clearGetAllTendersError: (state) => {
      state.getAllTenders.error = null;
    },
    clearCreateTenderStatus: (state) => {
      state.createTender.status = "idle";
    },
    clearCreateTenderData: () => {
      state.createTender.data = null;
    },
    clearCreateTenderError: (state) => {
      state.createTender.error = null;
    },
    clearUpdateTenderStatus: (state) => {
      state.updateTender.status = "idle";
    },
    clearUpdateTenderData: () => {
      state.updateTender.data = null;
    },
    clearUpdateTenderError: (state) => {
      state.updateTender.error = null;
    },
    clearDeleteTenderStatus: (state) => {
      state.deleteTender.status = "idle";
    },
    clearDeleteTenderData: () => {
      state.deleteTender.data = null;
    },
    clearDeleteTenderError: (state) => {
      state.deleteTender.error = null;
    },
  },
});

export const tenderActions = tenderSlice.actions;
export const tenderReducer = tenderSlice.reducer;
