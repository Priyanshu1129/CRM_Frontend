import { createSlice } from '@reduxjs/toolkit';
import moment from "moment";
const initialTrendViewState = {
    getTrendView: {
        status: "idle",
        error: null,
        data: null,
    },
    getMyTrendView: {
        status: "idle",
        error: null,
        data: null,
    },
    particularDate: moment().toISOString(),
    currentDate: null,
    myViewParticularDate: moment().toISOString(),
    myViewCurrentDate: null,
}

const trendViewSlice = createSlice({
    name: "trendView",
    initialState: initialTrendViewState,
    reducers: {
        // get trend-view
        getTrendViewRequest: (state, action) => {
            state.getTrendView.status = 'pending'
        },
        getTrendViewSuccess: (state, action) => {
            state.getTrendView.status = 'success'
            state.getTrendView.data = action.payload;
        },
        getTrendViewFailure: (state, action) => {
            state.getTrendView.status = 'failed'
            state.getTrendView.error = action.payload;
        },

        // clear trend-view
        clearGetTrendViewStatus: (state) => {
            state.getTrendView.status = "idle";
        },
        clearGetTrendViewData: () => {
            state.getTrendView.data = null;
        },
        clearGetTrendViewError: (state) => {
            state.getTrendView.error = null;
        },

        // get my-trend view
        getMyTrendViewRequest: (state, action) => {
            state.getMyTrendView.status = 'pending'
        },
        getMyTrendViewSuccess: (state, action) => {
            state.getMyTrendView.status = 'success'
            state.getMyTrendView.data = action.payload;
        },
        getMyTrendViewFailure: (state, action) => {
            state.getMyTrendView.status = 'failed'
            state.getMyTrendView.error = action.payload;
        },

        // clear my trend-view
        clearGetMyTrendViewStatus: (state) => {
            state.getMyTrendView.status = "idle";
        },
        clearGetMyTrendViewData: () => {
            state.getMyTrendView.data = null;
        },
        clearGetMyTrendViewError: (state) => {
            state.getMyTrendView.error = null;
        },

        // particular dates
        setParticularDate(state, action) {
            state.particularDate = moment(action.payload).toISOString();
        },
        setCurrentDate(state, action) {
            state.currentDate = action.payload;
        },
        setMyViewParticularDate(state, action) {
            state.myViewParticularDate = moment(action.payload).toISOString();
        },
        setMyViewCurrentDate(state, action) {
            state.myViewCurrentDate = action.payload
        },
    }
})

export const trendViewActions = trendViewSlice.actions;
export const trendViewReducer = trendViewSlice.reducer;