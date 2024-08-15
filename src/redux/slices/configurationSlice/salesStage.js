import { createSlice } from '@reduxjs/toolkit';

const initialSalesStageState = {
    getSalesStage: {
        status: "idle",
        error: null,
        data: null,
    },
    getAllSalesStages: {
        status: "idle",
        error: null,
        data: null,
    },
    createSalesStage: {
        status: "idle",
        error: null,
        data: null,
    },
    updateSalesStage: {
        status: "idle",
        error: null,
        data: null,
    },
    deleteSalesStage: {
        status: "idle",
        error: null,
        data: null,
    }
}

const salesStageSlice = createSlice({
    name: "salesStage",
    initialState: initialSalesStageState,
    reducers: {
        getSalesStageRequest: (state, action) => {
            state.getSalesStage.status = 'pending'
        },
        getSalesStageSuccess: (state, action) => {
            state.getSalesStage.status = 'success'
            state.getSalesStage.data = action.payload;
        },
        getSalesStageFailure: (state, action) => {
            state.getSalesStage.status = 'failed'
            state.getSalesStage.error = action.payload;
        },
        getAllSalesStagesRequest: (state, action) => {
            state.getAllSalesStages.status = "pending";
        },
        getAllSalesStagesSuccess: (state, action) => {
            state.getAllSalesStages.status = 'success'
            state.getAllSalesStages.data = null
        },
        getAllSalesStagesFailure: (state, action) => {
            state.getAllSalesStages.status = 'failed';
        },
        createSalesStageRequest: (state, action) => {
            state.createSalesStage.status = 'pending'
        },
        createSalesStageSuccess: (state, action) => {
            state.createSalesStage.status = 'success'
            state.createSalesStage.data = action.payload;
        },
        createSalesStageFailure: (state, action) => {
            state.createSalesStage.status = 'failed'
            state.createSalesStage.data = null
            state.createSalesStage.error = action.payload;
        },
        updateSalesStageRequest: (state, action) => {
            state.updateSalesStage.status = 'pending'
        },
        updateSalesStageSuccess: (state, action) => {
            state.updateSalesStage.status = 'success'
            state.updateSalesStage.data = action.payload
        },
        updateSalesStageFailure: (state, action) => {
            state.updateSalesStage.status = 'failed'
            state.updateSalesStage.error = action.payload
        },
        deleteSalesStageRequest: (state) => {
            state.deleteSalesStage.status = 'pending'
        },
        deleteSalesStageSuccess: (state, action) => {
            state.deleteSalesStage.status = 'success'
            state.deleteSalesStage.data = action.payload
        },
        deleteSalesStageFailure: (state, action) => {
            state.deleteSalesStage.status = 'failed'
            state.deleteSalesStage.error = action.payload
        },
        clearGetSalesStageStatus: (state) => {
            state.getSalesStage.status = "idle";
        },
        clearGetSalesStageData: () => {
            state.getSalesStage.data = null;
        },
        clearGetSalesStageError: (state) => {
            state.getSalesStage.error = null;
        },
        clearGetAllSalesStagesStatus: (state) => {
            state.getAllSalesStages.status = "idle";
        },
        clearGetAllSalesStagesData: () => {
            state.getAllSalesStages.data = null;
        },
        clearGetAllSalesStagesError: (state) => {
            state.getAllSalesStages.error = null;
        },
        clearCreateSalesStageStatus: (state) => {
            state.createSalesStage.status = "idle";
        },
        clearCreateSalesStageData: () => {
            state.createSalesStage.data = null;
        },
        clearCreateSalesStageError: (state) => {
            state.createSalesStage.error = null;
        },
        clearUpdateSalesStageStatus: (state) => {
            state.updateSalesStage.status = "idle";
        },
        clearUpdateSalesStageData: () => {
            state.updateSalesStage.data = null;
        },
        clearUpdateSalesStageError: (state) => {
            state.updateSalesStage.error = null;
        },
        clearDeleteSalesStageStatus: (state) => {
            state.deleteSalesStage.status = "idle";
        },
        clearDeleteSalesStageData: () => {
            state.deleteSalesStage.data = null;
        },
        clearDeleteSalesStageError: (state) => {
            state.deleteSalesStage.error = null;
        },
    }
})

export const salesStageActions = salesStageSlice.actions;
export const salesStageReducer = salesStageSlice.reducer;