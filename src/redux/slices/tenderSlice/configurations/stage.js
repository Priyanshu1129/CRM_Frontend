import { createSlice } from '@reduxjs/toolkit';

const initialStageState = {
    getStage: {
        status: "idle",
        error: null,
        data: null,
    },
    getAllStages: {
        status: "idle",
        error: null,
        data: null,
    },
    createStage: {
        status: "idle",
        error: null,
        data: null,
    },
    updateStage: {
        status: "idle",
        error: null,
        data: null,
    },
    deleteStage: {
        status: "idle",
        error: null,
        data: null,
    }
}

const stageSlice = createSlice({
    name: "stage",
    initialState: initialStageState,
    reducers: {
        getStageRequest: (state, action) => {
            state.getStage.status = 'pending'
        },
        getStageSuccess: (state, action) => {
            state.getStage.status = 'success'
            state.getStage.data = action.payload;
        },
        getStageFailure: (state, action) => {
            state.getStage.status = 'failed'
            state.getStage.error = action.payload;
        },
        getAllStagesRequest: (state, action) => {
            state.getAllStages.status = "pending";
        },
        getAllStagesSuccess: (state, action) => {
            state.getAllStages.status = 'success'
            state.getAllStages.data = action.payload;
        },
        getAllStagesFailure: (state, action) => {
            state.getAllStages.status = 'failed';
        },
        createStageRequest: (state, action) => {
            state.createStage.status = 'pending'
        },
        createStageSuccess: (state, action) => {
            state.createStage.status = 'success'
            state.createStage.data = action.payload;
        },
        createStageFailure: (state, action) => {
            state.createStage.status = 'failed'
            state.createStage.data = null
            state.createStage.error = action.payload;
        },
        updateStageRequest: (state, action) => {
            state.updateStage.status = 'pending'
        },
        updateStageSuccess: (state, action) => {
            state.updateStage.status = 'success'
            state.updateStage.data = action.payload
        },
        updateStageFailure: (state, action) => {
            state.updateStage.status = 'failed'
            state.updateStage.error = action.payload
        },
        deleteStageRequest: (state) => {
            state.deleteStage.status = 'pending'
        },
        deleteStageSuccess: (state, action) => {
            state.deleteStage.status = 'success'
            state.deleteStage.data = action.payload
        },
        deleteStageFailure: (state, action) => {
            state.deleteStage.status = 'failed'
            state.deleteStage.error = action.payload
        },
        clearGetStageStatus: (state) => {
            state.getStage.status = "idle";
        },
        clearGetStageData: () => {
            state.getStage.data = null;
        },
        clearGetStageError: (state) => {
            state.getStage.error = null;
        },
        clearGetAllStagesStatus: (state) => {
            state.getAllStages.status = "idle";
        },
        clearGetAllStagesData: () => {
            state.getAllStages.data = null;
        },
        clearGetAllStagesError: (state) => {
            state.getAllStages.error = null;
        },
        clearCreateStageStatus: (state) => {
            state.createStage.status = "idle";
        },
        clearCreateStageData: () => {
            state.createStage.data = null;
        },
        clearCreateStageError: (state) => {
            state.createStage.error = null;
        },
        clearUpdateStageStatus: (state) => {
            state.updateStage.status = "idle";
        },
        clearUpdateStageData: () => {
            state.updateStage.data = null;
        },
        clearUpdateStageError: (state) => {
            state.updateStage.error = null;
        },
        clearDeleteStageStatus: (state) => {
            state.deleteStage.status = "idle";
        },
        clearDeleteStageData: () => {
            state.deleteStage.data = null;
        },
        clearDeleteStageError: (state) => {
            state.deleteStage.error = null;
        },
    }
})

export const stageActions = stageSlice.actions;
export const stageReducer = stageSlice.reducer;