import { createSlice } from "@reduxjs/toolkit";
import { Descriptions } from "antd";

const initialState = {
  getConfigCounts: {
    status: "idle",
    error: null,
    data: null,
  },

  deleteConfigPopup: {
    open: false,
    configData: null,
    configType: "",
  },
};

const configurationSlice = createSlice({
  name: "configuration", // currency previously
  initialState,
  reducers: {
    setDeleteConfigPopup: (state, action) => {
      const {open , configData, configType} = action.payload;
      state.deleteConfigPopup.open = open;
      state.deleteConfigPopup.configData = configData;
      state.deleteConfigPopup.configType = configType;
    },
    resetDeleteConfigPopup: (state, action) => {
      state.deleteConfigPopup.open = false;
      state.deleteConfigPopup.configData = null;
      state.deleteConfigPopup.configType = "";
    },

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
