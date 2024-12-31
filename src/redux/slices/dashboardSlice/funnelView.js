import { createSlice } from '@reduxjs/toolkit';
import moment from "moment";

const initialFunnelViewState = {
    getFunnelView: {
        status: "idle",
        error: null,
        data: null,
    },
    getMyFunnelView: {
        status: "idle",
        error: null,
        data: null,
    },
    particularDate: moment().toISOString(),
    currentDate: null,
    myViewParticularDate: moment().toISOString(),
    myViewCurrentDate: null,
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
        },
        getMyFunnelViewRequest: (state, action) => {
            state.getMyFunnelView.status = 'pending'
        },
        getMyFunnelViewSuccess: (state, action) => {
            state.getMyFunnelView.status = 'success'
            state.getMyFunnelView.data = action.payload;
        },
        getMyFunnelViewFailure: (state, action) => {
            state.getMyFunnelView.status = 'failed'
            state.getMyFunnelView.error = action.payload;
        },
        clearGetMyFunnelViewStatus: (state) => {
            state.getMyFunnelView.status = "idle";
        },
        clearGetMyFunnelViewData: () => {
            state.getMyFunnelView.data = null;
        },
        clearGetMyFunnelViewError: (state) => {
            state.getMyFunnelView.error = null;
        },

        // particular dates 
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

export const funnelViewActions = funnelViewSlice.actions;
export const funnelViewReducer = funnelViewSlice.reducer;