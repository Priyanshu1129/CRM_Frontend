import { createSlice } from "@reduxjs/toolkit";

const initialTargetState = {
  getAllTargets: {
    status: "idle",
    error: null,
    data: null,
  },
  updateTarget: {
    status: "idle",
    error: null,
    data: null,
  },
};

const targetSlice = createSlice({
  name: "target",
  initialState: initialTargetState,
  reducers: {
    getAllTargetsRequest: (state, action) => {
      state.getAllTargets.status = "pending";
    },
    getAllTargetsSuccess: (state, action) => {
      state.getAllTargets.status = "success";
      state.getAllTargets.data = action.payload;
    },
    getAllTargetsFailure: (state, action) => {
      state.getAllTargets.status = "failed";
      state.getAllTargets.error = action.payload;
    },
    updateTargetRequest: (state, action) => {
      state.updateTarget.status = "pending";
    },
    updateTargetSuccess: (state, action) => {
      state.updateTarget.status = "success";
      state.updateTarget.data = action.payload;
    },
    updateTargetFailure: (state, action) => {
      state.updateTarget.status = "failed";
      state.updateTarget.error = action.payload;
    },
   
    
    clearGetAllTargetsStatus: (state) => {
      state.getAllTargets.status = "idle";
    },
    clearGetAllTargetsData: () => {
      state.getAllTargets.data = null;
    },
    clearGetAllTargetsError: (state) => {
      state.getAllTargets.error = null;
    },

    clearUpdateTargetStatus: (state) => {
      state.updateTarget.status = "idle";
    },
    clearUpdateTargetData: () => {
      state.updateTarget.data = null;
    },
    clearUpdateTargetError: (state) => {
      state.updateTarget.error = null;
    },
  },
});

export const targetActions = targetSlice.actions;
export const targetReducer = targetSlice.reducer;
