import { createSlice } from '@reduxjs/toolkit';

const initialSummaryViewState = {
    getSummaryView: {
        status: "idle",
        error: null,
        data: null,
    },
    getHeatmapView: {
        status: "idle",
        error: null,
        data: null,
    }
}

const summaryViewSlice = createSlice({
    name: "summaryView",
    initialState: initialSummaryViewState,
    reducers: {
        getSummaryViewRequest: (state, action) => {
            state.getSummaryView.status = 'pending'
        },
        getSummaryViewSuccess: (state, action) => {
            state.getSummaryView.status = 'success'
            state.getSummaryView.data = action.payload;
        },
        getSummaryViewFailure: (state, action) => {
            state.getSummaryView.status = 'failed'
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
        getHeatmapViewRequest: (state, action) => {
            state.getHeatmapView.status = 'pending'
        },
        getHeatmapViewSuccess: (state, action) => {
            state.getHeatmapView.status = 'success'
            state.getHeatmapView.data = action.payload;
        },
        getHeatmapViewFailure: (state, action) => {
            state.getHeatmapView.status = 'failed'
            state.getHeatmapView.error = action.payload;
        },
        clearGetHeatmapViewStatus: (state) => {
            state.getHeatmapView.status = "idle";
        },
        clearGetHeatmapViewData: () => {
            state.getHeatmapView.data = null;
        },
        clearGetHeatmapViewError: (state) => {
            state.getHeatmapView.error = null;
        }
    }
})

export const summaryViewActions = summaryViewSlice.actions;
export const summaryViewReducer = summaryViewSlice.reducer;