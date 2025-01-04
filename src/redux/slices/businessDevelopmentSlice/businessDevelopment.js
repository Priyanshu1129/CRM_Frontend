import { createSlice } from "@reduxjs/toolkit";

const initialBusinessDevelopmentState = {
  getBusinessDevelopment: {
    status: "idle",
    error: null,
    data: null,
  },
  getAllBusinessDevelopments: {
    status: "idle",
    error: null,
    data: null,
  },
  createBusinessDevelopment: {
    status: "idle",
    error: null,
    data: null,
  },
  updateBusinessDevelopment: {
    status: "idle",
    error: null,
    data: null,
  },
  deleteBusinessDevelopment: {
    status: "idle",
    error: null,
    data: null,
  },
};

const businessDevelopmentSlice = createSlice({
  name: "businessDevelopment",
  initialState: initialBusinessDevelopmentState,
  reducers: {
    getBusinessDevelopmentRequest: (state, action) => {
      state.getBusinessDevelopment.status = "pending";
    },
    getBusinessDevelopmentSuccess: (state, action) => {
      state.getBusinessDevelopment.status = "success";
      state.getBusinessDevelopment.data = action.payload;
    },
    getBusinessDevelopmentFailure: (state, action) => {
      state.getBusinessDevelopment.status = "failed";
      state.getBusinessDevelopment.error = action.payload;
    },
    getAllBusinessDevelopmentsRequest: (state, action) => {
      state.getAllBusinessDevelopments.status = "pending";
    },
    getAllBusinessDevelopmentsSuccess: (state, action) => {
      state.getAllBusinessDevelopments.status = "success";
      state.getAllBusinessDevelopments.data = action.payload;
    },
    getAllBusinessDevelopmentsFailure: (state, action) => {
      state.getAllBusinessDevelopments.status = "failed";
      state.getAllBusinessDevelopments.error = action.payload;
    },
    createBusinessDevelopmentRequest: (state, action) => {
      state.createBusinessDevelopment.status = "pending";
    },
    createBusinessDevelopmentSuccess: (state, action) => {
      state.createBusinessDevelopment.status = "success";
      state.createBusinessDevelopment.data = action.payload;
    },
    createBusinessDevelopmentFailure: (state, action) => {
      state.createBusinessDevelopment.status = "failed";
      state.createBusinessDevelopment.data = null;
      state.createBusinessDevelopment.error = action.payload;
    },
    updateBusinessDevelopmentRequest: (state, action) => {
      state.updateBusinessDevelopment.status = "pending";
    },
    updateBusinessDevelopmentSuccess: (state, action) => {
      state.updateBusinessDevelopment.status = "success";
      state.updateBusinessDevelopment.data = action.payload;
    },
    updateBusinessDevelopmentFailure: (state, action) => {
      state.updateBusinessDevelopment.status = "failed";
      state.updateBusinessDevelopment.error = action.payload;
    },
    deleteBusinessDevelopmentRequest: (state) => {
      state.deleteBusinessDevelopment.status = "pending";
    },
    deleteBusinessDevelopmentSuccess: (state, action) => {
      state.deleteBusinessDevelopment.status = "success";
      state.deleteBusinessDevelopment.data = action.payload;
    },
    deleteBusinessDevelopmentFailure: (state, action) => {
      state.deleteBusinessDevelopment.status = "failed";
      state.deleteBusinessDevelopment.error = action.payload;
    },
    clearGetBusinessDevelopmentStatus: (state) => {
      state.getBusinessDevelopment.status = "idle";
    },
    clearGetBusinessDevelopmentData: () => {
      state.getBusinessDevelopment.data = null;
    },
    clearGetBusinessDevelopmentError: (state) => {
      state.getBusinessDevelopment.error = null;
    },
    clearGetAllBusinessDevelopmentsStatus: (state) => {
      state.getAllBusinessDevelopments.status = "idle";
    },
    clearGetAllBusinessDevelopmentsData: () => {
      state.getAllBusinessDevelopments.data = null;
    },
    clearGetAllBusinessDevelopmentsError: (state) => {
      state.getAllBusinessDevelopments.error = null;
    },
    clearCreateBusinessDevelopmentStatus: (state) => {
      state.createBusinessDevelopment.status = "idle";
    },
    clearCreateBusinessDevelopmentData: () => {
      state.createBusinessDevelopment.data = null;
    },
    clearCreateBusinessDevelopmentError: (state) => {
      state.createBusinessDevelopment.error = null;
    },
    clearUpdateBusinessDevelopmentStatus: (state) => {
      state.updateBusinessDevelopment.status = "idle";
    },
    clearUpdateBusinessDevelopmentData: () => {
      state.updateBusinessDevelopment.data = null;
    },
    clearUpdateBusinessDevelopmentError: (state) => {
      state.updateBusinessDevelopment.error = null;
    },
    clearDeleteBusinessDevelopmentStatus: (state) => {
      state.deleteBusinessDevelopment.status = "idle";
    },
    clearDeleteBusinessDevelopmentData: () => {
      state.deleteBusinessDevelopment.data = null;
    },
    clearDeleteBusinessDevelopmentError: (state) => {
      state.deleteBusinessDevelopment.error = null;
    },
  },
});

export const businessDevelopmentActions = businessDevelopmentSlice.actions;
export const businessDevelopmentReducer = businessDevelopmentSlice.reducer;
