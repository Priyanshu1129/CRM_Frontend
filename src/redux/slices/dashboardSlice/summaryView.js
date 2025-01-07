import { createSlice } from "@reduxjs/toolkit";

const initialSummaryViewState = {
  getSummaryView: {
    status: "idle",
    error: null,
    data: null,
  },
  currentYear: null,
  //   getHeatmapView: {
  //     status: "idle",
  //     error: null,
  //     data: null,
  //   },
  //   getMySummaryView: {
  //     status: "idle",
  //     error: null,
  //     data: null,
  //   },
  //   getMyHeatmapView: {
  //     status: "idle",
  //     error: null,
  //     data: null,
  //   },
};

const summaryViewSlice = createSlice({
  name: "summaryView",
  initialState: initialSummaryViewState,
  reducers: {
    getSummaryViewRequest: (state, action) => {
      state.getSummaryView.status = "pending";
    },
    getSummaryViewSuccess: (state, action) => {
      state.getSummaryView.status = "success";
      state.getSummaryView.data = action.payload;
    },
    getSummaryViewFailure: (state, action) => {
      state.getSummaryView.status = "failed";
      state.getSummaryView.error = action.payload;
    },
    clearGetSummaryViewStatus: (state) => {
      state.getSummaryView.status = "idle";
    },
    clearGetSummaryViewData: () => {
      state.getSummaryView.data = null;
    },
    clearGetSummaryViewError: (state) => {
      state.getSummaryView.error = null;
    },
    setCurrentYear: (state, action) => {
      state.currentYear = action.payload;
    },
    // old summary view
    //     getHeatmapViewRequest: (state, action) => {
    //       state.getHeatmapView.status = "pending";
    //     },
    //     getHeatmapViewSuccess: (state, action) => {
    //       state.getHeatmapView.status = "success";
    //       state.getHeatmapView.data = action.payload;
    //     },
    //     getHeatmapViewFailure: (state, action) => {
    //       state.getHeatmapView.status = "failed";
    //       state.getHeatmapView.error = action.payload;
    //     },
    //     clearGetHeatmapViewStatus: (state) => {
    //       state.getHeatmapView.status = "idle";
    //     },
    //     clearGetHeatmapViewData: () => {
    //       state.getHeatmapView.data = null;
    //     },
    //     clearGetHeatmapViewError: (state) => {
    //       state.getHeatmapView.error = null;
    //     },
    //     getMySummaryViewRequest: (state, action) => {
    //       state.getMySummaryView.status = "pending";
    //     },
    //     getMySummaryViewSuccess: (state, action) => {
    //       state.getMySummaryView.status = "success";
    //       state.getMySummaryView.data = action.payload;
    //     },
    //     getMySummaryViewFailure: (state, action) => {
    //       state.getMySummaryView.status = "failed";
    //       state.getMySummaryView.error = action.payload;
    //     },
    //     clearGetMySummaryViewStatus: (state) => {
    //       state.getMySummaryView.status = "idle";
    //     },
    //     clearGetMySummaryViewData: () => {
    //       state.getMySummaryView.data = null;
    //     },
    //     clearGetMySummaryViewError: (state) => {
    //       state.getMySummaryView.error = null;
    //     },
    //     getMyHeatmapViewRequest: (state, action) => {
    //       state.getMyHeatmapView.status = "pending";
    //     },
    //     getMyHeatmapViewSuccess: (state, action) => {
    //       state.getMyHeatmapView.status = "success";
    //       state.getMyHeatmapView.data = action.payload;
    //     },
    //     getMyHeatmapViewFailure: (state, action) => {
    //       state.getMyHeatmapView.status = "failed";
    //       state.getMyHeatmapView.error = action.payload;
    //     },
    //     clearGetMyHeatmapViewStatus: (state) => {
    //       state.getMyHeatmapView.status = "idle";
    //     },
    //     clearGetMyHeatmapViewData: () => {
    //       state.getMyHeatmapView.data = null;
    //     },
    //     clearGetMyHeatmapViewError: (state) => {
    //       state.getMyHeatmapView.error = null;
    //     },
  },
});

export const summaryViewActions = summaryViewSlice.actions;
export const summaryViewReducer = summaryViewSlice.reducer;
