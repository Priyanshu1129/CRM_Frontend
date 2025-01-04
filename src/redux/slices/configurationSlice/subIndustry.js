import { createSlice } from "@reduxjs/toolkit";

const initialSubIndustryState = {
  getSubIndustry: {
    status: "idle",
    error: null,
    data: null,
  },
  getAllSubIndustries: {
    status: "idle",
    error: null,
    data: null,
  },
  createSubIndustry: {
    status: "idle",
    error: null,
    data: null,
  },
  updateSubIndustry: {
    status: "idle",
    error: null,
    data: null,
  },
  deleteSubIndustry: {
    status: "idle",
    error: null,
    data: null,
  },
};

const subIndustrySlice = createSlice({
  name: "subIndustry",
  initialState: initialSubIndustryState,
  reducers: {
    getSubIndustryRequest: (state, action) => {
      state.getSubIndustry.status = "pending";
    },
    getSubIndustrySuccess: (state, action) => {
      state.getSubIndustry.status = "success";
      state.getSubIndustry.data = action.payload;
    },
    getSubIndustryFailure: (state, action) => {
      state.getSubIndustry.status = "failed";
      state.getSubIndustry.error = action.payload;
    },
    getAllSubIndustriesRequest: (state, action) => {
      state.getAllSubIndustries.status = "pending";
    },
    getAllSubIndustriesSuccess: (state, action) => {
      state.getAllSubIndustries.status = "success";
      state.getAllSubIndustries.data = action.payload;
    },
    getAllSubIndustriesFailure: (state, action) => {
      state.getAllSubIndustries.status = "failed";
      state.getAllSubIndustries.error = action.payload;
    },
    createSubIndustryRequest: (state, action) => {
      state.createSubIndustry.status = "pending";
    },
    createSubIndustrySuccess: (state, action) => {
      state.createSubIndustry.status = "success";
      state.createSubIndustry.data = action.payload;
    },
    createSubIndustryFailure: (state, action) => {
      state.createSubIndustry.status = "failed";
      state.createSubIndustry.data = null;
      state.createSubIndustry.error = action.payload;
    },
    updateSubIndustryRequest: (state, action) => {
      state.updateSubIndustry.status = "pending";
    },
    updateSubIndustrySuccess: (state, action) => {
      state.updateSubIndustry.status = "success";
      state.updateSubIndustry.data = action.payload;
    },
    updateSubIndustryFailure: (state, action) => {
      state.updateSubIndustry.status = "failed";
      state.updateSubIndustry.error = action.payload;
    },
    deleteSubIndustryRequest: (state) => {
      state.deleteSubIndustry.status = "pending";
    },
    deleteSubIndustrySuccess: (state, action) => {
      state.deleteSubIndustry.status = "success";
      state.deleteSubIndustry.data = action.payload;
    },
    deleteSubIndustryFailure: (state, action) => {
      state.deleteSubIndustry.status = "failed";
      state.deleteSubIndustry.error = action.payload;
    },
    clearGetSubIndustryStatus: (state) => {
      state.getSubIndustry.status = "idle";
    },
    clearGetSubIndustryData: () => {
      state.getSubIndustry.data = null;
    },
    clearGetSubIndustryError: (state) => {
      state.getSubIndustry.error = null;
    },
    clearGetAllSubIndustriesStatus: (state) => {
      state.getAllSubIndustries.status = "idle";
    },
    clearGetAllSubIndustriesData: () => {
      state.getAllSubIndustries.data = null;
    },
    clearGetAllSubIndustriesError: (state) => {
      state.getAllSubIndustries.error = null;
    },
    clearCreateSubIndustryStatus: (state) => {
      state.createSubIndustry.status = "idle";
    },
    clearCreateSubIndustryData: () => {
      state.createSubIndustry.data = null;
    },
    clearCreateSubIndustryError: (state) => {
      state.createSubIndustry.error = null;
    },
    clearUpdateSubIndustryStatus: (state) => {
      state.updateSubIndustry.status = "idle";
    },
    clearUpdateSubIndustryData: () => {
      state.updateSubIndustry.data = null;
    },
    clearUpdateSubIndustryError: (state) => {
      state.updateSubIndustry.error = null;
    },
    clearDeleteSubIndustryStatus: (state) => {
      state.deleteSubIndustry.status = "idle";
    },
    clearDeleteSubIndustryData: () => {
      state.deleteSubIndustry.data = null;
    },
    clearDeleteSubIndustryError: (state) => {
      state.deleteSubIndustry.error = null;
    },
  },
});

export const subIndustryActions = subIndustrySlice.actions;
export const subIndustryReducer = subIndustrySlice.reducer;
