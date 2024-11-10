import { createSlice } from '@reduxjs/toolkit';

const initialSummaryViewState = {
    getSummaryView: {
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
        }
    }
})

export const summaryViewActions = summaryViewSlice.actions;
export const summaryViewReducer = summaryViewSlice.reducer;