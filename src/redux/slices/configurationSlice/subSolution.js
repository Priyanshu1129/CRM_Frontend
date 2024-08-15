import { createSlice } from '@reduxjs/toolkit';

const initialSubSolutionState = {
    getSubSolution: {
        status: "idle",
        error: null,
        data: null,
    },
    getAllSubSolutions: {
        status: "idle",
        error: null,
        data: null,
    },
    createSubSolution: {
        status: "idle",
        error: null,
        data: null,
    },
    updateSubSolution: {
        status: "idle",
        error: null,
        data: null,
    },
    deleteSubSolution: {
        status: "idle",
        error: null,
        data: null,
    }
}

const subSolutionSlice = createSlice({
    name: "subSolution",
    initialState: initialSubSolutionState,
    reducers: {
        getSubSolutionRequest: (state, action) => {
            state.getSubSolution.status = 'pending'
        },
        getSubSolutionSuccess: (state, action) => {
            state.getSubSolution.status = 'success'
            state.getSubSolution.data = action.payload;
        },
        getSubSolutionFailure: (state, action) => {
            state.getSubSolution.status = 'failed'
            state.getSubSolution.error = action.payload;
        },
        getAllSubSolutionsRequest: (state, action) => {
            state.getAllSubSolutions.status = "pending";
        },
        getAllSubSolutionsSuccess: (state, action) => {
            state.getAllSubSolutions.status = 'success'
            state.getAllSubSolutions.data = null
        },
        getAllSubSolutionsFailure: (state, action) => {
            state.getAllSubSolutions.status = 'failed';
        },
        createSubSolutionRequest: (state, action) => {
            state.createSubSolution.status = 'pending'
        },
        createSubSolutionSuccess: (state, action) => {
            state.createSubSolution.status = 'success'
            state.createSubSolution.data = action.payload;
        },
        createSubSolutionFailure: (state, action) => {
            state.createSubSolution.status = 'failed'
            state.createSubSolution.data = null
            state.createSubSolution.error = action.payload;
        },
        updateSubSolutionRequest: (state, action) => {
            state.updateSubSolution.status = 'pending'
        },
        updateSubSolutionSuccess: (state, action) => {
            state.updateSubSolution.status = 'success'
            state.updateSubSolution.data = action.payload
        },
        updateSubSolutionFailure: (state, action) => {
            state.updateSubSolution.status = 'failed'
            state.updateSubSolution.error = action.payload
        },
        deleteSubSolutionRequest: (state) => {
            state.deleteSubSolution.status = 'pending'
        },
        deleteSubSolutionSuccess: (state, action) => {
            state.deleteSubSolution.status = 'success'
            state.deleteSubSolution.data = action.payload
        },
        deleteSubSolutionFailure: (state, action) => {
            state.deleteSubSolution.status = 'failed'
            state.deleteSubSolution.error = action.payload
        },
        clearGetSubSolutionStatus: (state) => {
            state.getSubSolution.status = "idle";
        },
        clearGetSubSolutionData: () => {
            state.getSubSolution.data = null;
        },
        clearGetSubSolutionError: (state) => {
            state.getSubSolution.error = null;
        },
        clearGetAllSubSolutionsStatus: (state) => {
            state.getAllSubSolutions.status = "idle";
        },
        clearGetAllSubSolutionsData: () => {
            state.getAllSubSolutions.data = null;
        },
        clearGetAllSubSolutionsError: (state) => {
            state.getAllSubSolutions.error = null;
        },
        clearCreateSubSolutionStatus: (state) => {
            state.createSubSolution.status = "idle";
        },
        clearCreateSubSolutionData: () => {
            state.createSubSolution.data = null;
        },
        clearCreateSubSolutionError: (state) => {
            state.createSubSolution.error = null;
        },
        clearUpdateSubSolutionStatus: (state) => {
            state.updateSubSolution.status = "idle";
        },
        clearUpdateSubSolutionData: () => {
            state.updateSubSolution.data = null;
        },
        clearUpdateSubSolutionError: (state) => {
            state.updateSubSolution.error = null;
        },
        clearDeleteSubSolutionStatus: (state) => {
            state.deleteSubSolution.status = "idle";
        },
        clearDeleteSubSolutionData: () => {
            state.deleteSubSolution.data = null;
        },
        clearDeleteSubSolutionError: (state) => {
            state.deleteSubSolution.error = null;
        },
    }
})

export const subSolutionActions = subSolutionSlice.actions;
export const subSolutionReducer = subSolutionSlice.reducer;