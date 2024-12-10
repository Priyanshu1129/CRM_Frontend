import { createSlice } from '@reduxjs/toolkit';

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
    }
}

const pipeViewSlice = createSlice({
    name: "pipeView",
    initialState: initialPipeViewState,
    reducers: {
        getPipeViewRequest: (state, action) => {
            state.getPipeView.status = 'pending'
        },
        getPipeViewSuccess: (state, action) => {
            state.getPipeView.status = 'success'
            state.getPipeView.data = action.payload;
        },
        getPipeViewFailure: (state, action) => {
            state.getPipeView.status = 'failed'
            state.getPipeView.error = action.payload;
        },
        clearGetPipeViewStatus: (state) => {
            state.getPipeView.status = "idle";
        },
        clearGetPipeViewData: () => {
            state.getPipeView.data = null;
        },
        clearGetPipeViewError: (state) => {
            state.getPipeView.error = null;
        },
        getMyPipeViewRequest: (state, action) => {
            state.getMyPipeView.status = 'pending'
        },
        getMyPipeViewSuccess: (state, action) => {
            state.getMyPipeView.status = 'success'
            state.getMyPipeView.data = action.payload;
        },
        getMyPipeViewFailure: (state, action) => {
            state.getMyPipeView.status = 'failed'
            state.getMyPipeView.error = action.payload;
        },
        clearGetMyPipeViewStatus: (state) => {
            state.getMyPipeView.status = "idle";
        },
        clearGetMyPipeViewData: () => {
            state.getMyPipeView.data = null;
        },
        clearGetMyPipeViewError: (state) => {
            state.getMyPipeView.error = null;
        }
    }
})

export const pipeViewActions = pipeViewSlice.actions;
export const pipeViewReducer = pipeViewSlice.reducer;