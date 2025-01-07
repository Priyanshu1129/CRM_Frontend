import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
const initialPipeViewState = {
  getPipeView: {
    status: "idle",
    error: null,
    data: null,
  },
  getMyPipeView: {
    status: "idle",
    error: null,
    data: null,
  },
  allViewParticularDate: moment().toISOString(),
  allViewCurrentDate: null,
  myViewParticularDate: moment().toISOString(),
  myViewCurrentDate: null,
};

const pipeViewSlice = createSlice({
  name: "pipeView",
  initialState: initialPipeViewState,
  reducers: {
    // get pipe-view
    getPipeViewRequest: (state, action) => {
      state.getPipeView.status = "pending";
    },
    getPipeViewSuccess: (state, action) => {
      state.getPipeView.status = "success";
      state.getPipeView.data = action.payload;
    },
    getPipeViewFailure: (state, action) => {
      state.getPipeView.status = "failed";
      state.getPipeView.error = action.payload;
    },

    // clear pipe-view
    clearGetPipeViewStatus: (state) => {
      state.getPipeView.status = "idle";
    },
    clearGetPipeViewData: () => {
      state.getPipeView.data = null;
    },
    clearGetPipeViewError: (state) => {
      state.getPipeView.error = null;
    },

    // get my-pipe view
    getMyPipeViewRequest: (state, action) => {
      state.getMyPipeView.status = "pending";
    },
    getMyPipeViewSuccess: (state, action) => {
      state.getMyPipeView.status = "success";
      state.getMyPipeView.data = action.payload;
    },
    getMyPipeViewFailure: (state, action) => {
      state.getMyPipeView.status = "failed";
      state.getMyPipeView.error = action.payload;
    },

    // clear my pipe-view
    clearGetMyPipeViewStatus: (state) => {
      state.getMyPipeView.status = "idle";
    },
    clearGetMyPipeViewData: () => {
      state.getMyPipeView.data = null;
    },
    clearGetMyPipeViewError: (state) => {
      state.getMyPipeView.error = null;
    },

    // particular dates
    setAllViewParticularDate(state, action) {
      state.allViewParticularDate = moment(action.payload).toISOString();
    },
    setAllViewCurrentDate(state, action) {
      state.allViewCurrentDate = action.payload;
    },
    setMyViewParticularDate(state, action) {
      state.myViewParticularDate = moment(action.payload).toISOString();
    },
    setMyViewCurrentDate(state, action) {
      state.myViewCurrentDate = action.payload;
    },
  },
});

export const pipeViewActions = pipeViewSlice.actions;
export const pipeViewReducer = pipeViewSlice.reducer;
