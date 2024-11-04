import { createSlice } from '@reduxjs/toolkit';

const initialFunnelViewState = {
    getFunnelView: {
        status: "idle",
        error: null,
        data: null,
    }
}

const funnelViewSlice = createSlice({
    name: "funnelView",
    initialState: initialFunnelViewState,
    reducers: {
        getFunnelViewRequest: (state, action) => {
            state.getFunnelView.status = 'pending'
        },
        getFunnelViewSuccess: (state, action) => {
            state.getFunnelView.status = 'success'
            state.getFunnelView.data = action.payload;
        },
        getFunnelViewFailure: (state, action) => {
            state.getFunnelView.status = 'failed'
            state.getFunnelView.error = action.payload;
        },
        clearGetFunnelViewStatus: (state) => {
            state.getFunnelView.status = "idle";
        },
        clearGetFunnelViewData: () => {
            state.getFunnelView.data = null;
        },
        clearGetFunnelViewError: (state) => {
            state.getFunnelView.error = null;
        }
    }
})

export const funnelViewActions = funnelViewSlice.actions;
export const funnelViewReducer = funnelViewSlice.reducer;