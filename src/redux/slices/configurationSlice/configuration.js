import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  getConfigCounts: {
    status: "idle",
    error: null,
    data: null,
  },
};

const configurationSlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    getConfigCountsRequest: (state, action) => {
      state.getConfigCounts.status = "pending";
    },
    getConfigCountsSuccess: (state, action) => {
      state.getConfigCounts.status = "success";
      state.getConfigCounts.data = action.payload;
    },
    getConfigCountsFailure: (state, action) => {
      state.getConfigCounts.status = "failed";
      state.getConfigCounts.error = action.payload;
    },
    clearConfigCountsStatus: (state) => {
      state.getConfigCounts.status = "idle";
    },
    clearConfigCountsData: () => {
      state.getConfigCounts.data = null;
    },
    clearConfigCountsError: (state) => {
      state.getConfigCounts.error = null;
    },
  },
});

export const configurationActions = configurationSlice.actions;
export const configurationReducer = configurationSlice.reducer;
